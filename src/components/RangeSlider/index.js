import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import { View } from "react-native";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { global } from "../../styles";
import Pill from "../Pill";

const RangeSlider = ({ from, to }) => {
  // const RangeSlider = () => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh]
  );

  return (
    <View style={{ marginTop: h(0.02) }}>
      <RangeSliderRN
        // style={styles.slider}

        min={from}
        max={to}
        step={5}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />
      <View style={[global.center, { marginTop: h(0.01) }]}>
        <Pill
          variant={"inactive"}
          bg={"rgba(239, 239, 239, 1)"}
          text={"₹" + low + " -" + " ₹" + high}
          txtcolor={colors.black70}
          txtalign="center"
          width={w(0.3)}
        />
      </View>
    </View>
  );
};

export default RangeSlider;
