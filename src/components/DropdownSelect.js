import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownSelect = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <Dropdown
        selection
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder}
        value={props.value}
      />
    </div>
  )
};

export default DropdownSelect;
