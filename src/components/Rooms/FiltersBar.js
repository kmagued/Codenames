import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
import Fonts from "../../constants/Fonts";

const FiltersBar = (props) => {
  const [hideLocked, setHideLocked] = useState(false);
  const [hideFull, setHideFull] = useState(false);
  return (
    <View style={styles.filtersContainer}>
      <View style={{ width: "50%" }}>
        <CheckBox
          rightText="Hide locked"
          rightTextStyle={{ color: "white", fontFamily: Fonts.regularFont }}
          checkBoxColor="white"
          isChecked={hideLocked}
          onClick={() => {
            setHideLocked(!hideLocked);
            props.filter(!hideLocked, hideFull);
          }}
        />
      </View>
      <View style={{ flex: 0.5 }}>
        <CheckBox
          rightText="Hide full"
          rightTextStyle={{ color: "white", fontFamily: Fonts.regularFont }}
          checkBoxColor="white"
          isChecked={hideFull}
          onClick={() => {
            setHideFull(!hideFull);
            props.filter(hideLocked, !hideFull);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    marginTop: -5,
    flexDirection: "row",
    marginVertical: 10,
    padding: 5,
  },
});

export default FiltersBar;
