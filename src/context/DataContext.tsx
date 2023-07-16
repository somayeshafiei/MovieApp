import { createContext, useReducer, ReactNode } from 'react';
import {
  DataActionType,
  DataStateType,
  DataContextType,
} from '../interfaces/interfaces';
import axios from 'axios';

const initState: DataStateType = {
  allMovies: [],
  newRender: false,
};

const reducer = (state: DataStateType, action: DataActionType) => {
  switch (action.type) {
    case 'Update_data':
      // |      console.log(action.payload);
      return { allMovies: [...action.payload] };
    case 'Post_data':
      console.log(action.payload);
      return { ...state, ...action.payload, newRender: true };
    case 'Delete_data':
      console.log(action.payload);

      axios.delete(`http://localhost:5000/movies/${action.payload.id}`);
      return { ...state, newRender: true };

    case 'Update_value':
      console.log(action.payload);
      axios.put(
        `http://localhost:5000/movies/${action.payload.id}`,
        action.payload
      );
      return { ...state, newRender: true };
    // eslint-disable-next-line no-fallthrough
    // case 'Filter_value':
    //   console.log(action.payload);
    //   // return { ...action.payload, newRender: true };
    //   axios(
    //     `http://localhost:5000/movies?genre=${action.payload.selectedValue}`
    //   ).then((res) => {
    //     console.log(res.data);
    //     return { ...(state.allMovies = res.data), newRender: true };
    //   });

    // eslint-disable-next-line no-fallthrough
    case 'Search_value':
      console.log(action.payload);

      axios(`http://localhost:5000/movies?q=${action.payload}`).then((res) => {
        console.log(res.data);
        return { ...(state.allMovies = res.data), newRender: true };
      });

    default:
      console.log('action is not valid');
      return state;
  }
};

const initContext: DataContextType = {
  dataState: {
    allMovies: [],
    newRender: false,
  },
  dataDispatch: () => {
    console.log();
  },
};

export const DataContext = createContext<DataContextType>(initContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataState, dataDispatch] = useReducer(reducer, initState, undefined);
  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};
