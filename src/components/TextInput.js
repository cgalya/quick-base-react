import React from 'react';
import { Input } from 'semantic-ui-react';

const TextInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <Input value={props.value} onChange={props.onChange}/>
    </div>


    )
};

export default TextInput;