import React from 'react';
import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select'

import styles from './styles';

interface PickerProps extends PickerSelectProps {
  title: string;
}

const PickerComponent: React.FC<PickerProps> = ({title, ...rest}) => {
  return (
    <RNPickerSelect 
      style={{viewContainer: styles.input}}
      placeholder={{label: title, value: null, color: '#c1bccc'}}
      {...rest}
    />
  );
}

export default PickerComponent;