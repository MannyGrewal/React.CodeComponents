import { IInputs } from '../generated/ManifestTypes';
export interface IAction {
  time: Date;
  duration: string;
  user: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  actionName: string;
  fields: number;
}

export interface IActionProps {
  data?: IAction[];
}

export type AuditQueryData = {
  _userid_type: string;
  _userid_name: string;
  _userid_value: string;
  createdon_formatted: string;
  createdon: string;
  action: string;
  operation: string;
  attributemask: string;
};
