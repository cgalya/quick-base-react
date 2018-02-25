import React from 'react';

const Checkbox = (props) => {
  return (
    <div>
      <input type="checkbox" onChange={props.onChange}/>
      <label>{props.label}</label>
    </div>
  )
};

export default Checkbox;
