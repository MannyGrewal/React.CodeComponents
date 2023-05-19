import { QueryClient } from '@tanstack/react-query';
import { getAuditRecords, getUserImage } from '../api/dataverse';
//import { getAuditRecords, getUserImage } from '../api/mocks/mock-dataverse';
import { IInputs } from '../generated/ManifestTypes';

export class DataService {
  private crmContext: ComponentFramework.Context<IInputs>;
  private queryClient = new QueryClient();

  constructor(props: any) {
    this.crmContext = props;
  }

  resolveAuditQuery = async (recordid: string): Promise<ComponentFramework.WebApi.Entity[]> => {
    const cachedData = this.queryClient.getQueryData<ComponentFramework.WebApi.Entity[]>([
      'auditRecords',
      recordid,
    ]);
    if (cachedData) {
      return cachedData;
    }

    const data = await getAuditRecords('audit', recordid, this.crmContext);
    this.queryClient.setQueryData(['auditRecords', recordid], data ?? []);

    return data ?? [];
  };

  resolveImageQuery = async (recordid: string): Promise<ComponentFramework.WebApi.Entity> => {
    const cachedData = this.queryClient.getQueryData<ComponentFramework.WebApi.Entity>([
      'userImages',
      recordid,
    ]);
    if (cachedData) {
      return cachedData;
    }

    const data = await getUserImage('systemuser', recordid, this.crmContext);
    this.queryClient.setQueryData(['userImages', recordid], data ?? {});

    return data ?? {};
  };
}
