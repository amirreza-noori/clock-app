import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type ModalBoxProps = {
	style?: StyleProp<ViewStyle>;
	contentStyle?: StyleProp<ViewStyle>;
	children: ReactNode;
	visible?: boolean;
	title?: string;
	onClose?: VoidFunction;
};
