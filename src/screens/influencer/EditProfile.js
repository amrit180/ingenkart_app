import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import {
  AppText,
  BoxShadow,
  DropDownBudget,
  DropDownGenderAuth,
  Icon,
  Input,
  Layout,
  SimpleHeader,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { w, h } from "../../config/utilFunction";
import colors from "../../assets/colors";
import {
  setBarter,
  setBio,
  setDOB,
  setFirstName,
  setGender,
  setLastName,
  setProfilePicture,
} from "../../redux/userSlice";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { calender, category, locationblack } from "../../container/icons";
import moment from "moment";
import { global } from "../../styles";
import { data } from "../../assets/data/CategoryData";
import { useNavigation } from "@react-navigation/native";
import { editProfile } from "../../functions/user";

import {
  getDownloadURL,
  uploadString,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";

const EditProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    new Date(moment().subtract(14, "years").format())
  );
  const [showDate, setShowDate] = useState(
    moment(user?.DOB).format("DD/MM/YYYY")
  );

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  let dispatch = useDispatch();
  useEffect(() => {
    if (image) {
      uploadImage();
      setImage(null);
    }
  }, [image]);

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: "image/jpeg",
    };
    const fileName = `profile-pic/${Date.now()}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            setProfilePicture({
              url: downloadURL,
              reference: fileName,
              isDefault: false,
            })
          );
          setLoading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    if (user?.categories?.length > 0) {
      console.log(user?.DOB);
      await editProfile(
        {
          name: `${user?.firstName + " " + user?.lastName}`,
          profilePicture: {
            url: user?.profilePicture?.url,
            reference: user?.profilePicture?.reference,
          },
          barterAvailability: user?.barter,
          gender: user?.gender,
          budget: user?.budget,
          DOB: user?.DOB,
          userId: user?._id,
          about: user?.bio,
          state: user?.state,
          city: user?.city,
        },
        user?.token
      )
        .then((res) => navigation.goBack())
        .catch((err) => console.log(err.response.data));
    } else {
      console.log("Choose a category");
    }
  };
  const toggleSwitch = () =>
    dispatch(
      setBarter({
        barterAvailability: !user?.barter,
      })
    );
  const gender = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Others" },
  ];

  const budget = [
    { id: 1, name: "0K-10K", min: 0, max: 10000 },
    { id: 2, name: "10K-25K", min: 10000, max: 25000 },
    { id: 3, name: "25K-50K", min: 25000, max: 50000 },
    { id: 4, name: "50K-100K", min: 50000, max: 100000 },
    { id: 5, name: "1L+", min: 100000, max: 10000000 },
  ];
  const [selectedBudget, setSelectedBudget] = useState(
    budget.filter((v) => v.min === user?.budget?.min)[0] || null
  );
  return (
    <Layout>
      <SimpleHeader brandName={"Edit Profile"} onPress={handleSubmit} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
        }}
      >
        <Pressable>
          {loading ? (
            <View
              style={{
                height: w(0.35),
                width: w(0.35),
                alignSelf: "center",
                marginTop: h(0.05),
                borderRadius: 500,
                justifyContent: "center",
                alignItems: "center",
                borderColor: colors.black30,
                borderWidth: 0.5,
              }}
            >
              <ActivityIndicator size={w(0.08)} color={colors.black} />
            </View>
          ) : (
            <Image
              source={{ uri: user?.profilePicture?.url }}
              style={{
                height: w(0.35),
                width: w(0.35),
                alignSelf: "center",
                marginTop: h(0.05),
                borderRadius: 500,
              }}
            />
          )}
          <TouchableOpacity onPress={openGallery}>
            <AppText
              text={"Edit"}
              textDecorationLine="underline"
              color={colors.chatBlue}
              textAlign="center"
              mt={h(0.01)}
              fontFamily={"Poppins_500Medium"}
              fontSize={10}
            />
          </TouchableOpacity>

          <Input
            fontSize={12}
            variant={"text"}
            type="outline"
            width={0.9}
            mt={h(0.03)}
            textAlign="left"
            value={user?.firstName}
            placeholder="First Name"
            onChangeText={(t) => dispatch(setFirstName({ firstName: t }))}
          />
          <Input
            fontSize={12}
            variant={"text"}
            type="outline"
            width={0.9}
            mt={h(0.03)}
            mb={h(0.03)}
            textAlign="left"
            value={user?.lastName}
            placeholder="Last Name"
            onChangeText={(t) => dispatch(setLastName({ lastName: t }))}
          />
          <DropDownGenderAuth
            type="inline"
            data={gender}
            selected={gender.filter((v) => v.name == user?.gender)[0]}
            setSelected={(t) => dispatch(setGender({ gender: t.name }))}
          />
          <DropDownBudget
            mt={h(0.03)}
            type="inline"
            data={budget}
            selected={selectedBudget}
            setSelected={setSelectedBudget}
            user={true}
          />

          <View style={{ marginTop: h(0.03) }}>
            <View
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 15,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  paddingHorizontal: w(0.07),
                  backgroundColor: colors.white,
                },
              ]}
            >
              <AppText
                text={"Barter: " + `${user?.barter ? "Yes" : "No"}`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={13}
              />
              <Switch
                trackColor={{
                  false: "rgba(216, 216, 216, 1)",
                  true: colors.green,
                }}
                thumbColor={colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={user?.barter}
              />
            </View>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.004)}
            />
          </View>
          {open && (
            <DateTimePicker
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={date}
              maximumDate={new Date(moment().subtract(14, "years").format())}
              onChange={(e, tdate) => {
                setOpen(false);
                setDate(e.nativeEvent.timestamp);
                dispatch(
                  setDOB({ DOB: moment(e.nativeEvent.timestamp).format() })
                );
                setShowDate(
                  moment(e.nativeEvent.timestamp).format("DD/MM/YYYY")
                );
              }}
            />
          )}
          <View style={{ marginTop: h(0.03) }}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 15,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  paddingHorizontal: w(0.07),
                  backgroundColor: colors.white,
                },
              ]}
            >
              {user?.DOB !== "" && (
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
                    text="DOB"
                    fontFamily={"Montserrat_500Medium"}
                    fontSize={10}
                    color={colors.black}
                  />
                </View>
              )}
              <AppText
                text={`${user?.DOB === "" ? "DOB" : showDate}`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={13}
              />

              <Icon name={calender} size={w(0.05)} />
            </TouchableOpacity>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.004)}
            />
          </View>

          <Input
            fontSize={14}
            variant={"text"}
            multiline={true}
            type="outline"
            width={0.9}
            mt={h(0.03)}
            placeholder="Bio"
            height={0.2}
            value={user?.bio}
            textAlign="left"
            onChangeText={(t) => dispatch(setBio({ bio: t }))}
          />
          <View style={{ position: "relative", marginTop: h(0.04) }}>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.005)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Location")}
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 15,
                  backgroundColor: colors.white,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  paddingHorizontal: w(0.07),
                },
              ]}
            >
              {user?.state !== "" && user?.city !== "" && (
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
                    fontSize={10}
                    color={colors.black}
                  />
                </View>
              )}
              <AppText
                text={`${
                  user?.state === "" && user?.city === ""
                    ? "Location"
                    : user?.state + ", " + user?.city
                }`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
              />

              <Icon name={locationblack} size={w(0.05)} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditCategory")}
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
                paddingHorizontal: w(0.04),
                marginBottom: h(0.1),
              },
            ]}
          >
            {user?.categories !== "" && (
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
                  text="Categories"
                  fontFamily={"Montserrat_500Medium"}
                  fontSize={12}
                  color={colors.black}
                />
              </View>
            )}
            <View style={global.start}>
              <Icon name={category} size={w(0.05)} />
              <AppText
                text={`${
                  user?.categories === ""
                    ? "Categories"
                    : user?.categories
                        .map((v) => data.filter((k) => k.id === v)[0].name)
                        .join(", ")
                        .substr(0, 30) + "..."
                }`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
                ml={w(0.01)}
              />
            </View>

            <AppText
              text={"Edit"}
              textDecorationLine="underline"
              color={colors.chatBlue}
              textAlign="center"
              mt={h(0.01)}
              fontFamily={"Poppins_500Medium"}
              fontSize={12}
            />
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default EditProfile;
