import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  description: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label, name, description, ...rest
}) => (
  <div className="textarea-block">
    <label htmlFor={name}>
      {label}
      <p>{description}</p>
    </label>
    <textarea id={name} {...rest} />
  </div>
);

export default TextArea;
