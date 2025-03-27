import { TextInputProps as RNTextInputProps } from "react-native";

export type TextInputProps = RNTextInputProps & {
	label?: string;
};
