import React, { useState } from "react";
import STATES from "../constants/states";
import EVENTS from "../constants/events";

const FormSubmit = ({ setList, updateFSM, setErrorMsg, currentState }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    updateFSM(EVENTS.SUBMIT, { listName, setList, setErrorMsg });
  };

  const handleReset = (ev) => {
    ev.preventDefault();
    updateFSM(EVENTS.RESET);
    setListName("");
    setList(null);
    setErrorMsg(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Song List Fetcher</h1>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter List Name"
        maxLength="20"
      />
      <button>Submit</button>
      <button onClick={handleReset} disabled={currentState === STATES.LOADING}>
        Reset
      </button>
    </form>
  );
};

export default FormSubmit;
