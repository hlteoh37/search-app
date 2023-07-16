

// Read in a simple JSON file and write out another JSON file.
const fs = require("fs");
const {Graph} = require("./dataStructures");
const inputFileName = "caseData.json";
const outputFileName = "case_data_2.json";

const rawData = JSON.parse(fs.readFileSync(inputFileName).toString());
const peopleData = rawData.people;

// First extract location data from people
let locationMapping = {}

for (let i = 0; i < peopleData.length; i++) {
  let person = peopleData[i];
  if (person.locationHistory === undefined) {
    continue;
  }

  let locationHistory = person.locationHistory;

  for (let j = 0; j < locationHistory.length; j++) {
    let location = locationHistory[j];
    let locationName = location.location;
    if (locationMapping[locationName] === undefined) {
      locationMapping[locationName] = [];
    }
    locationMapping[locationName].push({
      caseId: person.caseId,
      startDate: new Date(location.startDate),
      endDate: new Date(location.endDate),
      ...location
    });
  }
}

// console.log(JSON.stringify(locationMapping, null, 2));


// Save / Load utility functions
function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else if(value instanceof Set) {
    return {
      dataType: 'Set',
      value: Array.from(value.values()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    } else if (value.dataType === 'Set') {
      return new Set(value.value);
    }
  }
  return value;
}

function save(object, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(object, replacer, 2));
}

function load(fileName) {
  return JSON.parse(fs.readFileSync(fileName).toString(), reviver);
}

function resetIndex(fileName) {
  fs.writeFileSync(fileName, "");
}
function updateIndex(location, fileName) {
  fs.appendFileSync(fileName, `${location}\n`);
}

function saveGraph(graph, fileName) {
  let i = 0;
  let indexToNode = new Map();
  let nodeToIndex = new Map();
  let edges = new Map();

  function addNode(node) {
    if (!nodeToIndex.has(node)) {
      indexToNode.set(i, node);
      nodeToIndex.set(node, i);
      edges.set(i, new Set());
      i++;
    }
  }

  for (const node of graph.nodes) {
    let n = node[1].value;
    let aj = node[1].getAdjacents();
    addNode(n);
    for (const adjacent of aj) {
      let a = adjacent.value;
      addNode(a);
      edges.get(nodeToIndex.get(n)).add(nodeToIndex.get(a));
      edges.get(nodeToIndex.get(a)).add(nodeToIndex.get(n));
    }
  }

  save(indexToNode, `${fileName}_indexToNode.json`);
  save(nodeToIndex, `${fileName}_nodeToIndex.json`);
  save(edges, `${fileName}_edges.json`);
}

function loadGraph(directory) {
  const index = fs.readFileSync(`${directory}/index.txt`).toString().split('\n').filter(l => l.length > 0);

  // console.log(index);

  for (const location of index) {
    const indexToNode = load(`${directory}/${location}_indexToNode.json`);
    const nodeToIndex = load(`${directory}/${location}_nodeToIndex.json`);
    const edges = load(`${directory}/${location}_edges.json`);

    // console.log(indexToNode);
    // console.log(nodeToIndex);
    // console.log(edges);

    const graph = new Graph();
    for (const edge of edges) {
      const node = indexToNode.get(edge[0]);
      graph.addNode(node);

      for (const adIndex of edge[1].values()) {
        graph.addNode(indexToNode.get(adIndex));
        graph.addEdge(node, indexToNode.get(adIndex));
      }
    }
    console.log("====================");
    console.log(location);
    console.log(graph.toString());
  }
}

// Now transform location data into graphs
function isIntersect(interval1, interval2) {
  return interval1.startDate <= interval2.endDate && interval2.startDate <= interval1.endDate;
}

resetIndex("saved/index.txt");
for (const location in locationMapping) {
  let graph = new Graph();
  let locationData = locationMapping[location];
  for (let i = 0; i < locationData.length; i++) {
    let locationPoint = locationData[i];
    graph.addNode(locationPoint);
    for (let j = i+1; j < locationData.length; j++) {
      let nextLocationPoint = locationData[j];
      if (isIntersect(locationPoint, nextLocationPoint)) {
        graph.addEdge(locationPoint, nextLocationPoint);
      }
    }
  }
  console.log("====================");
  console.log(location);
  console.log(graph.toString());
  saveGraph(graph, `saved/${location}`);
  updateIndex(location, "saved/index.txt");
}

loadGraph("saved");


// fs.writeFileSync(outputFileName, rawData);

// console.log("File written successfully");









