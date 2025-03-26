import { memo, ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/analogClockPlate";
import { getRotatedStyle } from "../utils/getRotatedStyle";

type Props = {
	children: ReactNode;
	text?: string;
};

const AnalogClockPlate = memo(({ children, text }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.circle}>
				{text && (
					<View style={styles.textBox}>
						<Text style={styles.text}>{text}</Text>
					</View>
				)}
				{children}
				<View style={styles.center}></View>
				{Array(12)
					.fill(0)
					.map((_, i) => (
						<View key={i} style={getRotatedStyle(styles.numbers, (i + 1) * 30)}>
							<Text>{i + 1}</Text>
						</View>
					))}
			</View>
		</View>
	);
});

AnalogClockPlate.displayName = "AnalogClockPlate";
export default AnalogClockPlate;
