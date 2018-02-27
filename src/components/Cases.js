

import React from 'react';

const ListItem = (props) => {
  return (
    <div className="radio-btns">
      <label>
        <input type="radio" value="option1" checked={true} />
        Option 1
      </label>
      <label>
        <input type="radio" value="option1" checked={true} />
        Option 1
      </label>
      <label>
        <input type="radio" value="option1" checked={true} />
        Option 1
      </label>
    </div>
  )
};

export default ListItem;