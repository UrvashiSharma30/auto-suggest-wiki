import React from "react";
import SearchBar from "./components/SearchBar";
import "./index.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Wikipedia Search</h1>
      <SearchBar />
    </div>
  );
};

export default App;
