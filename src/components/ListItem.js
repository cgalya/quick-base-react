import React from 'react';

const ListItem = (props) => {
  return (
    <li className="list-item">
      <p>{props.item}</p>
      <button className="delete" type="button" onClick={props.onDelete}><i className="fas fa-times"></i></button>
    </li>
  )
};

export default ListItem;