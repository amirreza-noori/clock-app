import { View } from "react-native";
import AnalogClockPlate from "./components/analogClockPlate";
import { styles } from "./styles/analogClock";
import { AnalogClockProps } from "./types";
import { getRotatedStyle } from "./utils/getRotatedStyle";

const AnalogClock = ({ sec, min, hour, text }: AnalogClockProps) => {
	return (
		<AnalogClockPlate text={text}>
			{typeof hour === "number" && (
				<View style={getRotatedStyle(styles.hourNeedle, (hour + (min ?? 0) / 60) * 30)}></View>
			)}
			{typeof min === "number" && (
				<View style={getRotatedStyle(styles.minNeedle, (min + (sec ?? 0) / 60) * 6)}></View>
			)}
			{typeof sec === "number" && <View style={getRotatedStyle(styles.secNeedle, sec * 6)}></View>}
		</AnalogClockPlate>
	);
};

export default AnalogClock;
