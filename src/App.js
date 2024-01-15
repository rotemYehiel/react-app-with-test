import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormSubmit from "./components/FormSubmit";
import { idleState } from "./store/fsmStore";
import { createFiniteStateMachine } from "./lib/fsm/fsmService";
import STATES from "./constants/states";
import EVENTS from "./constants/events";
import List from "./components/List";

const App = () => {
  const [fsm, setFSM] = useState(createFiniteStateMachine(idleState));
  const [list, setList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const updateFSM = useCallback(
    (event, payload = null) => {
      fsm.transition(event, payload);
      setFSM(createFiniteStateMachine(fsm.currentState));
    },
    [fsm]
  );

  useEffect(() => {
    console.log("@@@ APP effect:", {
      fsm,
      list,
      errorMsg,
    });

    if (fsm.currentState.name === STATES.LOADING && list !== null) {
      updateFSM(EVENTS.SONGS_RECIVED);
    }

    if (fsm.currentState.name === STATES.LOADING && !list && errorMsg) {
      updateFSM(EVENTS.ERROR_RECIVED);
    }
  }, [fsm, list, errorMsg, updateFSM]);

  return (
    <div>
      <FormSubmit
        setList={setList}
        updateFSM={updateFSM}
        setErrorMsg={setErrorMsg}
        currentState={fsm?.currentState?.name}
      />

      {list && list?.songs?.length && <List list={list} />}

      <p>Current State: {fsm.currentState.name}</p>

      {errorMsg && errorMsg?.message && <div>{errorMsg.message}</div>}
    </div>
  );
};

export default App;
