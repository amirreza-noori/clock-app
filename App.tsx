import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screens } from "./routes";

const Tabs = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tabs.Navigator>
				{screens.map((screen, index) => (
					<Tabs.Screen key={index} {...screen} />
				))}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}
