import React from 'react';
import '../smallContainer/smallContainer.scss'
function SmallContainer(props) {
  return (
    <div className='small-container'>
      <div className='date'><h1>{props.date}</h1></div>
      <div className='temperature'>{props.temperature}°C</div>
    </div>
  );
}

export default SmallContainer;