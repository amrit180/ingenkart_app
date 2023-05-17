import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AppText, AuthHeader, Button, Icon, Layout } from "../../../components";
import { h, w } from "../../../config/utilFunction";

import colors from "../../../assets/colors";
import { useNavigationState } from "@react-navigation/native";
import { camera } from "../../../container/icons";
import { global } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import {
  getDownloadURL,
  uploadString,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { setError, setProfilePicture } from "../../../redux/authSlice";
import { demoUrl } from "../../../config/Values";
import as from "@react-native-async-storage/async-storage";
import { pressMove } from "../../../config/animation";
import { HelperText } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../../firebase";
const LogoUpload = ({ navigation }) => {
  const routesLength = useNavigationState((state) => state.routes.length);
  const { auth } = useSelector((state) => ({ ...state }));
  const buttonRef = useRef(new Animated.Value(0)).current;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const imageName = uuid.v4();

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
    if (auth?.profilePicture.url === "") {
      dispatch(setError({ error: true }));
    } else {
      dispatch(setError({ error: false }));
      await as.setItem("@auth_user", JSON.stringify(auth));
      navigation.navigate(
        `${auth?.role === "brand" ? "Login" : "ChooseCategory"}`
      );
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
          text={auth?.role === "brand" ? "Upload Logo" : "Choose a Picture"}
          mt={h(0.025)}
        />
        <AppText
          fontSize={13}
          text="To personalise your profile and make a lasting impression  we kindly request you to upload a picture"
          color={colors.black50}
          mt={h(0.01)}
        />
        <Pressable onPress={openGallery}>
          <ImageBackground
            source={{
              uri:
                auth?.profilePicture?.url === ""
                  ? demoUrl
                  : auth?.profilePicture?.url,
            }}
            style={[
              {
                overflow: "hidden",
                backgroundColor: colors.photobg,
                height: w(0.55),
                width: w(0.55),
                borderRadius: 500,
                alignSelf: "center",
                marginTop: h(0.1),
              },
              global.center,
            ]}
          >
            {loading ? (
              <ActivityIndicator size={w(0.15)} color={colors.black} />
            ) : (
              auth?.profilePicture?.url === "" && (
                <Icon name={camera} size={w(0.15)} />
              )
            )}
          </ImageBackground>
        </Pressable>

        <AppText
          text="Upload a picture"
          textAlign="center"
          mt={h(0.05)}
          fontFamily={"Inter_600SemiBold"}
          fontSize={15}
        />
        <AppText
          text="We need your photograph to ensure your identity."
          textAlign="center"
          mt={h(0.025)}
          fontFamily={"Inter_500Medium"}
          fontSize={11}
          color={colors.graytxt}
        />
        {auth?.error && auth?.profilePicture?.url == "" && (
          <HelperText
            type="error"
            visible={auth?.error}
            style={{ textAlign: "center" }}
          >
            Picture is required
          </HelperText>
        )}
        {/* <Button
        onPress={() => navigation.navigate('Login')}
        variant="info"
        name="Skip"
        width={w(0.15)}
        height={h(0.035)}
        alignSelf="center"
        mt={h(0.025)}
      /> */}
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{ alignSelf: "center", marginTop: h(0.025) }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default LogoUpload;
