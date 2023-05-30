import {
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  Button,
  CreateCampaignHeader,
  Icon,
  Input,
  Layout,
} from "../../components";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useDispatch, useSelector } from "react-redux";
import { clicktoupload, upload } from "../../container/icons";
import { global } from "../../styles";
import { setCampaignBanner } from "../../redux/createCampaignSlice";
import { createCampaignAPI } from "../../functions/brand";
import { useNavigation } from "@react-navigation/native";
import { storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import uuid from "react-native-uuid";

const CampaignMedia = () => {
  const { createCampaign, user } = useSelector((state) => ({ ...state }));
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const navigation = useNavigation();
  // create campaign
  const sendCampaignForApproval = () => {
    setLoadingCampaign(true);
    const updatedCreateCampaign = {
      ...createCampaign, // copy all properties from the original object
      deliverableType: createCampaign.deliverable,
      campaignCategories: createCampaign.categories, // use the original value of "categories" for the new key "campaignCategories"
      isBarter: createCampaign.barter, // use the original value of "barter" for the new key "isBarter"
      influencerRequired: createCampaign.requiredInfluencers, // use the original value of "requiredInfluencers" for the new key "influencerRequired"
    };
    delete updatedCreateCampaign.deliverable;
    delete updatedCreateCampaign.categories;
    delete updatedCreateCampaign.barter;
    delete updatedCreateCampaign.requiredInfluencers;

    // remove the old key "deliverable"
    // call api
    createCampaignAPI(user?.token, updatedCreateCampaign)
      .then((res) => {
        console.log("CREATE CAMPAIGN==>", res.data);
        setLoadingCampaign(false);
        navigation.replace("UserProfile");
      })
      .catch((err) => {
        console.log("ERROR IN CREATING CAMPAIGN==>", err.response.data);
        setLoadingCampaign(false);
      });
  };

  const disableCondition =
    createCampaign?.campaignCategories?.length < 1 ||
    createCampaign?.age?.min < 1 ||
    createCampaign?.influencerRequired < 1 ||
    createCampaign?.followersRange < 1 ||
    createCampaign?.gender === "";

  const movetonext = () => {
    if (disableCondition) {
      dispatch(
        setError({
          error: true,
          message: "Upload Banner",
        })
      );
    } else {
      sendCampaignForApproval();
    }
  };

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
          dispatch(
            setCampaignBanner({
              campaignBanner: downloadURL,
            })
          );
          setLoading(false);
        });
      }
    );
  };

  return (
    <Layout>
      <CreateCampaignHeader index={2} handleSubmit={movetonext} />
      <ScrollView>
        <Pressable>
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
              paddingTop: h(0.02),
              minHeight: h(1),
              paddingBottom: h(0.3),
            }}
          >
            <AppText
              text="Campaign Media"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
            />
            <AppText
              text="Upload the media files which represts you the best"
              fontSize={13}
              color={colors.black50}
            />
            <AppText
              text="Campaign Banner"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            {/* <ScrollView>
              <Pressable>
                <AppText text={JSON.stringify(createCampaign, null, 4)} />
              </Pressable>
            </ScrollView> */}
            <TouchableOpacity
              onPress={openGallery}
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
              {createCampaign?.campaignBanner === "" ? (
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
                  source={{ uri: createCampaign?.campaignBanner }}
                  style={{ height: h(0.25), borderRadius: 15, width: "100%" }}
                />
              )}
            </TouchableOpacity>
            {/* <AppText
              text="Reference Image"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <View
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
              {createCampaign?.campaignBanner === "" ? (
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
                <View></View>
              )}
            </View>
            <AppText
              text="Product/Service Media"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <View style={[global.between, { paddingBottom: h(0.02) }]}>
              <Input
                type="outline"
                variant="text"
                width={0.55}
                fontSize={14}
                placeholder="Name"
                value={createCampaign?.serviceMedia?.name}
                onChangeText={(t) => dispatch(setServiceName({ name: t }))}
              />
              <Input
                type="outline"
                variant="text"
                width={0.3}
                fontSize={14}
                placeholder="Price"
                value={createCampaign?.serviceMedia?.price}
                onChangeText={(t) => dispatch(setServicePrice({ price: t }))}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.black30,
                height: h(0.25),
                borderRadius: 15,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: h(0.02),
              }}
            >
              {createCampaign?.campaignBanner === "" ? (
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
                <View></View>
              )}
            </View> */}
          </View>
        </Pressable>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: 100,
          width: "90%",
          alignSelf: "center",
          // backgroundColor: "red",
        }}
      >
        <Button
          name={"Create Campaign"}
          onPress={loadingCampaign ? null : movetonext}
          variant={"standard"}
          height={h(0.07)}
          width={"100%"}
          alignSelf={"center"}
          isLoading={loadingCampaign}
        />
      </View>
    </Layout>
  );
};

export default CampaignMedia;
