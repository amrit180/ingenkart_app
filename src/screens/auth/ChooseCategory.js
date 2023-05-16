import {
  View,
  Text,
  Animated,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useNavigationState } from "@react-navigation/native";
import {
  AppText,
  AuthHeader,
  Button,
  ChooseImage,
  Layout,
} from "../../components";
import {
  selectfashion,
  selectfood,
  selecthealth,
  selectlifestyle,
  selectphotography,
  selecttech,
} from "../../container/images";

import { moveVertical, pressMove } from "../../config/animation";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setError } from "../../redux/authSlice";
import as from "@react-native-async-storage/async-storage";
import { getCategories } from "../../functions/auth";
import { HelperText } from "react-native-paper";

const ChooseCategory = ({ navigation }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const routesLength = useNavigationState((state) => state.routes.length);
  const movelife = useRef(
    new Animated.Value(auth?.categories.includes("LifeStyle") ? -10 : 0)
  ).current;
  const movetech = useRef(
    new Animated.Value(auth?.categories.includes("Technology") ? -10 : 0)
  ).current;
  const movephoto = useRef(
    new Animated.Value(auth?.categories.includes("Photography") ? -10 : 0)
  ).current;
  const movefood = useRef(
    new Animated.Value(auth?.categories.includes("Food & Beverage") ? -10 : 0)
  ).current;
  const movehealth = useRef(
    new Animated.Value(auth?.categories.includes("Health & Fitness") ? -10 : 0)
  ).current;
  const movefashion = useRef(
    new Animated.Value(auth?.categories.includes("Fashion & Beauty") ? -10 : 0)
  ).current;
  const buttonRef = useRef(new Animated.Value(0)).current;
  const scaleLife = useRef(
    new Animated.Value(auth?.categories.includes("LifeStyle") ? 1 : 0)
  ).current;
  const scaleTech = useRef(
    new Animated.Value(auth?.categories.includes("Technology") ? 1 : 0)
  ).current;
  const scalePhoto = useRef(
    new Animated.Value(auth?.categories.includes("Photography") ? 1 : 0)
  ).current;
  const scaleFood = useRef(
    new Animated.Value(auth?.categories.includes("Food & Beverage") ? 1 : 0)
  ).current;
  const scaleHealth = useRef(
    new Animated.Value(auth?.categories.includes("Health & Fitness") ? 1 : 0)
  ).current;
  const scaleFashion = useRef(
    new Animated.Value(auth?.categories.includes("Fashion & Beauty") ? 1 : 0)
  ).current;

  const data = [
    {
      id: "63cbb3fc0de54ad7bdc59a57",
      image: selectlifestyle,
      name: "LifeStyle",
      ref1: movelife,
      ref2: scaleLife,
    },
    {
      id: "63cbb4030de54ad7bdc59a59",
      image: selecttech,
      name: "Technology",
      ref1: movetech,
      ref2: scaleTech,
    },
    {
      id: "63fd1fe8cd2699663ac0d412",
      image: selectphotography,
      name: "Photography",
      ref1: movephoto,
      ref2: scalePhoto,
    },
    {
      id: "63fd1feccd2699663ac0d413",
      image: selectfood,
      name: "Food & Beverage",
      ref1: movefood,
      ref2: scaleFood,
    },
    {
      id: "63fd2036cd2699663ac0d414",
      image: selecthealth,
      name: "Health & Fitness",
      ref1: movehealth,
      ref2: scaleHealth,
    },
    {
      id: "63fd203bcd2699663ac0d415",
      image: selectfashion,
      name: "Fashion & Beauty",
      ref1: movefashion,
      ref2: scaleFashion,
    },
  ];

  const handleSubmit = async () => {
    if (auth?.categories?.length > 0) {
      dispatch(setError({ error: false }));
      // console.log(JSON.stringify(auth.categories, null, 4));
      await as.setItem("@auth_user", JSON.stringify(auth));
      navigation.navigate("Login");
    } else {
      dispatch(setError({ error: true }));
    }
  };
  return (
    <Layout>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingHorizontal: w(0.08),
        }}
      >
        <AuthHeader index={routesLength} progress={0.6} />
        <AppText
          fontFamily={"Poppins_600SemiBold"}
          fontSize={26}
          text="Choose category"
          mt={h(0.025)}
        />
        <AppText
          fontSize={13}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color={colors.black50}
          mt={h(0.01)}
        />
        <View style={{ height: h(0.65) }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item, index }) => (
              <Pressable
                onPressIn={() => {
                  console.log(
                    auth?.categories.filter((c) => c == item.id)?.length
                  );
                  if (
                    auth?.categories.filter((c) => c == item.id)?.length > 0
                  ) {
                    dispatch(
                      setCategories({
                        categories: auth?.categories?.filter(
                          (c) => c !== item.id
                        ),
                      })
                    );
                    moveVertical({
                      name: item.ref1,
                      pos: 0,
                      duration: 500,
                    });
                    moveVertical({
                      name: item.ref2,
                      pos: 0,
                      duration: 500,
                    });
                  } else {
                    let res = auth?.categories;
                    res = [...res, item.id];
                    dispatch(
                      setCategories({
                        categories: res,
                      })
                    );
                    moveVertical({
                      name: item.ref1,
                      pos: -10,
                      duration: 500,
                    });
                    moveVertical({
                      name: item.ref2,
                      pos: 1,
                      duration: 500,
                    });
                  }
                }}
                style={{
                  paddingBottom: 5,
                  marginRight:
                    index == 0
                      ? w(0.03)
                      : index > 0 && index % 2 === 0
                      ? w(0.03)
                      : 0,
                }}
              >
                <ChooseImage
                  mt={h(0.07)}
                  name={item.image}
                  bheight={0.13}
                  iheight={0.125}
                  bwidth={0.4}
                  iwidth={0.39}
                  height={0.18}
                  width={0.3}
                  check={
                    auth?.categories?.filter((c) => c == item.id)?.length > 0
                  }
                  top={60}
                  translate={item.ref1}
                  text={item.name}
                  scaleRef={item.ref2}
                />
              </Pressable>
            )}
          />
        </View>
        {auth?.error && (
          <HelperText type="error" visible={auth?.error}>
            Choose atleast one category
          </HelperText>
        )}
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{ alignSelf: "center" }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default ChooseCategory;
