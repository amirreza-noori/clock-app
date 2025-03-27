import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes, screens } from "./routes";

const Tabs = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tabs.Navigator initialRouteName={routes.alarm}>
				{screens.map((screen, index) => (
					<Tabs.Screen key={index} {...screen} />
				))}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}
