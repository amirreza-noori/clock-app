import { FlatList, StyleSheet, View } from "react-native";
import { CardProps } from "./types";

const Card = ({ children, style }: CardProps) => {
	return <View style={StyleSheet.compose(styles.container, style)}>{children}</View>;
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
