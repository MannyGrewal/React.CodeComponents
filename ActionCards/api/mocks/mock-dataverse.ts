import { IInputs } from '../../generated/ManifestTypes';
import { mockCrmAuditResponse, mockCrmAuditShortResponse } from '../../data/mock-crm-audit-response';
import { mockImages } from '../../data/mock-images';

export const getAuditRecords = async (
  entityname: string,
  recordid: string,
  crmContext: ComponentFramework.Context<IInputs>
): Promise<ComponentFramework.WebApi.Entity[]> => {
  return Promise.resolve(mockCrmAuditShortResponse.value);
};

export const getUserImage = async (
  entityname: string,
  recordid: string,
  crmContext: ComponentFramework.Context<IInputs>
): Promise<ComponentFramework.WebApi.Entity> => {
  const index = Math.round(Math.random());
  return Promise.resolve(mockImages[index]);
};
