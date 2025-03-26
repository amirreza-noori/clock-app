import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "auto",
		aspectRatio: 1,
		padding: 40,
	},
	circle: {
		position: "relative",
		display: "flex",
		width: "auto",
		aspectRatio: 1,
		backgroundColor: "#e0e0e0",
		borderRadius: "50%",
		borderColor: "gray",
		borderWidth: 20,
		borderStyle: "solid",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
	},
	center: {
		position: "absolute",
		width: 10,
		aspectRatio: 1,
		backgroundColor: "red",
		borderRadius: "50%",
		left: "50%",
		top: "50%",
		transform: [{ translateX: -5 }, { translateY: -5 }],
	},
	numbers: {
		position: "absolute",
		left: "50%",
		height: "50%",
		bottom: "50%",
		transformOrigin: "50% 100%",
	},
	textBox: {
		position: "absolute",
		left: "50%",
		top: "65%",
		transform: [{ translateX: "-50%" }],
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#aaa",
	},
});
