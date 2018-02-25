import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Multiselect = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <Dropdown
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder}
        selection
        multiple
        value={props.value}
      />
    </div>

  )
};

export default Multiselect;