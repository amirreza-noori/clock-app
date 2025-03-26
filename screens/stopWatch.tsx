import { StyleSheet, Text, View } from "react-native";

export default function StopWatchScreen() {
	return (
		<View style={styles.container}>
			<Text>This is Stop Watch Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
