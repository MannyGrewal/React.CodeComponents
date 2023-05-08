import { createContext } from 'react';

export const RadioListContext = createContext({
    selectedId: '', setSelectedId: (newValue: string) => { },
})