import * as React from 'react';
import { createContext, ReactNode } from 'react';
import { IControlContextProps } from './ControlContext';

interface IAppContextProps {
  controlContext: IControlContextProps;
  children: ReactNode;
}

const AppContext = createContext<IControlContextProps>(undefined!);
const AppContextProvider = ({ controlContext, children }: IAppContextProps) => {
  return <AppContext.Provider value={controlContext}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
