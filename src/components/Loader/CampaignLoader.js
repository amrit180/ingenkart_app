// import React, { Component } from 'react';
// import { StyleSheet, View, Dimensions, Animated, Platform } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   constructor(props) {
//     super(props)
//     this.circleAnimatedValue = new Animated.Value(0)
//   }
//   circleAnimated = () => {
//     this.circleAnimatedValue.setValue(0)
//     Animated.timing(
//       this.circleAnimatedValue,
//       {
//         toValue: 1,
//         duration: 350
//       }
//     ).start(() => {
//       setTimeout(() => {
//         this.circleAnimated()
//       }, 1000);
//     })
//   }
//   componentDidMount() {
//     this.circleAnimated()
//   }
//   render() {
//     const translateX = this.circleAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [-10, 100]
//     })

//     const translateX2 = this.circleAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [-10, 200]
//     })
//     const translateX3 = this.circleAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [-10, 90]
//     })
//     return (
//       <View style={styles.container}>
//         <View style={[{ marginBottom: 8 }, styles.card]}>
//           <View style={{ width: 100, height: 100, borderRadius: 60, backgroundColor: '#ECEFF1', overflow: 'hidden', marginRight: 16 }}>
//             <Animated.View style={{ width: '30%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX }] }}></Animated.View>
//           </View>
//           <View style={{ flex: 1, justifyContent: 'space-evenly', overflow: 'hidden' }}>
//             <Animated.View style={{ backgroundColor: '#ECEFF1', height: 32 }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX2 }] }}></Animated.View>
//             </Animated.View>
//             <View style={{ backgroundColor: '#ECEFF1', height: 32 }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX2 }] }}></Animated.View>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.card, { flexDirection: 'column', flex: 1 }]}>
//           <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//           </View>
//           <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//           </View>
//           <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//             <View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1',overflow:'hidden' }}>
//               <Animated.View style={{ width: '20%', height: '100%', backgroundColor: 'white', opacity: 0.5, transform: [{ translateX: translateX3 }] }}></Animated.View>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ECEFF1',
//     paddingTop: 24,
//     paddingHorizontal: 16,
//     paddingBottom: 24
//   },
//   card: {
//     padding: 16,
//     shadowColor: 'black',
//     borderRadius: 4,
//     backgroundColor: '#FAFAFA',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 1,
//       height: 1
//     },
//     shadowOpacity: 0.1,
//     flexDirection: 'row'
//   }
// });

import { View, Text, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import Layout from "../Layout";
import LoaderItem from "./LoaderItem";
import { h, w } from "../../config/utilFunction";

const CampaignLoader = () => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 345,

      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };
  useEffect(() => {
    circleAnimated();
  }, []);

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-10, w(0.5), w(1)],
  });
  return (
    <Pressable>
      <LoaderItem
        height={h(0.3)}
        width={"100%"}
        radius={20}
        translateX={translateX}
      />
      {/* <LoaderItem
        height={h(0.3)}
        width={"100%"}
        radius={20}
        mt={h(0.03)}
        translateX={translateX}
      /> */}
    </Pressable>
  );
};

export default CampaignLoader;
