import { Card } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function StopWatchScreen() {
	const timeZoneOffset = useMemo(() => -new Date().getTimezoneOffset() * 60000, []);
	const savedTime = useRef(0);
	const [state, setState] = useState<"stop" | "running" | "paused">("stop");
	const [displayTime, setDisplayTime] = useState(() => new Date(-timeZoneOffset));
	const [flags, setFlags] = useState<Date[]>([]);

	const blinkAnimation = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (state === "paused") {
			Animated.loop(
				Animated.sequence([
					Animated.timing(blinkAnimation, { toValue: 0, duration: 500, useNativeDriver: true }),
					Animated.timing(blinkAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
				])
			).start();
		} else {
			blinkAnimation.setValue(1);
		}
	}, [state]);

	useEffect(() => {
		const startTime = new Date().getTime();
		const timerId =
			state === "running" &&
			setInterval(() => {
				setDisplayTime(new Date(savedTime.current + new Date().getTime() - startTime - timeZoneOffset));
			}, 10);

		return () => {
			if (timerId) clearInterval(timerId);
			if (state === "running") savedTime.current += new Date().getTime() - startTime;
		};
	}, [state]);

	const handleStart = () => setState("running");
	const handlePause = () => setState("paused");
	const handleStop = () => {
		savedTime.current = 0;
		setDisplayTime(new Date(-timeZoneOffset));
		setFlags([]);
		setState("stop");
	};
	const handleAddFlag = () => {
		setFlags([...flags, displayTime]);
	};

	const getFormattedDate = (date: Date) => {
		const f = (num: number, digits?: number) => num.toString().padStart(digits ?? 2, "0");
		return `${f(date.getHours())}:${f(date.getMinutes())}:${f(date.getSeconds())}:${f(date.getMilliseconds(), 3)}`;
	};

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.timer, { opacity: state === "paused" ? blinkAnimation : 1 }]}>
				{getFormattedDate(displayTime)}
			</Animated.Text>
			<FlatList
				style={styles.flagsList}
				contentContainerStyle={styles.flagsContainer}
				data={flags}
				renderItem={({ item: flag }) => (
					<Card style={styles.flagCard}>
						<Ionicons name="flag" size={16} color="red" />
						<Text>{getFormattedDate(flag)}</Text>
					</Card>
				)}
			/>

			<View style={styles.actionsSection}>
				{state !== "running" && <Button onPress={handleStart} title={state === "stop" ? "Start" : "Resume"} />}
				{state === "running" && <Button onPress={handlePause} title="Pause" />}
				{state === "running" && <Button onPress={handleAddFlag} title="Flag" />}
				{state === "paused" && <Button onPress={handleStop} title="Stop" />}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingVertical: 20,
	},
	timer: {
		fontSize: 45,
		paddingVertical: 40,
		textAlign: "center",
	},
	flagsList: {
		flex: 1,
	},
	flagsContainer: {
		gap: 10,
		width: "100%",
		paddingHorizontal: 20,
	},
	flagCard: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	actionsSection: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		paddingVertical: 40,
	},
});
