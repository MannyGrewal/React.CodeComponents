import * as React from 'react';
import Root from './components/Root';
import { IControlContextProps } from './context/ControlContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContextProvider } from './context/AppContext';

const queryClient = new QueryClient();

const App = (props: IControlContextProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider controlContext={props}>
        <Root />
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default App;
