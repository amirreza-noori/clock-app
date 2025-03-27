import { StyleSheet, View } from "react-native";
import { CardProps } from "./types";

const Card = ({ style, ...props }: CardProps) => {
	return <View style={StyleSheet.compose(styles.container, style)} {...props} />;
};

export const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: "white",
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		boxShadow: "0 0 5px rgba(0,0,0,0.1)",
	},
});

export default Card;
