import { UPDATE_SELECTED_STATE, UPDATE_STATES } from "./types";
import { StateItemType } from "../UI/viewTypes";

export const INITIAL_STATE = {
  states: []
};

export interface StatesState {
  states: StateItemType[]
  selectedState?: StateItemType
}

export default (
  state: StatesState = INITIAL_STATE,
  action
) => {

  switch (action.type) {

    case UPDATE_STATES:

      return {
        ...state,
        states: action.payload
      };
    case UPDATE_SELECTED_STATE:
      return {
        ...state,
        selectedState: action.payload.selectedState,
        states: action.payload.states?action.payload.states:state.states
      };
    default:
      return state;
  }
};
