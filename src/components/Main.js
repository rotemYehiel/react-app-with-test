import React from "react";
import FormSubmit from "./FormSubmit";
import List from "./List";
import { MainLayout } from "../styleComponents/Main";
import STATES from "../constants/states";
import { Button } from "../styleComponents/App";
import EVENTS from "../constants/events";
import Loader from "./Loader";
import ErrorDisplay from "./ErrorDisplay";

const Main = ({
  currentState,
  setList,
  updateFSM,
  setErrorMsg,
  list,
  errorMsg,
}) => {
  const handleRetry = (ev) => {
    ev.preventDefault();
    if (currentState !== STATES.LOADING) {
      updateFSM(EVENTS.RESET);
      setList(null);
      setErrorMsg(null);
    }
  };

  if (!currentState) return null;
  return (
    <MainLayout>
      {currentState === STATES.IDLE && (
        <FormSubmit
          setList={setList}
          updateFSM={updateFSM}
          setErrorMsg={setErrorMsg}
          currentState={currentState}
        />
      )}

      {currentState === STATES.FAIL && errorMsg && errorMsg?.message && (
        <ErrorDisplay errorMsg={errorMsg} />
      )}

      {currentState === STATES.LOADING && <Loader />}

      {currentState === STATES.SUCCESS && list && <List list={list} />}
      {(currentState === STATES.SUCCESS || currentState === STATES.FAIL) && (
        <Button onClick={handleRetry}>Retry</Button>
      )}

      {currentState && <p>Current State: {currentState}</p>}
    </MainLayout>
  );
};

export default Main;
