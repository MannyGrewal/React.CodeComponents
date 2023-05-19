import * as React from 'react';
import { useState, useEffect } from 'react';
import './Action.styles.css';
import ActionDetail from './ActionDetail';
import ActionFace from './ActionFace';

const Action = (props: any) => {
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isHovering) {
        setClicked(false);
      }
    }, 5000);
    //dispose the timeout when the hook unmounts
    return () => clearTimeout(timeout);
  }, [isHovering]);

  return (
    <div
      className={`actionDiv ${clicked ? 'flipped' : ''}`}
      onClick={() => {
        setClicked(!clicked);
      }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {clicked ? <ActionDetail action={props.action} /> : <ActionFace action={props.action} />}
    </div>
  );
};

export default Action;
