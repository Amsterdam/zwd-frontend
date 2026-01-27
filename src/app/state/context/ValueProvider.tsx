import { createContext, useReducer, useCallback, ReactNode } from "react"
import initialState from "./initialState"
import actions from "./actions"
import reducer from "./reducer"
import type { StateType, Payload } from "./types"

export const ContextValues = createContext(initialState)

const ValueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: StateType = {
    cases: {
      ...state.cases,
      updateContextCases: useCallback(
        (payload: Payload) => {
          dispatch({ type: actions.UPDATE_CASES, payload })
        },
        [dispatch]
      )
    },
    tasks: {
      ...state.tasks,
      updateContextTasks: useCallback(
        (payload: Payload) => {
          dispatch({ type: actions.UPDATE_TASKS, payload })
        },
        [dispatch]
      )
    },
    hoa: {
      ...state.hoa,
      updateContextHoa: useCallback(
        (payload: Payload) => {
          dispatch({ type: actions.UPDATE_HOA, payload })
        },
        [dispatch]
      )
    }
  }


  return (
    <ContextValues.Provider value={value}>{children}</ContextValues.Provider>
  )
}

export default ValueProvider
