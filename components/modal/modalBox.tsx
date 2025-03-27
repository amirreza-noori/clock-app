import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../card";
import { ModalBoxProps } from "./types";

const ModalBox = ({ title, children, visible, onClose, contentStyle, style }: ModalBoxProps) => {
	return (
		<Modal visible={visible} transparent>
			<View style={styles.backdrop} onTouchEnd={onClose} />
			<View style={styles.container}>
				<Card style={StyleSheet.compose(styles.box, style)}>
					{title ? (
						<View style={styles.header}>
							<Text style={styles.title}>{title}</Text>
							<TouchableOpacity onPress={onClose}>
								<Ionicons name="close" size={24} />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity onPress={onClose} style={styles.outerClose}>
							<Ionicons name="close-circle" size={32} />
						</TouchableOpacity>
					)}
					<View style={StyleSheet.compose(styles.content, contentStyle)}>{children}</View>
				</Card>
			</View>
		</Modal>
	);
};

export const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		width: "100%",
		height: "100%",

		backgroundColor: "rgba(0,0,0,0.3)",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		position: "relative",
		paddingHorizontal: 20,
		paddingVertical: 0,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 30,
		marginHorizontal: -20,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
	},
	title: {
		fontSize: 20,
	},
	outerClose: {
		position: "absolute",
		top: "120%",
		right: 0,
		left: 0,
		alignItems: "center",
	},
	content: {
		paddingVertical: 10,
	},
});

export default ModalBox;
