import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AppText,
  Button,
  Icon,
  Layout,
  SingleCampaignHeader,
} from "../../components";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { clicktoupload, upload } from "../../container/icons";
import { pressMove } from "../../config/animation";
import { storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { uploadKycDocuments } from "../../functions/user";
import { useSelector } from "react-redux";

const KycDocument = () => {
  const buttonRef = useRef(new Animated.Value(0)).current;
  const { user } = useSelector((s) => ({ ...s }));
  const navigation = useNavigation();
  const [imageType, setImageType] = useState("pan");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [loading, setLoading] = useState(false);

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
      // aspect: [4, 3],
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
    const fileName = `brand-logo/${Date.now()}`;
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
          if (imageType == "pan") {
            setImage1(downloadURL);
          } else {
            setImage2(downloadURL);
          }
          setLoading(false);
        });
      }
    );
  };

  const handleSubmit = () => {
    uploadKycDocuments(image1, image2, user?._id, user?.token)
      .then(() => navigation.navigate("BankDetails"))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <Layout>
      <SingleCampaignHeader brandName={"Documents"} right={false} />
      <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.05) }}>
        <AppText
          text={"Upload Documents"}
          fontSize={22}
          fontFamily={"Poppins_600SemiBold"}
        />
        <View
          style={{
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              openGallery();
              setImageType("pan");
            }}
            style={{
              borderWidth: 1,
              borderColor: colors.black30,
              height: h(0.25),
              borderRadius: 15,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: h(0.02),
            }}
          >
            {image1 === "" && (
              <View
                style={{
                  position: "absolute",
                  left: w(0.05),
                  top: -10,
                  backgroundColor: colors.white,
                  paddingHorizontal: w(0.01),
                }}
              >
                <AppText text={"Pan Upload"} />
              </View>
            )}
            {image1 === "" ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: h(0.05),
                }}
              >
                <Icon name={upload} size={w(0.15)} />
                <Icon name={clicktoupload} height={h(0.07)} width={w(0.3)} />
                <AppText
                  text="Preferred size (1600X1100) Maximum 10MB"
                  fontSize={9}
                  color={"rgba(56, 70, 100, .5)"}
                />
              </View>
            ) : (
              <Image
                source={{ uri: image1 }}
                style={{ height: h(0.25), borderRadius: 15, width: "100%" }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openGallery();
              setImageType("address");
            }}
            style={{
              borderWidth: 1,
              borderColor: colors.black30,
              height: h(0.25),
              borderRadius: 15,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: h(0.05),
            }}
          >
            {image2 === "" && (
              <View
                style={{
                  position: "absolute",
                  left: w(0.05),
                  top: -10,
                  backgroundColor: colors.white,
                  paddingHorizontal: w(0.01),
                }}
              >
                <AppText text={"Address Proof Upload"} />
              </View>
            )}
            {image2 === "" ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: h(0.05),
                }}
              >
                <Icon name={upload} size={w(0.15)} />
                <Icon name={clicktoupload} height={h(0.07)} width={w(0.3)} />
                <AppText
                  text="Preferred size (1600X1100) Maximum 10MB"
                  fontSize={9}
                  color={"rgba(56, 70, 100, .5)"}
                />
              </View>
            ) : (
              <Image
                source={{ uri: image2 }}
                style={{ height: h(0.25), borderRadius: 15, width: "100%" }}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{
            marginTop: h(0.03),
            alignSelf: "center",
          }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default KycDocument;
