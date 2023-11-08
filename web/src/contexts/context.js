import { useState, createContext } from 'react';

export const Context = createContext(true);
export const ContextProvider = (props) => {
  const [offTopic, setOffTopic] = useState()
  return (
    <Context.Provider
      value={{
        offTopic, 
        setOffTopic,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
