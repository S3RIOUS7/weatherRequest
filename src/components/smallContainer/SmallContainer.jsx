import React from 'react';
import '../smallContainer/smallContainer.scss'
function SmallContainer({ data }) {
  return (
    <div className='small-container'>
      <div className='date'></div>
      <div className='temperature'></div>
    </div>
  );
}

export default SmallContainer;