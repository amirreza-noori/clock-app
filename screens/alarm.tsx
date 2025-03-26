import { StyleSheet, Text, View } from "react-native";

export default function AlarmScreen() {
	return (
		<View style={styles.container}>
			<Text>This is Alarm Page</Text>
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
