import React from 'react';


const TextArea = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <textarea ref={props.ref} rows={props.rows} className={props.className} placeholder={props.placeholder} onChange={props.onChange} value={props.value}/>
    </div>
  )
};

export default TextArea;
