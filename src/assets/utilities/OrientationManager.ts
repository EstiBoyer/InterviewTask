import { Dimensions } from "react-native";

//Returns the screen orientation mode
export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width ? "portrait" : "landscape";
};
