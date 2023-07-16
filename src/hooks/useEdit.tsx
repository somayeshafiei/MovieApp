import { useContext } from 'react';
import { EditContext } from '../context/EditContext';
export const useEdit = () => {
  return useContext(EditContext);
};
