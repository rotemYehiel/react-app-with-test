const fsmService = require("./lib/rotem-fsm/fsmService.js"); // Replace with the correct file path

describe("createFiniteStateMachine", () => {
  // Define your states for testing
  const stateA = {
    name: "StateA",
    getNextState: jest.fn(),
    onEnter: jest.fn(),
    onExit: jest.fn(),
  };

  const stateB = {
    name: "StateB",
    getNextState: jest.fn(),
    onEnter: jest.fn(),
    onExit: jest.fn(),
  };

  // it("should create a finite state machine with the initial state", () => {
  //   const initialState = stateA;
  //   const fsm = fsmService.createFiniteStateMachine(initialState);

  //   // console.log({ "fsm.currentState": fsm.currentState, initialState });

  //   expect(fsm.currentState).toBe(initialState);
  // });

  it("should transition to the next state when a valid event is triggered", () => {
    const initialState = stateA;
    const fsm = fsmService.createFiniteStateMachine(initialState);

    const nextState = stateB;
    initialState.getNextState.mockReturnValue(nextState);

    fsm.transition("someEvent", "payload");

    expect(initialState.onExit).toHaveBeenCalledWith("payload");
    expect(nextState.onEnter).toHaveBeenCalledWith("payload");
    console.log({ "fsm.currentState": fsm.currentState, nextState });
    expect(fsm.currentState).toBe(nextState);
  });

  it("the state name should not change when no transition is defined for an event", () => {
    const initialState = stateA;
    const fsm = fsmService.createFiniteStateMachine(initialState);

    fsm.transition("undefinedEvent", "payload");

    expect(fsm.currentState.name).toBe(initialState.name);
  });
});
