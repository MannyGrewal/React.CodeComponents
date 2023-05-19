import * as React from 'react';
import User from '../User/User';
import './Action.styles.css';
import * as Dates from '../../utils/dates';

const ActionFace = (props: any) => {
  const { time, user, actionName } = props.action;
  return (
    <div className="actionFace">
      <User user={user} />
      <div className="actionDate">{Dates.getFormattedDate(time)}</div>
    </div>
  );
};

export default ActionFace;
