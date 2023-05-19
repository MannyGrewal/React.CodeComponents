import { IAction, AuditQueryData } from './interfaces';
import { getDuration } from './dates';
/*The createUserSessions function first sorts the data by the createdon time, then it groups the data into sessions based on consecutive actions by the same user. The fields property is calculated by splitting the attributemask field and counting the number of unique values using a Set.*/
export const createUserSessions = (inputData: AuditQueryData[]): IAction[] => {
  // First, sort the data by createdon time
  const sortedData = inputData.sort((a, b) => Date.parse(a.createdon) - Date.parse(b.createdon));

  // Next, group the data by user session
  const userSessions: IAction[] = [];
  let currentSession: IAction | null = null;

  for (const auditEntry of sortedData) {
    const { createdon, _userid_name, _userid_value, attributemask, action } = auditEntry;

    const timestamp = new Date(createdon);
    const fields = new Set<string>(attributemask?.split(',')).size;

    if (!currentSession || currentSession.user.name !== _userid_name) {
      // Start a new session
      currentSession = {
        time: timestamp,
        duration: 'a minute',
        user: {
          id: _userid_value,
          name: _userid_name,
          //imageUrl: `https://randomuser.me/api/portraits/men/${Math.floor(
          //Math.random() * 100
          //)}.jpg`,
        },
        fields: fields,
        actionName: action,
      };
      userSessions.push(currentSession);
    } else {
      // Continue the current session
      currentSession.fields += fields;
      currentSession.duration = getDuration(currentSession.time, timestamp);
    }
  }
  return userSessions;
};

//Convert CRM schema format to AuditQueryData format
export const parseAuditQueryData = (
  crmResponseAuditData: ComponentFramework.WebApi.Entity[] | undefined
): AuditQueryData[] => {
  return crmResponseAuditData!.map((item: any) => {
    return {
      _userid_type: item['_userid_value@Microsoft.Dynamics.CRM.lookuplogicalname'],
      _userid_name: item['_userid_value@OData.Community.Display.V1.FormattedValue'],
      _userid_value: item['_userid_value'],
      createdon_formatted: item['createdon@OData.Community.Display.V1.FormattedValue'],
      createdon: item['createdon'],
      action: item['action@OData.Community.Display.V1.FormattedValue'],
      operation: item['operation@OData.Community.Display.V1.FormattedValue'],
      attributemask: item['attributemask'],
    };
  });
};
