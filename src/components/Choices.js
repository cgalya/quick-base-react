import React from 'react';
import {Input} from 'semantic-ui-react';

const Choices = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <div className="choices">
        <div className="choices-top">
          <Input value={props.value} onChange={props.onChange} placeholder="Enter choice here" disabled={props.disabled}/>
          <button className="add" type="button" onClick={props.onAdd}><i className="fas fa-plus"></i></button>
        </div>
        <ul>
          {props.children}
        </ul>
      </div>
    </div>
  )
};

export default Choices;