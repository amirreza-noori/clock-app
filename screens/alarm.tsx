import { Card, ModalBox, TextInput } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Alert, Button, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type Alarm = { title: string; hour: number; min: number; active: boolean };

export default function AlarmScreen() {
	const [alarms, setAlarms] = useState<Alarm[]>([]);
	const [editState, setEditState] = useState<"new" | "edit" | "close">("close");
	const [editIndex, setEditIndex] = useState(-1);
	const [editTitle, setEditTitle] = useState("");
	const [editHour, setEditHour] = useState("");
	const [editMin, setEditMin] = useState("");

	const setPersistAlarms = (alarms: Alarm[]) => {
		AsyncStorage.setItem("alarms", JSON.stringify(alarms));
		setAlarms(alarms);
	};

	useEffect(() => {
		AsyncStorage.getItem("alarms").then((data) => {
			if (data) setAlarms(JSON.parse(data));
		});
	}, []);

	useEffect(() => {
		const timerId = setInterval(() => {
			const now = new Date();
			if (now.getSeconds() !== 0) return;
			const nowHour = now.getHours();
			const nowMin = now.getMinutes();

			alarms
				.filter(({ hour, min, active }) => active && hour === nowHour && min === nowMin)
				.forEach(({ title }) => {
					Alert.alert("Alarm", title);
				});
		}, 1000);

		return () => clearInterval(timerId);
	}, [alarms]);

	const handleSave = () => {
		const hour = parseInt(editHour);
		const min = parseInt(editMin);

		if (hour > 23 || min > 59 || hour < 0 || min < 0) {
			Alert.alert("Invalid Time", "Please enter a valid time (00:00 - 23:59)");
			return;
		}
		if (editTitle === "") {
			Alert.alert("Invalid Title", "Please enter a title");
			return;
		}
		const newAlarm = { title: editTitle, hour, min, active: true };
		if (editState === "edit") {
			const newAlarms = [...alarms];
			newAlarms[editIndex] = newAlarm;
			setPersistAlarms(newAlarms);
		} else {
			setPersistAlarms([...alarms, newAlarm]);
		}
		setEditState("close");
	};

	const openEditModal = (index: number) => {
		setEditIndex(index);
		setEditTitle(alarms[index].title);
		setEditHour(alarms[index].hour.toString());
		setEditMin(alarms[index].min.toString());
		setEditState("edit");
	};

	const handleNewAlarm = () => {
		setEditIndex(-1);
		setEditTitle("Alarm " + (alarms.length + 1));
		setEditHour("");
		setEditMin("");
		setEditState("new");
	};

	const handleDelete = () => {
		const newAlarms = [...alarms];
		newAlarms.splice(editIndex, 1);
		setAlarms(newAlarms);
		setEditState("close");
	};

	return (
		<>
			<FlatList
				style={styles.container}
				contentContainerStyle={styles.alarmsContainer}
				data={alarms}
				renderItem={({ item: { title, hour, min, active }, index }) => (
					<Card style={styles.alarmCard}>
						<TouchableOpacity style={styles.editCard} onPress={() => openEditModal(index)}>
							<>
								<Text style={styles.alarmTime}>
									{hour.toString().padStart(2, "0")}:{min.toString().padStart(2, "0")}
								</Text>
								<Text>{title}</Text>
								<Ionicons name="settings" size={24} />
							</>
						</TouchableOpacity>
						<Switch
							value={active}
							onValueChange={() => {
								const newAlarms = [...alarms];
								newAlarms[index].active = !active;
								setPersistAlarms(newAlarms);
							}}
						/>
					</Card>
				)}
			/>
			<TouchableOpacity style={styles.addAlarm} onPress={handleNewAlarm}>
				<Ionicons name="add" size={32} />
			</TouchableOpacity>
			<ModalBox
				title={editState === "new" ? "New Alarm" : `Edit ${alarms[editIndex]?.title} Alarm`}
				visible={editState !== "close"}
				onClose={() => setEditState("close")}
				style={styles.modal}
			>
				<TextInput label="Title" value={editTitle} onChangeText={setEditTitle} maxLength={20} />
				<TextInput
					label="Hour"
					keyboardType="number-pad"
					value={editHour}
					onChangeText={setEditHour}
					maxLength={2}
				/>
				<TextInput
					label="Minute"
					keyboardType="number-pad"
					value={editMin}
					onChangeText={setEditMin}
					maxLength={2}
				/>
				<View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
					<Button title="Save" onPress={handleSave} />
					{editState === "edit" && <Button title="Delete" color="red" onPress={handleDelete} />}
				</View>
			</ModalBox>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	alarmsContainer: {
		gap: 20,
		padding: 20,
		paddingBottom: 100,
	},
	alarmCard: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	editCard: {
		flexGrow: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	alarmTime: {
		fontSize: 20,
	},
	addAlarm: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: "50%",
		position: "absolute",
		bottom: 40,
		left: 40,
		fontSize: 40,
	},
	modal: { width: "70%" },
});
