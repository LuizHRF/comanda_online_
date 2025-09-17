import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    style: any;
  }
  
const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, style }) => (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

export default CustomButton;