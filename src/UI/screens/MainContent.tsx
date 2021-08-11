import React, { useReducer, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { isPortrait } from "../../assets/utilities/OrientationManager";
import { StatesList } from "../components/StatesList";
import { StateDetails } from "../components/StateDetalis";
import StatesReducer from "../../redux/StatesReducer";
import { Colors } from "../../assets/Colors";

export const MyContext = React.createContext(null);

export const MainContent = () => {
  const [statesInfo, dispatch] = useReducer(StatesReducer, { states: [] });

  const [orientation, setOrientation] = useState(isPortrait());
  Dimensions.addEventListener("change", () => {
    setOrientation(isPortrait());
  });

  return (
    <SafeAreaView style={[styles.containerStyle, { flexDirection: orientation === "portrait" ? "column" : "row" }]}>
      <MyContext.Provider value={{ statesInfo, dispatch }}>
        <View style={{ flexDirection: "row", flex: 2 }}>
          <StatesList needSearchComponent={false} />
          <View style={styles.separateLineStyle} />
          <StatesList needSearchComponent />
        </View>
        <StateDetails />
      </MyContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginVertical: 10
  },
  separateLineStyle: {
    height: "100%",
    width: 3,
    backgroundColor: Colors.LIGHT_GRAY,
    opacity: 0.5
  }
});
