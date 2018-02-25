import React from 'react';

const Button = (props) => {
  return (
    <button className={props.className} type={props.type} onClick={props.onClick}>{props.label}</button>
  )
};

export default Button;