import * as React from 'react';
import './Timeline.styles.css';
import Action from '../Action/Action';
import { IAction, IActionProps } from '../../utils/interfaces';
import { findMinMaxDates, formatDateTime } from '../../utils/dates';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Timeline: React.FC<IActionProps> = (props: IActionProps) => {
  const { minDate, maxDate } = findMinMaxDates(props.data!);
  const appContext = useContext(AppContext);

  return (
    <div className="timeline-container" style={{
      width: appContext.context.mode.allocatedWidth
    }}>
      <div className="timeline-header">
        <div className="start-date">{formatDateTime(minDate!, true)}</div>
        <div className="end-date">{formatDateTime(maxDate!, true)}</div>
        <div className="timeline">
          {props.data
            ?.sort((a: IAction, b: IAction) => b.time.getTime() - a.time.getTime())
            .map((item: IAction, index) => {
              const isOverIt = index % 2 === 0;
              return (
                <div className={`timeline-item ${isOverIt ? 'over' : 'under'}`} key={index}>
                  <Action action={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
