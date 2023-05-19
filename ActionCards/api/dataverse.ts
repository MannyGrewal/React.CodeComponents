import { IInputs } from '../generated/ManifestTypes';

export const getAuditRecords = async (
  entityname: string,
  recordid: string,
  crmContext: ComponentFramework.Context<IInputs>
): Promise<ComponentFramework.WebApi.Entity[]> => {
  const query = `?$select=_userid_value,createdon,action,operation&$filter=(_objectid_value eq ${recordid})`;
  const crmResponse = await crmContext.webAPI.retrieveMultipleRecords(entityname, query);
  return crmResponse.entities ?? [];
};

export const getUserImage = async (
  entityname: string,
  recordid: string,
  crmContext: ComponentFramework.Context<IInputs>
): Promise<ComponentFramework.WebApi.Entity> => {
  const query = `?$select=entityimage`;
  const crmResponse = await crmContext.webAPI.retrieveRecord(entityname, recordid, query);
  return crmResponse ?? {};
};
