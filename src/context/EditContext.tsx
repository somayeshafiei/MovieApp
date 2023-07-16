import { createContext, useState } from 'react';
import { ReactNode } from 'react';

export const EditContext = createContext(false);
export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <EditContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditContext.Provider>
  );
};
