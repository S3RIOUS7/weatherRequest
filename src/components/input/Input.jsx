import React from 'react';
import '../input/input.scss'
const Input = ({ label, value, onChange, type }) => {
  return (
    <div className="input-container">
      
      <input type={type} value={value} onChange={onChange}  placeholder={label} className='inputField'/>
      
    </div>
  );
};

export default Input;