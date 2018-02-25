import React from 'react';

const TextInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input type="text" value={props.value} onChange={props.onChange} name={props.name}/>
    </div>


    )
};

export default TextInput;