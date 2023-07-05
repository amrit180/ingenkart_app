import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppText,
  CampaignLoader,
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
import { getFilterAPI } from "../../functions/influencer";

const IDiscover = ({ route }) => {
  const item = route.params;
  // hooks
  const childref = useRef(null);
  const user = useSelector((s) => s.user);

  const isFocused = useIsFocused();
  const [filter, setFilter] = useState(null);
  // state

  const [campaignName, setCampaignName] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(categoryIds); // Array of selected category IDs
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const [totalDocuments, setTotalDocuments] = useState(0);
  // variable
  const limit = 3;
  // lifecycle methods
  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
    setCampaignName("");
    setSelectedCategories([]);
    setPage(1);
  }, []);

  useEffect(() => {
    setLoadingCampaign(true);
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    getCampaigns();
  }, [page]);

  const getCampaigns = async () => {
    console.log("campaignName called");
    setLoadingCampaign(true);
    try {
      if (campaignName === "") {
        const res = await getCampaign(
          user?.token,
          page,
          limit,
          user?.role,
          user?._id,
          selectedCategories
        );

        if (res.data.success) {
          if (page === 1) {
            setCampaigns(res?.data?.campaigns);
          } else {
            setCampaigns((prevCampaigns) => [
              ...prevCampaigns,
              ...res?.data?.campaigns,
            ]);
          }
          setTotalDocuments(res.data?.totalCount);
        }
      }
      if (filter) {
        console.log("filtr", filter);
        const res = await getFilterAPI(
          user?.token,
          page,
          limit,
          filter.active,
          filter.filterType,
          filter.isEnabled
        );

        if (res.data.success) {
          if (page == 1) {
            setCampaigns(res?.data?.campaigns);
          } else {
            setCampaigns((prevCampaigns) => [
              ...prevCampaigns,
              ...res?.data?.campaigns,
            ]);
          }
          setTotalDocuments(res.data?.totalCount);
        }
        console.log(res.data);
      }
      if (campaignName?.length > 0) {
        // search campaign by name
        const res = await searchCampaign(
          user?.token,
          page,
          limit,
          campaignName
        );
        if (res.data.success) {
          if (page === 1) {
            setCampaigns(res?.data?.campaigns);
          } else {
            setCampaigns((prevCampaigns) => [
              ...prevCampaigns,
              ...res?.data?.campaigns,
            ]);
          }
          setTotalDocuments(res.data?.totalCount);
        }
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoadingCampaign(false);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setCampaignName("");
    setFilter(null);
    setSelectedCategories(categoryId);
  };

  // every time user reaches to the end of the page
  // another set of campaign will be loaded
  // number of campaign loaded will depend on limit variable, assigned above

  // Call the loadMoreCampaigns function when the "Load More" button is clicked
  const loadMoreCampaigns = () => {
    console.log(page);
    setPage((prevPage) => prevPage + 1);
  };

  // Call the loadMoreCampaigns function when the "Load More" button is pressed
  const handleLoadMore = () => {
    loadMoreCampaigns();
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable>
        <WishlistCard
          data={item}
          wishlist={user?.wishlist.filter((v) => v?._id === item?._id)}
        />
      </Pressable>
    );
  };
  const renderEmpty = () => {
    return loadingCampaign ? (
      <CampaignLoader />
    ) : (
      <Image
        source={empty}
        style={{
          height: 200,
          width: "100%",
          resizeMode: "contain",
          marginTop: h(0.15),
        }}
        resizeMode="contain"
      />
    );
  };
  const RenderHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          marginBottom: h(0.025),
        }}
      >
        <View
          style={[
            global.start,
            {
              flexWrap: "wrap",
              marginTop: h(0.01),
            },
          ]}
        >
          <Pill
            ph={w(0.025)}
            pv={h(0.0035)}
            variant={selectedCategories.length > 1 ? "active" : "inactive"}
            text="All"
            onPress={() => {
              handleCategoryToggle(categoryIds);
            }}
            mr={w(0.02)}
          />
          {data?.map((item, i) => (
            <Pill
              ph={w(0.025)}
              pv={h(0.0035)}
              variant={
                selectedCategories?.length == 1 &&
                selectedCategories[0] === item?.id
                  ? "active"
                  : "inactive"
              }
              onPress={() => {
                handleCategoryToggle([item.id]);
              }}
              mv={h(0.005)}
              mr={w(0.02)}
              key={i}
              text={item?.name}
            />
          ))}
        </View>
      </View>
    );
  };
  const itemSepartor = () => {
    return <Pressable style={{ height: h(0.03), width: "100%" }} />;
  };
  const renderFooter = () => {
    if (totalDocuments > campaigns?.length) {
      return (
        <>
          <Pressable style={{ height: h(0.03), width: "100%" }} />
          <CampaignLoader />
        </>
      );
    } else return <View style={{ height: h(0.03), width: "100%" }} />;
  };
  return (
    <Layout>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: colors.white }}
      >
        <StackHomeHeader noback={true} name="Discover" user={user} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: w(0.03),
            marginTop: h(0.0082),
          }}
        >
          <Search
            filter={true}
            onChangeText={(t) => setCampaignName(t)}
            value={campaignName}
            icon={true}
            onFocus={() => {
              setSelectedCategories([]);
              setPage(1);
              setFilter(null);
            }}
            placeholder="Search campaign by name..."
            placeholderColor={colors.black30}
            onPress={() => SwipeSheet(-h(1) / 1.2)}
            onSubmit={getCampaigns}
          />
        </View>
        <FlatList
          data={campaigns}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: w(0.03),
          }}
          ListEmptyComponent={renderEmpty}
          ListHeaderComponent={RenderHeader}
          ItemSeparatorComponent={itemSepartor}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.02}
          ListFooterComponent={renderFooter}
        />

        <SheetExplore
          childref={childref}
          filter={filter}
          setFilter={setFilter}
          onPress={getCampaigns}
        />
      </View>
    </Layout>
  );
};

export default IDiscover;
