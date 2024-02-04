import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "react-native-push-notification";

const DoctorsScheduling = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadTasksFromStorage();

    PushNotification.createChannel(
      {
        channelId: "default",
        channelName: "Default Channel",
      },
      () => console.log("Channel created successfully")
    );

    return () => {
      PushNotification.cancelAllLocalNotifications();
    };
  }, []);

  const loadTasksFromStorage = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from storage:", error);
    }
  };

  const saveTasksToStorage = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to storage:", error);
    }
  };

  const scheduleNotification = (task) => {
    const notificationDate = new Date(`${task.date} ${task.time}`);
    const now = new Date();
    const timeDifference = notificationDate.getTime() - now.getTime();

    if (timeDifference > 0) {
      PushNotification.localNotificationSchedule({
        channelId: "default",
        title: task.name,
        message: task.description,
        date: notificationDate,
      });
    }
  };

  const addTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      const newTaskItem = {
        id: new Date().getTime().toString(),
        name: taskName,
        description: taskDescription,
        date: taskDate.toISOString().split("T")[0],
        time: taskTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      if (selectedTaskIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[selectedTaskIndex] = newTaskItem;
        setTasks(updatedTasks);
        setSelectedTaskIndex(null);
      } else {
        setTasks([...tasks, newTaskItem]);
        scheduleNotification(newTaskItem);
      }
      setTaskName("");
      setTaskDescription("");
      setTaskDate(new Date());
      setTaskTime(new Date());
      saveTasksToStorage();
      setShowForm(false);
      setEditMode(false);
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToStorage();
    PushNotification.cancelLocalNotifications({ id: id });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      setTaskDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setTimePickerVisibility(false);
    if (selectedTime) {
      setTaskTime(selectedTime);
    }
  };

  const editTask = (index) => {
    setSelectedTaskIndex(index);
    setTaskName(tasks[index].name);
    setTaskDescription(tasks[index].description);
    
    // Convert date string to Date object
    const taskDateObject = new Date(tasks[index].date + "T00:00:00");
    setTaskDate(taskDateObject);
    
    // Convert time string to Date object
    const taskTimeObject = new Date("2000-01-01T" + tasks[index].time);
    setTaskTime(taskTimeObject);

    setShowForm(true);
    setEditMode(true);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeTask(id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/doctor.png")} />

      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => (
          <TouchableOpacity key={task.id} style={styles.taskContainer}>
            <View style={styles.card}>
              <Text style={styles.taskText}>
                {task.name}: {task.description}
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.threeDot,
                { backgroundColor: pressed ? "#ddd" : "#eee" },
              ]}
              onPress={() => {
                Alert.alert(
                  "Options",
                  "Select an option",
                  [
                    {
                      text: "Edit",
                      onPress: () => editTask(index),
                    },
                    {
                      text: "Delete",
                      onPress: () => confirmDelete(task.id),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text>...</Text>
            </Pressable>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showForm && (
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              placeholder="Task Name"
              value={taskName}
              onChangeText={setTaskName}
              style={styles.input}
            />
            <TextInput
              placeholder="Task Description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={styles.input}
            />
            <Pressable style={styles.datePickerButton} onPress={showDatePicker}>
              <Text style={styles.buttonText}>Pick Date</Text>
            </Pressable>
            <Text style={styles.selectedDateTimeText}>
              Selected Date: {taskDate.toLocaleDateString()}
            </Text>
            <Pressable style={styles.timePickerButton} onPress={showTimePicker}>
              <Text style={styles.buttonText}>Pick Time</Text>
            </Pressable>
            <Text style={styles.selectedDateTimeText}>
              Selected Time:{" "}
              {taskTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {isDatePickerVisible && (
              <DateTimePicker
                value={taskDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
            {isTimePickerVisible && (
              <DateTimePicker
                value={taskTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.cancelButton} onPress={() => setShowForm(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.addButton} onPress={addTask}>
                <Text style={styles.buttonText}>
                  {editMode ? "Update Task" : "Save Task"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <Pressable
        style={styles.plusButton}
        onPress={() => {
          setShowForm(!showForm);
          setSelectedTaskIndex(null);
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "60%",
    height: "30%",
    margin: 50,
    marginVertical: 1,
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    flex: 1,
  },
  threeDotContainer: {
    flexDirection: "row",
  },
  threeDot: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  taskText: {
    fontSize: 16,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "80%",
    height: "70%",
  },
  form: {
    borderWidth: 2,
    borderColor: "silver",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    backgroundColor: "#F8F8F8",
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 10,
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: "#52B5B5",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "48%",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plusButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#008080",
    padding: 15,
    borderRadius: 50,
  },
  datePickerButton: {
    backgroundColor: "#52B5B5",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "48%",
  },
  timePickerButton: {
    backgroundColor: "#52B5B5",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "48%",
  },
  selectedDateTimeText: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default DoctorsScheduling;
