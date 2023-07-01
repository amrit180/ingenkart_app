import { View, Text, ScrollView, Pressable } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ExploreCard,
  Icon,
  Layout,
  Pill,
  RangeSlider,
  Search,
  SheetExplore,
  StackHomeHeader,
} from "../../components";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { categoryIds, data } from "../../assets/data/CategoryData";
import { global } from "../../styles";
import { useIsFocused } from "@react-navigation/native";
import { searchInfluencerAPI } from "../../functions/brand";
import { useSelector } from "react-redux";
import { empty } from "../../container/images";

const Discover = ({ route }) => {
  const item = route.params;
  const childref = useRef(null);
  const [category, setCategory] = useState("all");
  // state
  const { user } = useSelector((s) => ({ ...s }));

  const [influencers, setInfluencers] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingInfluencer, setLoadingInfluencer] = useState(false);
  const isFocused = useIsFocused();
  // variable
  const limit = 5;

  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
  }, []);
  // categoryIds : this is the array which stores the IDs of the categories, which is used for fetching all campaigns
  //  data : it is also an array of categorie but it not only stores IDs but also stores it's name and image
  useEffect(() => {
    if (category === "all") {
      getInfluencersByCategories(categoryIds);
      // console.warn("ALL ID=>", category);
    } else {
      const categoryId = [data?.find((item) => item?.name === category)?.id];
      // console.warn(categoryId);
      getInfluencersByCategories(categoryId);
    }
  }, [category, isFocused]);
  useEffect(() => {
    setCategory(item ? item.categoryName : "all");
  }, [item?.categoryName]);

  // functions
  // campaign will be fetched based on the categoryList which is an array od category IDs
  const getInfluencersByCategories = (categorylist) => {
    setLoadingInfluencer(true);
    const myValues = {
      page: page,
      limit: limit,
      categories: categorylist,
    };
    searchInfluencerAPI(user?.token, myValues)
      .then((res) => {
        if (res.data.success) {
          setInfluencers(res.data?.influencers);
          setLoadingInfluencer(false);
          console.log(
            "FETCHING INFLUENCERS BASED ON CATEGORIES===================>",
            res.data?.influencers
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingInfluencer(false);
      });
  };
  // every time user reaches to the end of the page
  // another set of campaign will be loaded
  // number of campaign loaded will depend on limit variable, assigned above
  const loadMore = useCallback((categorylist) => {
    const myValues = {
      page: page,
      limit: limit,
      categories: categorylist,
    };
    // console.warn("hit");
    searchInfluencerAPI(user?.token, myValues)
      .then((res) => {
        if (res.data.success) {
          setInfluencers((prev) => [...prev, ...res.data.influencers]);
          setPage((v) => v + 1);
        }
        // console.warn("success");
      })
      .catch((err) =>
        console.log("LOAD MORE ERROR IN DISCOVER=>", err.response.data)
      );
  }, []);

  return (
    <Layout>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: colors.appbg }}
      >
        <StackHomeHeader noback={true} name="Discover" user={user} />
        <ScrollView>
          <View
            style={{
              width: "100%",
              minHeight: h(0.25),
            }}
          >
            {/* <Search
              filter={true}
              icon={true}
              placeholder="Search influencers..."
              placeholderColor={colors.black30}
              onPress={() => SwipeSheet(-h(1.05))}
            /> */}
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
                  variant={category === item.name ? "active" : "inactive"}
                  onPress={() => setCategory(item.name)}
                  mv={h(0.005)}
                  mr={w(0.01)}
                  key={i}
                  text={item.name}
                />
              ))}
            </View>
          </View>
          <Pressable>
            {/* <Text> {JSON.stringify(influencers[0], 2, 4)} </Text> */}
          </Pressable>

          <View style={{ paddingHorizontal: w(0.03), marginTop: h(0.03) }}>
            {influencers?.map((item, i) => (
              <ExploreCard item={item} key={i} mb={h(0.02)} />
            ))}

            {influencers?.length < 1 && (
              <Icon name={empty} width={"100%"} height={300} />
            )}
          </View>
          {/* <View style={{paddingHorizontal: 40}}>
          <RangeSlider from={4} to={3000} />
        </View> */}
        </ScrollView>
        <SheetExplore childref={childref} />
      </View>
    </Layout>
  );
};

export default Discover;
