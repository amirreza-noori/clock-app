import AlarmScreen from "@/screens/alarm";
import StopWatchScreen from "@/screens/stopWatch";
import WorldWideScreen from "@/screens/worldWide";

import { Ionicons } from "@expo/vector-icons";
import { ScreenProps } from "@/types/screen";

export const routes = {
	stopWatch: "Stop Watch",
	alarm: "Alarm",
	worldWide: "World Wide",
};

export const screens: Array<ScreenProps> = [
	{
		name: routes.stopWatch,
		component: StopWatchScreen,
		options: {
			tabBarIcon: ({ color, size }) => <Ionicons name="timer" color={color} size={size} />,
		},
	},
	{
		name: routes.alarm,
		component: AlarmScreen,
		options: {
			tabBarIcon: ({ color, size }) => <Ionicons name="alarm" color={color} size={size} />,
		},
	},
	{
		name: routes.worldWide,
		component: WorldWideScreen,
		options: {
			tabBarIcon: ({ color, size }) => <Ionicons name="globe" color={color} size={size} />,
		},
	},
];
