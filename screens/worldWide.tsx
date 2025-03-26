import { AnalogClock, Card } from "@/components";
import { timeZoneOffsets } from "@/constants/timeZoneOffsets";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TimeZoneName = keyof typeof timeZoneOffsets;

export default function WorldWideScreen() {
	const [timeZone, setTimeZone] = useState<TimeZoneName>("Iran / Tehran");
	const timeOffset = useMemo(() => {
		const systemOffset = new Date().getTimezoneOffset();
		return (timeZoneOffsets[timeZone] * 60 + systemOffset) * 60000;
	}, [timeZone]);
	const [time, setTime] = useState(() => new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime(new Date(new Date().getTime() + timeOffset));
		}, 100);
		return () => clearInterval(timerId);
	}, [timeOffset, timeZone]);

	return (
		<View style={styles.container}>
			<AnalogClock sec={time.getSeconds()} min={time.getMinutes()} hour={time.getHours()} text={timeZone} />

			<FlatList
				data={Object.entries(timeZoneOffsets) as [TimeZoneName, number][]}
				renderItem={({ item: [country, offset] }) => (
					<TouchableOpacity key={country} onPress={() => setTimeZone(country)}>
						<Card
							style={StyleSheet.compose(styles.item, {
								backgroundColor: country === timeZone ? "lightblue" : undefined,
							})}
						>
							<Text>{country}</Text>
							<Text>
								{offset > 0 && "+"}
								{offset}h
							</Text>
						</Card>
					</TouchableOpacity>
				)}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		display: "flex",
		gap: 10,
		padding: 20,
	},
	item: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
