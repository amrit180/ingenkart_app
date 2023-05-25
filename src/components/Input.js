import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { HelperText, TextInput as TextInputP } from "react-native-paper";
import colors from "../assets/colors";
import { fs, h, w } from "../config/utilFunction";

import BoxShadow from "./BoxShadow";
import Icon from "./Icon";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
const Input = ({
  type = "default",
  value,
  onChangeText,
  ml,
  refValue,
  variant,
  placeholder,
  width,
  height,
  maxLength,
  fontFamily,
  fontSize,
  textAlign,
  pH,
  mt,
  mb,
  icon,
  iconright,
  onPress,
  onFocus,
  multiline,
  message,
  error,
  textAlignVertical,
  disabled,
}) => {
  let [fontsLoaded] = useFonts({ Poppins_600SemiBold });
  if (!fontsLoaded) {
    return null;
  }
  if (type === "default") {
    if (variant === "number") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInput
            onFocus={onFocus}
            placeholder={placeholder}
            placeholderTextColor={colors.black30}
            value={value}
            ref={refValue}
            editable={!disabled}
            maxLength={maxLength || 1}
            keyboardType="number-pad"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            style={{
              color: colors.black,
              paddingHorizontal: pH || 0,
              borderColor: colors.black30,
              borderWidth: 1,
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{ position: "absolute", right: w(0.025), top: h(0.023) }}
            >
              <Icon name={icon} size={w(0.04)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.003)}
          />
        </View>
      );
    } else if (variant === "text") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInput
            onFocus={onFocus}
            placeholder={placeholder}
            placeholderTextColor={colors.black30}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            multiline={multiline}
            keyboardType="default"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            style={{
              paddingHorizontal: pH || 0,
              color: colors.black,
              borderColor: colors.black30,
              textAlignVertical: textAlignVertical || "auto",
              borderWidth: 1,
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <View
              onPress={onPress}
              style={{
                position: "absolute",
                right: iconright || w(0.025),
                top: h(0.023),
              }}
            >
              <Icon name={icon} size={w(0.05)} />
            </View>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.003)}
          />
        </View>
      );
    } else if (variant === "email") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInput
            onFocus={onFocus}
            placeholder={placeholder}
            editable={!disabled}
            placeholderTextColor={colors.black30}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            keyboardType="email-address"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            style={{
              paddingHorizontal: pH || 0,
              position: "relative",
              borderColor: colors.black30,
              color: colors.black,
              borderWidth: 1,
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{
                position: "absolute",
                right: iconright || w(0.025),
                top: h(0.023),
              }}
            >
              <Icon name={icon} size={w(0.05)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.003)}
          />
        </View>
      );
    } else if (variant === "datetime") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInput
            onFocus={onFocus}
            placeholder={placeholder}
            placeholderTextColor={colors.black30}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            keyboardType="email-address"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            style={{
              paddingHorizontal: pH || 0,
              position: "relative",
              paddingLeft: w(0.08),
              borderColor: colors.black30,
              color: colors.black,
              borderWidth: 1,
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{
                position: "absolute",
                left: w(0.025),
                top: h(0.023),
              }}
            >
              <Icon name={icon} size={w(0.05)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.003)}
          />
        </View>
      );
    }
  } else if (type === "outline") {
    if (variant === "number") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInputP
            mode="outlined"
            outlineColor={colors.black30}
            onFocus={onFocus}
            outlineStyle={{
              backgroundColor: colors.white,
              borderRadius: 15,
              borderWidth: 1,
            }}
            textColor={colors.black}
            label={placeholder}
            placeholderTextColor={colors.black30}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            numberOfLines={multiline ? 5 : 1}
            keyboardType="number-pad"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            style={{
              color: colors.black,
              paddingHorizontal: pH || 0,
              borderColor: colors.black30,

              width: w(width) || w(0.12),
              height: h(height) || w(0.14),

              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
            activeOutlineColor={colors.black}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{ position: "absolute", right: w(0.025), top: h(0.023) }}
            >
              <Icon name={icon} size={w(0.04)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.013)}
          />
        </View>
      );
    } else if (variant === "text") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInputP
            mode="outlined"
            outlineColor={colors.black30}
            onFocus={onFocus}
            outlineStyle={{
              backgroundColor: colors.white,
              borderRadius: 15,
              borderWidth: 1,
            }}
            autoComplete={"off"}
            placeholderTextColor={colors.black30}
            textColor={colors.black}
            label={placeholder}
            value={value}
            ref={refValue}
            multiline={multiline}
            // maxLength={maxLength || 1}
            // keyboardType="default"
            onChangeText={(text) => onChangeText(text)}
            // cursorColor={colors.black}
            activeOutlineColor={colors.black}
            style={{
              paddingHorizontal: pH || 0,
              borderColor: colors.black30,
              position: "relative",
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              // backgroundColor: colors.white,

              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <View
              onPress={onPress}
              style={{
                position: "absolute",
                right: iconright || w(0.025),
                top: h(0.023),
                zIndex: 20000,
              }}
            >
              <Icon name={icon} size={w(0.05)} />
            </View>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.013)}
          />
        </View>
      );
    } else if (variant === "email") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInputP
            mode="outlined"
            outlineColor={colors.black30}
            onFocus={onFocus}
            outlineStyle={{
              backgroundColor: colors.white,
              borderRadius: 15,
              borderWidth: 1,
            }}
            textColor={colors.black}
            placeholderTextColor={colors.black30}
            label={placeholder}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            keyboardType="email-address"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            activeOutlineColor={colors.black}
            style={{
              paddingHorizontal: pH || 0,
              borderColor: colors.black30,
              borderColor: colors.black30,
              color: colors.black,
              position: "relative",
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{ position: "absolute", right: w(0.025), top: h(0.023) }}
            >
              <Icon name={icon} size={w(0.05)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.013)}
          />
        </View>
      );
    } else if (variant === "password") {
      return (
        <View
          style={{
            marginLeft: ml || 0,
            marginTop: mt || 0,
            marginBottom: mb || 0,
          }}
        >
          <TextInputP
            mode="outlined"
            secureTextEntry={true}
            outlineColor={colors.black30}
            onFocus={onFocus}
            outlineStyle={{
              backgroundColor: colors.white,
              borderRadius: 15,
              borderWidth: 1,
            }}
            textColor={colors.black}
            placeholderTextColor={colors.black30}
            label={placeholder}
            value={value}
            ref={refValue}
            maxLength={maxLength || 1}
            // keyboardType="visible-password"
            onChangeText={(text) => onChangeText(text)}
            cursorColor={colors.black}
            activeOutlineColor={colors.black}
            passwordRules="min 8 characters"
            autoComplete={"off"}
            style={{
              paddingHorizontal: pH || 0,
              borderColor: colors.black30,
              borderColor: colors.black30,
              color: colors.black,
              position: "relative",
              borderRadius: 15,
              width: w(width) || w(0.12),
              height: h(height) || w(0.14),
              backgroundColor: colors.white,
              fontFamily: fontFamily || "Poppins_600SemiBold",
              fontSize: fs(fontSize) || fs(26),
              textAlign: textAlign || "center",
            }}
          />
          {icon && (
            <Pressable
              onPress={onPress}
              style={{ position: "absolute", right: w(0.025), top: h(0.023) }}
            >
              <Icon name={icon} size={w(0.05)} />
            </Pressable>
          )}
          {error && (
            <HelperText type="error" visible={error}>
              {message}
            </HelperText>
          )}
          <BoxShadow
            width={w(width) || w(0.12)}
            height={h(height) || w(0.14)}
            radius={15}
            top={h(0.013)}
          />
        </View>
      );
    }
  }
};

export default Input;
