import actions from "./actions"
import type { StateType, ActionType } from "./types"

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case actions.UPDATE_CASES:
      return {
        ...state,
        cases: {
          ...state.cases,
          ...action.payload
        }
      }
    case actions.UPDATE_TASKS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.payload
        }
      }
    case actions.UPDATE_HOAS:
      return {
        ...state,
        hoas: {
          ...state.hoas,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export default reducer
