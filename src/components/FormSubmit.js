import React, { useState } from "react";
import STATES from "../constants/states";
import EVENTS from "../constants/events";

function FormSubmit({ setList, updateFSM, setErrorMsg, currentState }) {
  const [listName, setListName] = useState("");

  const handleSubmit = () => {
    updateFSM(EVENTS.SUBMIT, { listName, setList, setErrorMsg });
  };

  const handleReset = () => {
    updateFSM(EVENTS.RESET);
    setListName("");
    setList(null);
    setErrorMsg(null);
  };

  return (
    <div>
      {" "}
      <h1>Song List Fetcher</h1>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter List Name"
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset} disabled={currentState === STATES.LOADING}>
        Reset
      </button>
    </div>
  );
}

export default FormSubmit;
