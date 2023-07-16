interface InputType {
  value: string;
  error: string;
}
export interface StateType {
  name: InputType;
  genre: InputType;
  director: InputType;
  productionDate: InputType;
  description: InputType;
}

export interface ActionType {
  type:
    | 'Name_is_valid'
    | 'Genre_is_valid'
    | 'Director_is_valid'
    | 'Production_Date_is_valid'
    | 'Reset_the_form'
    | 'Edit_value'
    | 'Description_is_valid';
  payload: InputType;
}

export interface ContextType {
  state: StateType;
  dispatch: (value: ActionType) => void;
}

export type ReducerType = (value1: StateType, value2: ActionType) => StateType;

export interface DataType {
  id: string;
  name: string;
  genre: string;
  director: string;
  producedDate: string;
  description: string;
}
export interface DataStateType {
  [x: string]: Promise<any>;
  state: Promise<any>;
  allMovies: DataType[];
  newRender: boolean;
}

export type DataActionType =
  | {
      type: 'Update_data';
      payload: DataType[];
    }
  | {
      type: 'Delete_data';
      payload: DataType;
    }
  | {
      type: 'Update_value';
      payload: DataType;
    }
  | {
      type: 'Search_value';
      payload: DataType;
    }
  | {
      type: 'Filter_value';
      payload: DataType;
    }
  | {
      type: 'Post_data';
      payload: DataType;
    };

export interface DataContextType {
  dataState: DataStateType[];
  dataDispatch: (value: DataActionType) => void;
}
