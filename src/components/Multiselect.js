import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Multiselect = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      {/*<Dropdown*/}
        {/*onChange={props.onChange}*/}
        {/*options={props.options}*/}
        {/*placeholder={props.placeholder}*/}
        {/*selection*/}
        {/*multiple*/}
        {/*value={props.value}*/}
      {/*/>*/}
      <select name="choices" id="" multiple>
        {props.children}
      </select>
    </div>

  )
};

export default Multiselect;