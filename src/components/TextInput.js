import React from 'react';

const TextInput = (props) => {
  return (
    <label>
      {props.label}
      <input type="text" value={props.value} onChange={props.onChange} name={props.name}/>
    </label>
    )
};

export default TextInput;