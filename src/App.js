import './App.css';
import Search from "./Search";
import Dashboard from "./Dashboard";
import initialDetails from "./initialDetails";

function App() {
  return (
    // <div className="tc bg-white ma0 pa4">
    <div>
      <Dashboard />
      <Search details={initialDetails}/>
    </div>
  );
}

export default App;
