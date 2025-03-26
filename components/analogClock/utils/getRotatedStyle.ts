import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export const getRotatedStyle = (style: StyleProp<ViewStyle>, deg: number) =>
	StyleSheet.compose(style, { transform: [{ translateX: "-50%" }, { rotate: deg + "deg" }] });
