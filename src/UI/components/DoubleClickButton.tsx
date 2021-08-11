import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native";
import React, { ReactNode, useState } from "react";

interface DoubleClickButtonProps extends TouchableWithoutFeedbackProps {
  onDoublePress: () => void
  onSinglePress: () => void
  children?: ReactNode
}

const DELTA = 250;

export const DoubleClickButton = (props: DoubleClickButtonProps) => {

  const [lastPress, setLastPress] = useState(0);

  const handlePress = () => {
    var delta = new Date().getTime() - lastPress;
    if (delta < DELTA) {
      props.onDoublePress();
      console.log("double click");
    } else {
      props.onSinglePress();
      console.log("single click");
    }
    setLastPress(new Date().getTime());
  };

  return (
    <TouchableWithoutFeedback
      {...props}
      onPress={handlePress}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};
