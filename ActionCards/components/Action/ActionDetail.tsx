import * as React from 'react';
import * as Dates from '../../utils/dates';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ActionDetail = (props: any) => {
  const { duration, fields, actionName, user, time } = props.action;
  const appContext = useContext(AppContext);
  const isBackgroundPlain = appContext.context.parameters.plainRearSide?.raw
  return (
    <div className="actionDetail">
      <div
        className="imgDiv"
        style={isBackgroundPlain ? {} : {
          backgroundImage: `url(${user.imageUrl})`,
        }}
      />
      <div className="actionText">
        <h1 className="actionTitle">{actionName}</h1>
        <div className="divDesc">
          {user.name} interacted with the record for {duration} and changed {fields} fields.
        </div>
        <div className="divDate">{Dates.formatDateTime(time)}</div>
      </div>
    </div>
  );
};

export default ActionDetail;
