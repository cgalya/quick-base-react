import React from 'react';

const TextArea = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <textarea
        rows={props.rows}
        name={props.name}
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      ></textarea>
    </div>
  )
};

export default TextArea;
