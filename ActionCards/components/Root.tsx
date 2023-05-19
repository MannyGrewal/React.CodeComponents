import * as React from 'react';
import { useContext } from 'react';
import Timeline from '../components/Timeline/Timeline';
import { DataService } from '../hooks/data-service';
import { useQuery } from '@tanstack/react-query';
import { parseAuditQueryData, createUserSessions } from '../utils/helpers';
import { AppContext } from '../context/AppContext';
import { IInputs } from '../generated/ManifestTypes';
import { userData } from '../hooks/user-data';

const Root = () => {
  const appContext = useContext(AppContext);
  const crmContext: ComponentFramework.Context<IInputs> = appContext.context;

  const convertedActions = userData(crmContext);

  return <Timeline data={convertedActions} />;
};

export default Root;
