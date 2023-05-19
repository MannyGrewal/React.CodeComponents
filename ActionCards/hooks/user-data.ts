import React, { useEffect, useState } from 'react';
import { IAction } from '../utils/interfaces';
import { DataService } from '../hooks/data-service';
import { IInputs } from '../generated/ManifestTypes';
import { useQuery } from '@tanstack/react-query';
import { parseAuditQueryData, createUserSessions } from '../utils/helpers';

export const userData = (crmContext: ComponentFramework.Context<IInputs>): IAction[] => {
  const dataService = new DataService(crmContext);
  const [auditRows, setAuditRows] = useState<IAction[]>([]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const recordId = crmContext.page.entityId;

  const {
    data: crmResultSet,
    isLoading: auditLoading,
    isError: auditError,
  } = useQuery<ComponentFramework.WebApi.Entity[], Error>(['auditRecords', recordId], () =>
    dataService.resolveAuditQuery(recordId)
  );
  useEffect(() => {
    if (crmResultSet) {
      const mockAuditData = parseAuditQueryData(crmResultSet);
      const returnedRows = createUserSessions(mockAuditData);
      setAuditRows((prevRows) => [...prevRows, ...returnedRows]);

      const promises = returnedRows?.map(async (auditRow) => {
        const imageRecord = await dataService.resolveImageQuery(auditRow.user.id);
        const updatedUser = {
          ...auditRow.user,
          imageUrl: `data:image/jpeg;base64,${imageRecord?.entityimage}`,
        };
        return { ...auditRow, user: updatedUser };
      });
      Promise.all(promises ?? []).then((updatedRows) => {
        setAuditRows(updatedRows);
      });
    }
  }, [crmResultSet]);

  return auditRows;
};
