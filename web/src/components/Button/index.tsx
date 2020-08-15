import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button:React.FC<ButtonProps> = ({ label, ...rest }) => (
  <div className="button-container">
    <button type="button" {...rest} className="button">
      {label}
    </button>
  </div>
);

export default Button;
