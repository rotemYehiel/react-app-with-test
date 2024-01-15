import React, { useState } from "react";
import STATES from "../constants/states";
import EVENTS from "../constants/events";
import {
  FormSubmitLayout,
  Title,
  InputsSection,
  SubmitButton,
  Input,
  ResetButton,
  InputContainer,
} from "../styleComponents/FormSubmit";

const FormSubmit = ({ setList, updateFSM, setErrorMsg, currentState }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    updateFSM(EVENTS.SUBMIT, { listName, setList, setErrorMsg });
  };

  const handleReset = (ev) => {
    ev.preventDefault();
    if (currentState !== STATES.LOADING) {
      updateFSM(EVENTS.RESET);
      setListName("");
      setList(null);
      setErrorMsg(null);
    }
  };

  return (
    <FormSubmitLayout onSubmit={handleSubmit}>
      <Title>Search your playlist</Title>
      <InputsSection>
        <InputContainer>
          <Input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter List Name"
            maxLength="20"
          />
          {listName && (
            <ResetButton
              onClick={handleReset}
              disabled={currentState?.name === STATES.LOADING}
            >
              X
            </ResetButton>
          )}
        </InputContainer>
        <SubmitButton>Submit</SubmitButton>
      </InputsSection>
    </FormSubmitLayout>
  );
};

export default FormSubmit;
