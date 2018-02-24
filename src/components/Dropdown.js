import React from 'react';

const Dropdown = (props) => {
  return (
    <label>
      {this.props.label}
      <input type="text" value={props.value} onChange={props.onChange} />
    </label>
  )
};

export default Dropdown;