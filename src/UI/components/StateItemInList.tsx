import { StyleSheet, Text } from "react-native";
import React from "react";
import { StateItemType } from "../viewTypes";
import { DoubleClickButton } from "./DoubleClickButton";
import { Colors } from "../../assets/Colors";

interface Props {
  item: StateItemType,
  onChooseState: () => void,
  changeHighlightedStatus: () => void
}

export const StateItemInList = (props: Props) => {
  return (
    <DoubleClickButton
      onDoublePress={props.changeHighlightedStatus}
      onSinglePress={props.onChooseState}
    >
      <Text style={[styles.textStyle, props.item.highlighted && { color: Colors.RED }]}>{props.item.name}</Text>
    </DoubleClickButton>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 2,
    fontSize: 16,
    color: Colors.LIGHT_GRAY,
    fontWeight: "bold"
  }
});
