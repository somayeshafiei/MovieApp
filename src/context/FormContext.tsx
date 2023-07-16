import { createContext, ReactNode, useReducer } from 'react';
import { ActionType, ContextType } from '../interfaces/interfaces';
import { StateType } from './../interfaces/interfaces';

const initContext: ContextType = {
  state: {
    name: {
      value: '',
      error: '',
    },
    genre: {
      value: '',
      error: '',
    },
    director: {
      value: '',
      error: '',
    },
    productionDate: {
      value: '',
      error: '',
    },
    description: {
      value: '',
      error: '',
    },
  },
  dispatch: () => {
    console.log('');
  },
};

export const initState: StateType = {
  name: {
    value: '',
    error: '',
  },
  genre: {
    value: '',
    error: '',
  },
  director: {
    value: '',
    error: '',
  },
  productionDate: {
    value: '',
    error: '',
  },
  description: {
    value: '',
    error: '',
  },
};

export const reducer = function (state: StateType, action: ActionType) {
  switch (action.type) {
    case 'Name_is_valid':
      return {
        ...state,
        name: action.payload,
      };
    case 'Genre_is_valid':
      return {
        ...state,
        genre: action.payload,
      };
    case 'Director_is_valid':
      return {
        ...state,
        director: action.payload,
      };
    case 'Production_Date_is_valid':
      return {
        ...state,
        productionDate: action.payload,
      };
    case 'Description_is_valid':
      return {
        ...state,
        description: action.payload,
      };
    case 'Reset_the_form':
      return {
        ...initState,
      };
    case 'Edit_value':
      console.log(action.payload);

      return {
        id: action.payload.id,
        name: {
          value: action.payload.name,
          error: '',
        },
        genre: {
          value: action.payload.genre,
          error: '',
        },
        director: {
          value: action.payload.director,
          error: '',
        },
        productionDate: {
          value: action.payload.productionDate,
          error: '',
        },
        description: {
          value: action.payload.description,
          error: '',
        },
      };
    default:
      break;
  }
};

export const FormContext = createContext<ContextType>(initContext);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState, undefined);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
