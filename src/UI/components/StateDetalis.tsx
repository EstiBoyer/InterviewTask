import React, { useContext } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { CountyItemType } from "../viewTypes";
import { MyContext } from "../screens/MainContent";
import { Colors } from "../../assets/Colors";

export const Section = (props: { label: string, isSubSection?: boolean, content?: string | number }) => {
  return (
    <View style={{ marginVertical: 4 }}>
      <Text style={[styles.textStyle, !props.isSubSection && { fontWeight: "700" }]}>{props.label} </Text>
      {props.content !== undefined &&
      <Text style={[styles.textStyle, { fontWeight: "200" }]}>{props.content}</Text>}
    </View>

  );
};

export const StateDetails = () => {
  const { statesInfo } = useContext(MyContext);

  if (statesInfo.selectedState === undefined) {
    return <></>;
  } else {
    let sumOfAllCounties = statesInfo.selectedState.counties && statesInfo.selectedState.counties.reduce(
      (accumulator, currentValue: CountyItemType) => accumulator + currentValue.countyPopulation, 0
    );

    return (
      <ScrollView
        style={styles.containerStyle}>
        <View style={{ padding: 10 }}>
          <Section label={"State name:"} content={statesInfo.selectedState.name} />
          <Section label={"State population:"} content={statesInfo.selectedState.population} />
          <Section label={"Number of counties:"} content={statesInfo.selectedState.numberOfCounties} />
          {statesInfo.selectedState.counties ?
          <>
            <Section label={"Counties:"} />
            <FlatList
              contentContainerStyle={{ marginStart: 20 }}
              enabled={false}
              data={statesInfo.selectedState.counties}
              renderItem={({ item }) => <Section
                isSubSection
                label={`County: ${item.countyName}`}
                content={`Population: ${item.countyPopulation}`} />
              }
              keyExtractor={(item) => item.countyName}
            />
            <Section label={"Sum of populations:"} content={sumOfAllCounties} />
            <Section
              label={`${sumOfAllCounties !== statesInfo.selectedState.population ? "Not " : ""}equals to the state record!!`} />
          </>
          :
          <ActivityIndicator />}
        </View>
      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderColor: Colors.GRAY,
    borderWidth: 2,
    marginHorizontal: 5
  },
  textStyle: {
    marginVertical: 2,
    fontSize: 16,
    color: Colors.LIGHT_GRAY,
    fontWeight: "400"
  }
});
