import React from 'react';

const Checkbox = (props) => {
  return (
    <div className="checkbox-input">
      <input type="checkbox" onChange={props.onChange}/>
      <label>{props.label}</label>
    </div>
  )
};

export default Checkbox;
