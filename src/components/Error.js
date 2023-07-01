import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import colors from "../assets/colors";
import { h, w } from "../config/utilFunction";
import AppText from "./AppText";
import { global } from "../styles";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/errorSlice";

const Error = ({ text }) => {
  const err = useSelector((state) => state.err);
  const dispatch = useDispatch();
  const animateOpactiy = () => {
    dispatch(
      setError({
        error: false,
        message: "",
        type: "error",
      })
    );
  };
  useEffect(() => {
    setTimeout(() => animateOpactiy(), 3000);
  }, []);

  const bgcolor =
    err.type === "error"
      ? "#f8d7da"
      : err.type === "warning"
      ? "#fff3cd"
      : colors.black;
  const color =
    err.type === "error"
      ? "#721c24"
      : err.type === "warning"
      ? "#856404"
      : colors.white;
  return (
    <Animated.View
      style={[
        global.between,
        {
          opacity: err.error ? 1 : 0,
          backgroundColor: bgcolor,
          borderRadius: 5,
          height: h(0.06),
          width: "90%",
          alignSelf: "center",
          position: "absolute",
          zIndex: 10000,
          bottom: h(0.1),
          borderWidth: 0.5,
          borderColor: color,
          paddingHorizontal: w(0.05),
          //   display: err.error ? 'flex' : 'none',
        },
      ]}
    >
      <AppText text={text} color={color} fontSize={12} />
    </Animated.View>
  );
};

export default Error;
