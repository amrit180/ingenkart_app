import { View, Pressable, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../assets/colors";
import { backArrow, locationblack, logo } from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import { AppText, Hr, Icon, Input } from "../../components";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { global } from "../../styles";

import { useDispatch, useSelector } from "react-redux";
import { setCity, setState } from "../../redux/authSlice";
import { getCities, getState } from "../../functions/location";
import { Layout } from "../../components";
import { search } from "../../container/icons";
const Location = () => {
  // HOOKS
  const navigation = useNavigation();
  let dispatch = useDispatch();
  const isFocussed = useIsFocused();
  // REDUX
  const { auth } = useSelector((state) => ({ ...state }));
  // STATE
  const [stateLocation, setStateLocation] = useState([]);
  const [cityLocation, setCityLocation] = useState([]);
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [location, setLocation] = useState({
    state: "",
    city: "",
  });
  const [currentState, setCurrentState] = useState(null);

  // ======================================================
  // FUNCTIONS
  // ======================================================
  const getStateForLocation = async () => {
    setStateLocation((await getState()).data);
  };
  const getCityForLocation = async (code) => {
    setCityLocation((await getCities(code)).data);
  };
  useEffect(() => {
    getStateForLocation();
  }, []);
  useEffect(() => {
    // dispatch(setState({ state: "" }));
    // dispatch(setState({ city: "" }));

    if (auth?.state !== "") {
      setIsStateSelected(true);
      setLocation({
        state: auth?.state,
        city: auth?.city,
      });
    }
  }, []);
  // run this function every time state is being searched so that
  // the value of city could be made empty string,every time new state is being searched
  const handleStateChange = (t) => {
    setLocation({ state: t, city: "" });
    dispatch(setState({ city: "" }));
    if (
      stateLocation.includes(
        (state) => state.name.toLowerCase() === t.toLowerCase()
      )
    ) {
      setIsStateSelected(true);
    } else {
      setIsStateSelected(false);
    }
  };
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
        }}
      >
        <View style={[global.between, { marginTop: h(0.02) }]}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name={backArrow} size={w(0.1)} />
          </Pressable>
          <Icon name={logo} size={w(0.12)} />
        </View>

        <AppText
          text={"Select State and City"}
          fontFamily={"Montserrat_600SemiBold"}
          fontSize={16}
          textAlign="center"
        />

        <TouchableOpacity
          activeOpacity={1}
          style={[
            global.between,
            {
              marginTop: h(0.02),
              minHeight: h(0.07),
              width: "100%",
              borderRadius: 15,
              position: "relative",
              borderColor: colors.black30,
              borderWidth: 1,
              paddingHorizontal: w(0.07),
            },
          ]}
        >
          <View
            style={{
              backgroundColor: colors.white,
              position: "absolute",
              top: -h(0.01),
              left: w(0.03),
              paddingHorizontal: w(0.01),
            }}
          >
            <AppText
              textAlign={"center"}
              text="Location"
              fontFamily={"Montserrat_500Medium"}
              fontSize={12}
              color={colors.black}
            />
          </View>

          <AppText
            text={
              auth?.state === "" ||
              auth?.state === undefined ||
              auth?.state === null
                ? "Select your state and city"
                : `${"State: " + auth?.state + ", " + "City: " + auth?.city}`
            }
            fontFamily={"Montserrat_500Medium"}
            fontSize={15}
          />

          <Icon name={locationblack} size={w(0.05)} />
        </TouchableOpacity>

        <Input
          pH={w(0.025)}
          mt={h(0.03)}
          icon={search}
          iconright={w(0.07)}
          onFocus={() => getState()}
          type="outline"
          placeholder="Select State"
          value={location?.state}
          onChangeText={(t) => handleStateChange(t)}
          variant="text"
          mb={auth?.error && location.state?.length < 1 ? 0 : h(0.03)}
          width={0.893}
          fontFamily={"Montserrat_500Medium"}
          fontSize={16}
          maxLength={100}
          textAlign="left"
          error={auth?.error && location.state?.length < 0}
          message="location not found"
        />
        {/* the city input box will be active only when state is selected, untill then it will be disabled */}
        {auth?.state !== "" && isStateSelected && (
          <Input
            pH={w(0.025)}
            onFocus={() => getCityForLocation(currentState.iso2)}
            type="outline"
            placeholder="City"
            value={location.city}
            icon={search}
            iconright={w(0.07)}
            onChangeText={(t) => setLocation({ ...location, city: t })}
            variant="text"
            mb={auth?.error && location?.city?.length < 1 ? 0 : h(0.03)}
            width={0.893}
            fontFamily={"Montserrat_500Medium"}
            fontSize={16}
            maxLength={100}
            textAlign="left"
            error={auth?.error && location?.city?.length < 0}
            message="location not found"
          />
        )}
        {/* on this screen there will be top 10 state displayed so that user can select them quickly and
       there will be no need to write the name of their state in input box and search and then select. Those top 10 states are displayed here
        and for selection TouchableOpacity is used  */}
        {stateLocation
          ?.filter((v) =>
            v.name.toLowerCase().match(location.state.toLowerCase())
          )
          ?.slice(0, 10)
          ?.map((v, i) => (
            <TouchableOpacity
              onPress={() => {
                setLocation({ ...location, state: v.name });
                dispatch(setState({ state: v.name }));
                setCurrentState(v);
                setStateLocation([]);
                setIsStateSelected(true);
              }}
              key={i}
            >
              <AppText text={v.name} color={"rgba(84, 84, 84, 1)"} />
              <Hr width={"100%"} borderWidth={0.5} mt={h(0.01)} mb={h(0.01)} />
            </TouchableOpacity>
          ))}
        {/* once the state is selected, either from quick selection from above or from input box search, 
        the list of their cities will be displayed below but only the top 10. 
        If user could not find their city within that top 10, they could search as usual from input search */}
        {cityLocation
          ?.filter((v) =>
            v.name.toLowerCase().match(location.city.toLowerCase())
          )
          ?.slice(0, 10)
          ?.map((v, i) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setCity({ city: v.name }));
                navigation.navigate("PersonalInfo");
              }}
              key={i}
            >
              <AppText text={v.name} color={"rgba(84, 84, 84, 1)"} />
              <Hr width={"100%"} borderWidth={0.5} mt={h(0.01)} mb={h(0.01)} />
            </TouchableOpacity>
          ))}
      </View>
    </Layout>
  );
};

export default Location;
