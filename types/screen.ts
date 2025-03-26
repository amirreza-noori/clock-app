import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export type ScreenProps = {
	name: string;
	component: React.ComponentType;
	options?: BottomTabNavigationOptions;
};
