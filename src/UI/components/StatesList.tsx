import React, { useContext, useEffect, useState } from "react";
import { StateItemInList } from "./StateItemInList";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { stateDetailsRequest, stateListRequest } from "../../networking/Repo";
import { action } from "typesafe-actions";
import { UPDATE_SELECTED_STATE, UPDATE_STATES } from "../../redux/types";
import { MyContext } from "../screens/MainContent";
import { Colors } from "../../assets/Colors";

export const StatesList = (props: { needSearchComponent: boolean }) => {
  const { dispatch, statesInfo } = useContext(MyContext);

  useEffect(() => {
    stateListRequest()
      .then(states => dispatch(action(UPDATE_STATES, states)));
  }, []);

  const setSelectedState = (item) => {
    //Prevent unnecessary render
    if (statesInfo.selectedState && item.name === statesInfo.selectedState.name) return;

    // Displays to the user the information we already have even before the server request returns
    dispatch(action(UPDATE_SELECTED_STATE, { selectedState: item }));

    //Prevent unnecessary server request
    if (item.counties !== undefined) return;

    stateDetailsRequest(item.detailsLink)
      .then(stateDetails => {
          let newStates = statesInfo.states
            .slice(0).map(state => {
              return state.name === item.name ? { ...state, counties: stateDetails } : state;
            });

          // Displays to the user the information after the server request is returned
          return dispatch(action(UPDATE_SELECTED_STATE, {
            selectedState: { ...item, counties: stateDetails },
            states: newStates
          }));
        }
      );
  };

  const setHighlightedStatus = (item) => {
    let newStates = statesInfo.states.slice(0).map(state => {
      return state.name === item.name ? { ...state, highlighted: !state.highlighted } : state;
    });
    dispatch(action(UPDATE_STATES, newStates));
  };

  const [search, setSearch] = useState("");

  return (
    <View style={styles.containerStyle}>
      {props.needSearchComponent &&
      <TextInput
        returnKeyType={"search"}
        placeholder={"Type here to search"}
        style={styles.textInputStyle}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />}
      <FlatList
        data={statesInfo.states.filter(state => state.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={item =>
          <StateItemInList
            onChooseState={setSelectedState.bind(this, item.item)}
            changeHighlightedStatus={setHighlightedStatus.bind(this, item.item)}
            item={item.item} />
        }
        keyExtractor={item => item.name}
      />
    </View>

  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 5
  },
  textInputStyle: {
    minHeight: 50,
    borderColor: Colors.GRAY,
    borderWidth: 2
  }
});

