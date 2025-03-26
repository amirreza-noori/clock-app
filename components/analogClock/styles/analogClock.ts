import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	secNeedle: {
		position: "absolute",
		left: "50%",
		bottom: "40%",
		width: 2,
		height: "50%",
		backgroundColor: "red",
		transformOrigin: "50% 80%",
	},
	minNeedle: {
		position: "absolute",
		left: "50%",
		bottom: "50%",
		width: 2,
		height: "40%",
		backgroundColor: "black",
		transformOrigin: "bottom",
	},
	hourNeedle: {
		position: "absolute",
		left: "50%",
		bottom: "50%",
		width: 4,
		height: "30%",
		backgroundColor: "black",
		transformOrigin: "bottom",
	},
});
