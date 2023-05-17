import { View, ScrollView, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Icon,
  Layout,
  Pill,
  Search,
  SheetExplore,
  StackHomeHeader,
  WishlistCard,
} from "../../components";
import { h, w, capitalizeFirstLetter } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { categoryIds, data } from "../../assets/data/CategoryData";
import { global } from "../../styles";
import { getCampaign } from "../../functions/campaign";
import { useSelector } from "react-redux";
import { searchCampaign } from "../../functions/user";
import { useIsFocused } from "@react-navigation/native";
import { empty } from "../../container/images";

const IDiscover = ({ route }) => {
  const item = route.params;
  // hooks
  const childref = useRef(null);
  const { user } = useSelector((s) => ({ ...s }));
  const isFocused = useIsFocused();
  // state
  const [campaign, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);
  // variable
  const limit = 5;
  // lifecycle methods
  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
  }, []);

  // useEffect(() => {
  //   setCategory("all");
  // }, []);
  // categoryIds : this is the array which stores the IDs of the categories, which is used for fetching all campaigns
  //  data : it is also an array of categorie but it not only stores IDs but also stores it's name and image
  useEffect(() => {
    if (category === "all") {
      getCategoriesCampaign(categoryIds);
      // console.warn("ALL ID=>", category);
    } else {
      const categoryId = [data?.find((item) => item?.name === category)?.id];
      // console.warn(categoryId);
      getCategoriesCampaign(categoryId);
    }
  }, [category, isFocused]);
  useEffect(() => {
    if (category === "all") {
      getCategoriesCampaignByPage(categoryIds);
      // console.warn("ALL ID=>", category);
    } else {
      const categoryId = [data?.find((item) => item?.name === category)?.id];
      // console.warn(categoryId);
      getCategoriesCampaignByPage(categoryId);
    }
  }, [page]);

  useEffect(() => {
    if (campaignName.replace(/\s/g, "")?.length > 0) {
      getSearch();
    }
  }, [campaignName]);

  // functions
  // campaign will be fetched based on the categoryList which is an array od category IDs
  const getCategoriesCampaignByPage = (categorylist) => {
    setLoadingCampaign(true);
    getCampaign(user?.token, page, limit, user?.role, user?._id, categorylist)
      .then((res) => {
        if (res.data.success) {
          const array = [...campaign, ...res?.data?.campaigns];
          const uniqueArray = [...new Set(array)];
          setCampaigns(uniqueArray);
          setLoadingCampaign(false);
          setTotalDocuments(res.data?.totalDocuments);
          console.log(
            "FETCHING CAMPAIGN BASED ON CATEGORIES===================>",
            res.data
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingCampaign(false);
      });
  };
  const getCategoriesCampaign = (categorylist) => {
    setLoadingCampaign(true);
    getCampaign(user?.token, page, limit, user?.role, user?._id, categorylist)
      .then((res) => {
        if (res.data.success) {
          setCampaigns(res?.data?.campaigns);
          setLoadingCampaign(false);
          setTotalDocuments(res.data?.totalDocuments);
          console.log(
            "FETCHING CAMPAIGN BASED ON CATEGORIES===================>",
            res.data
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingCampaign(false);
      });
  };
  // every time user reaches to the end of the page
  // another set of campaign will be loaded
  // number of campaign loaded will depend on limit variable, assigned above
  const loadMore = () => {
    if (totalDocuments > campaign?.length) {
      setPage((prev) => prev + 1);
    }
  };

  const getSearch = () => {
    setLoadingCampaign(true);

    searchCampaign(user?.token, page, limit, campaignName)
      .then((res) => {
        if (res.data.success) {
          setCampaigns(res.data.campaigns);
          console.log("SEARCH DATA BY CAMPAIGN NAME==>", res.data);
          setLoadingCampaign(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingCampaign(false);
      });
  };
  return (
    <Layout>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: colors.appbg }}
      >
        <StackHomeHeader noback={true} name="Discover" />
        {/* <AppText text={category} /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() =>
            loadMore(
              category === "all"
                ? categoryIds
                : [data.find((item) => item?.name === category)?.id]
            )
          }
        >
          <View
            style={{
              width: "100%",
              minHeight: h(0.25),
            }}
          >
            <Search
              filter={true}
              onChangeText={(t) => setCampaignName(t)}
              value={campaignName}
              icon={true}
              onFocus={() => {
                setPage(1);
                setCampaigns([]);
              }}
              placeholder="Search campaign by name..."
              placeholderColor={colors.black30}
              onPress={() => SwipeSheet(-h(1) / 1.2)}
            />
            <View
              style={[
                global.start,
                {
                  flexWrap: "wrap",
                  paddingHorizontal: w(0.03),
                  marginTop: h(0.01),
                },
              ]}
            >
              <Pill
                ph={w(0.03)}
                pv={h(0.005)}
                variant={category === "all" ? "active" : "inactive"}
                text="ALL"
                onPress={() => setCategory("all")}
                mr={w(0.005)}
              />
              {data?.map((item, i) => (
                <Pill
                  ph={w(0.03)}
                  pv={h(0.005)}
                  variant={category === item?.name ? "active" : "inactive"}
                  onPress={() => setCategory(item?.name)}
                  mv={h(0.005)}
                  mr={w(0.01)}
                  key={i}
                  text={item?.name}
                />
              ))}
            </View>
          </View>
          <View style={{ paddingHorizontal: w(0.05) }}>
            {campaign?.length < 1 && (
              <Icon name={empty} width={"100%"} height={300} />
            )}

            {campaign?.map((item, i) => (
              <WishlistCard
                data={item}
                mt={h(0.01)}
                wishlist={user?.wishlist.filter((v) => v?._id === item?._id)}
                key={i}
              />
            ))}
          </View>
          {loadingCampaign && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 260,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  textAlign: "center",
                  fontSize: 22,
                }}
              >
                {" "}
                Loading...{" "}
              </Text>
            </View>
          )}
        </ScrollView>
        <SheetExplore childref={childref} />
      </View>
    </Layout>
  );
};

export default IDiscover;
