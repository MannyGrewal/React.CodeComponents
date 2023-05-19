import * as React from 'react';
import './User.styles.css';
import { Persona, PersonaSize } from '@fluentui/react';

const User = (props: any) => {
  const { name, imageUrl } = props.user;

  return (
    <div className="userDiv">
      {' '}
      <Persona imageUrl={imageUrl} size={PersonaSize.size56} />
      <span className="userName">{name}</span>
    </div>
  );
};

export default User;
