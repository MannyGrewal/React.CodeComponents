import { IInputs } from '../generated/ManifestTypes';

export interface IControlContextProps {
  context: ComponentFramework.Context<IInputs>;
  onChange: (selectedValue?: string | undefined) => void;
  formFactor: string;
}
