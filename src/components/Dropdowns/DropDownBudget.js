import {
  View,
  Text,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import AppText from "../AppText";
import Icon from "../Icon";
import { checkIcon, dropdown, radio, verified } from "../../container/icons";
import { global } from "../../styles";
import { moveVertical, scaleVertical } from "../../config/animation";
import Hr from "../Hr";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../../redux/authSlice";
import { setBudget as setBud } from "../../redux/userSlice";
import AnimatedBoxShadow from "../AnimatedBoxShadow";

const DropDownBudget = ({
  data,
  selected,
  setSelected,
  type = "standard",
  mt,
  user = false,
}) => {
  const dropdownheight = useRef(new Animated.Value(h(0.07))).current;
  const { auth } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  return (
    <View style={{ marginTop: mt || 0, position: "relative" }}>
      <AnimatedBoxShadow
        height={dropdownheight}
        width={"100%"}
        radius={13}
        top={h(0.005)}
      />
      <Animated.View
        style={[
          {
            height: dropdownheight,
            width: "100%",
            borderRadius: 13,
            borderColor: colors.black30,
            backgroundColor: colors.white,
            borderWidth: 0.5,
            overflow: "hidden",
            paddingBottom: h(0.02),
          },
        ]}
      >
        <TouchableOpacity
          style={[
            global.between,
            {
              paddingHorizontal: w(0.05),
              height: h(0.07),
              borderBottomColor: colors.black30,
              borderBottomWidth: 0.5,
              marginBottom: h(0.01),
            },
          ]}
          onPress={() =>
            scaleVertical({
              name: dropdownheight,
              duration: 100,
              pos: h(0.33),
            })
          }
        >
          <View style={global.start}>
            <AppText
              text={`${
                selected
                  ? type === "inline"
                    ? "Budget: " + selected.name
                    : selected.name
                  : "Budget: Select"
              }`}
              fontSize={13}
              fontFamily={"Montserrat_500Medium"}
              ml={w(0.02)}
            />
          </View>

          <Icon name={dropdown} size={w(0.05)} />
        </TouchableOpacity>
        {data?.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              scaleVertical({
                name: dropdownheight,
                duration: 100,
                pos: h(0.07),
              });
              setSelected(v);
              user
                ? dispatch(
                    setBud({
                      budget: {
                        min: v.min,
                        max: v.max,
                      },
                    })
                  )
                : dispatch(
                    setBudget({
                      budget: {
                        min: v.min,
                        max: v.max,
                      },
                    })
                  );
            }}
          >
            <View
              style={[
                global.start,
                {
                  paddingHorizontal: w(0.05),
                },
              ]}
            >
              <Icon
                name={selected?.name === v.name ? verified : radio}
                size={w(0.05)}
              />
              <AppText text={v.name} ml={w(0.02)} fontSize={13} />
            </View>
            {data?.length - 1 !== i && (
              <Hr
                alignSelf="center"
                width={"90%"}
                borderWidth={0.5}
                mt={h(0.01)}
                mb={h(0.005)}
              />
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default DropDownBudget;
