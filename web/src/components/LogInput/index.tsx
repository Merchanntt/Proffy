import React, { InputHTMLAttributes } from 'react';

import { WrapperFormField, LabelText, Input } from './styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  color?: string;
}

const LogInput: React.FC<InputProps> = ({
  label, name, value = '', color, ...rest
}) => {
  const hasText = Boolean(value.length);

  return (
    <WrapperFormField color={color}>
      <Input type="text" id={name} hasText={hasText} {...rest} />
      <LabelText>{label}</LabelText>
    </WrapperFormField>
  );
};
export default LogInput;
