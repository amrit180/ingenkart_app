// import {View, Text, useWindowDimensions, Image} from 'react-native';
// import React from 'react';
// import {calTime, refHeight, refSize, refWidth} from '../../../config/utilFunc';
// import Avatar from '../../Avatar';
// import {
//   "Poppins_300Light",
//   poppins400,
//   "Poppins_500Medium",
//   poppins800,
// } from '../../../container/fonts';
// import colors from '../../../assets/colors';

// const ChatListItem = ({item}) => {
//   const {width} = useWindowDimensions();
//   return (
//     <View
//       style={{
//         height: h,
//         paddingTop: refHeight(10),
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//       }}>
//       <View
//         style={{
//           width: refWidth(42),
//           height: refHeight(42),
//         }}>
//         <Avatar size={42} url={item.imageUrl} tick={true} />
//       </View>
//       <View
//         style={{
//           width: width - 165,
//           height: refHeight(56),
//           marginLeft: refWidth(6),
//         }}>
//         <Text
//           style={{
//             fontFamily: "Poppins_500Medium",
//             fontSize: refSize(15),
//             color: colors.black,
//             letterSpacing: -0.33,
//           }}>
//           {item.receiverName}
//         </Text>
//         <Text
//           style={{
//             fontFamily: "Poppins_300Light",
//             fontSize: refSize(12),
//             color: colors.chatText,
//           }}>
//           {item.lastMessage !== ''
//             ? item.lastMessage?.length > 60
//               ? item.lastMessage.substring(0, 60) + '...'
//               : item.lastMessage
//             : item.uploader.isRequired
//             ? 'Media'
//             : ''}
//         </Text>
//       </View>
//       <View
//         style={{
//           width: refWidth(65),
//           height: refHeight(42),
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}>
//         <Text
//           style={{
//             fontFamily: poppins400,
//             fontSize: refSize(11),
//             color: colors.chatText,
//             alignSelf: 'flex-end',
//           }}>
//           {calTime(item.timeStamps)}
//         </Text>
//         {item.notSeenCount > 0 && (
//           <View
//             style={{
//               backgroundColor: colors.chatBlue,
//               height: refHeight(20),
//               width: refWidth(20),
//               alignItems: 'center',
//               justifyContent: 'center',
//               alignSelf: 'flex-end',
//               borderRadius: 100,
//               marginRight: refWidth(10),
//             }}>
//             <Text
//               style={{
//                 color: colors.white,
//                 fontFamily: poppins400,
//                 fontSize: refSize(11),
//                 letterSpacing: -0.33,
//                 lineHeight: 16.5,
//               }}>
//               {item.notSeenCount}
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default ChatListItem;
import { View, Text } from "react-native";
import React from "react";
import { calTime, h, w } from "../../../config/utilFunction";
import { global } from "../../../styles/global";
import { useSelector } from "react-redux";
import { checkIcon } from "../../../container/icons";
import colors from "../../../assets/colors";
import Avatar from "../../Avatar";
import AppText from "../../AppText";

const ChatListItem = ({ item }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const userId = user?._id;
  return (
    <View
      style={[
        global.between,
        {
          backgroundColor: colors.white,
          height: h(0.09),
          width: "100%",
          paddingHorizontal: w(0.05),
          paddingVertical: h(0.01),
        },
      ]}
    >
      <View style={[global.start, { alignItems: "flex-start" }]}>
        <Avatar
          avatar={item.imageUrl}
          variant="verifiedUser"
          size={0.12}
          icon={checkIcon}
          isize={0.04}
        />
        <View style={{ marginLeft: w(0.02) }}>
          <AppText
            text={item.receiverName}
            fontFamily={"Poppins_500Medium"}
            width={w(0.65)}
          />
          <AppText
            width={w(0.65)}
            text={`${
              item.lastMessage !== ""
                ? item.lastMessage?.length > 60
                  ? item.lastMessage.substring(0, 60) + "..."
                  : item.lastMessage
                : item.uploader.isRequired
                ? "Media"
                : ""
            }`}
            fontFamily={"Poppins_300Light"}
            fontSize={12}
            color={colors.chatText}
          />
        </View>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <AppText
          text={calTime(item.timeStamps)}
          fontSize={11}
          color={colors.black30}
        />
      </View>
    </View>
  );
};

export default ChatListItem;
