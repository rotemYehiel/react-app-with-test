import React, { useCallback, useEffect, useState } from "react";
import { idleState } from "./store/fsmStore";
import { createFiniteStateMachine } from "./lib/fsm/fsmService";
import STATES from "./constants/states";
import EVENTS from "./constants/events";
import MainHeader from "./components/MainHeader";
import Main from "./components/Main";
import { AppLayout } from "./styleComponents/App";

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
    if (fsm.currentState.name === STATES.LOADING && list !== null) {
      updateFSM(EVENTS.SONGS_RECIVED);
    }

    if (fsm.currentState.name === STATES.LOADING && !list && errorMsg) {
      updateFSM(EVENTS.ERROR_RECIVED);
    }
  }, [fsm, list, errorMsg, updateFSM]);

  return (
    <AppLayout>
      <MainHeader
        listName={list?.listName}
        listImage={list?.listImage}
        currentState={fsm?.currentState?.name}
      />
      <Main
        setList={setList}
        updateFSM={updateFSM}
        setErrorMsg={setErrorMsg}
        currentState={fsm?.currentState?.name}
        list={list}
        errorMsg={errorMsg}
      />
    </AppLayout>
  );
};

export default App;
