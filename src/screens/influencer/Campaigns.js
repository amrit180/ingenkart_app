import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { getMyCampaigns } from "../../functions/influencer";
import { useDispatch, useSelector } from "react-redux";
import { setCampaigns } from "../../redux/campaignsSlice";
import { useCallback } from "react";
import { Animated, View } from "react-native";
import {
  CampaignSegment,
  CreateCampaignHeader,
  Layout,
} from "../../components";
import AppliedCampaigns from "./AppliedCampaigns";
import ShortlistCampaigns from "./ShortlistCampaigns";

const Campaigns = () => {
  const { user, campaigns } = useSelector((s) => ({ ...s }));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [state, setState] = useState({
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    xTabThree: 0,
    translateX: new Animated.Value(0),
  });
  let dispatch = useDispatch();
  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    const res = await getMyCampaigns(user?.token, user?._id, page, limit).catch(
      (err) => console.log(err.response.data)
    );
    if (res.data.success) {
      dispatch(
        setCampaigns({
          appliedCampaigns: [...res.data.appliedCampaigns],
          joinedCampaigns: [...res.data.joinedCampaigns],
        })
      );
    }
  };

  // const loadMore = useCallback(async () => {
  //   const res = await getMyCampaigns(
  //     user?.token,
  //     user?._id,
  //     page + 1,
  //     limit,
  //   ).catch(err => console.log(err.response.data));
  //   if (res.data.success) {
  //     setData([...data, ...res.data.reels]);
  //     setPage(v => v + 1);
  //   }
  // }, []);
  return (
    <Layout>
      <CreateCampaignHeader headerName="My Campaigns" index={4} />
      <CampaignSegment setState={setState} state={state} />
      {state.active == 0 ? <AppliedCampaigns /> : <ShortlistCampaigns />}
    </Layout>
  );
};

export default Campaigns;
