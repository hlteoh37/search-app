import React from 'react';

function Card({person}) {
  return(
    <div className="tc bg-light-gray dib br3 pa3 ma2 grow bw2 shadow-5 w-40-l w-80-m vh-30">
      <div className="tl">
        <h2>{person.name}</h2>
        <p>CaseId: {person.caseId}</p>
        <p>Email: {person.email}</p>
        <p>Address: {person.address}</p>
      </div>
    </div>
  );
}

export default Card;
