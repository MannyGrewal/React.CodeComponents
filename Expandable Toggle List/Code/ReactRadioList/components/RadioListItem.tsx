import * as React from 'react';
import { useState, useContext } from 'react';
import { Toggle } from "@fluentui/react/lib/Toggle";
import { Label } from "@fluentui/react/lib/Label";
import { IRadioListData } from "../interfaces.js";
import { RadioListContext } from './RadioListContext';

export const RadioListItem = (props: any) => {
  const [isChecked, setIsChecked] = useState(props.selected);
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonClicked = (ev: React.MouseEvent<HTMLElement>) => {
    setIsExpanded(!isExpanded);
  };
  const onToggleClicked = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    if (checked != null) {
      setIsChecked(checked);
      props.onToggle(props.id, checked);
    }
  };
  return (
    <div className='radioItem'>
      <div className="toggleContainer">
        <Toggle
          label={props.data.name}
          ariaLabel={props.data.name}
          inlineLabel
          checked={isChecked}
          onChange={onToggleClicked}
        />
        <button className="littleButton" onClick={buttonClicked} > {isExpanded ? '-' : '+'}</button>
      </div>
      {(props.layout != 'small' && isExpanded) ? <div className='itemDesc'>{props.data.desc}</div> : <></>}
    </div>

  );
};
