import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useSubmit = () => {
  return useContext(FormContext);
};
