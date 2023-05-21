import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AppText, Icon, Input, Layout, SimpleHeader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { w, h } from "../../config/utilFunction";
import colors from "../../assets/colors";
import {
  setBio,
  setDOB,
  setFirstName,
  setLastName,
  setProfilePicture,
} from "../../redux/userSlice";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { calender, category } from "../../container/icons";
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
  const [date, setDate] = useState(new Date());
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
      await editProfile(
        {
          name: `${user?.firstName + " " + user?.lastName}`,
          profilePicture: {
            url: user?.profilePicture?.url,
            reference: user?.profilePicture?.reference,
          },
          DOB: user?.DOB,
          userId: user?._id,
          about: user?.bio,
        },
        user?.token
      )
        .then((res) => navigation.goBack())
        .catch((err) => console.log(err.response.data));
    } else {
      console.log("Choose a category");
    }
  };
  return (
    <Layout>
      <SimpleHeader brandName={"Edit Profile"} onPress={handleSubmit} />
      <ScrollView
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
        }}
      >
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
            fontSize={12}
          />
        </TouchableOpacity>

        <Input
          fontSize={14}
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
          fontSize={14}
          variant={"text"}
          type="outline"
          width={0.9}
          mt={h(0.03)}
          textAlign="left"
          value={user?.lastName}
          placeholder="Last Name"
          onChangeText={(t) => dispatch({ lastName: t })}
        />
        {/* <Input
          fontSize={14}
          variant={'text'}
          type="outline"
          width={0.9}
          mt={h(0.03)}
          textAlign="left"
          value={user?.DOB}
          placeholder="Date of Birth"
        /> */}

        {/* <View
          style={[
            global.between,
            {
              marginTop: h(0.02),
              minHeight: h(0.07),
              width: '100%',
              borderRadius: 15,
              position: 'relative',
              borderColor: colors.black30,
              borderWidth: 1,
              paddingHorizontal: w(0.07),
            },
          ]}>
          <AppText
            text={'Barter: ' + `${auth?.barterAvailability ? 'Yes' : 'No'}`}
            fontFamily={"Montserrat_500Medium"}
            fontSize={15}
          />
          <Switch
            trackColor={{
              false: 'rgba(216, 216, 216, 1)',
              true: colors.green,
            }}
            thumbColor={colors.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={auth?.barterAvailability}
          />
        </View> */}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            dispatch(setDOB({ DOB: moment(date).format() }));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
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
                fontSize={12}
                color={colors.black}
              />
            </View>
          )}
          <AppText
            text={`${
              user?.DOB === "" ? "DOB" : moment(user?.DOB).format("DD/MM/YYYY")
            }`}
            fontFamily={"Montserrat_500Medium"}
            fontSize={15}
          />

          <Icon name={calender} size={w(0.05)} />
        </TouchableOpacity>
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
        {/* <Input
          fontSize={14}
          variant={'text'}
          type="outline"
          width={0.9}
          mt={h(0.03)}
          textAlign="left"
          value={user?.DOB}
          placeholder="Category"
        /> */}
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
      </ScrollView>
    </Layout>
  );
};

export default EditProfile;
