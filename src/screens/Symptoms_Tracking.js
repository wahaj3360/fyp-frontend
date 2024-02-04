import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SymptomsTracking = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const [symptomsData, setSymptomsData] = useState([
    {
      id: 1,
      title: 'Persistent Cough',
      description: 'A cough that doesn’t go away or gets worse.',
      image: 'https://i.pinimg.com/564x/9f/de/4e/9fde4e8b8e0e42a114311d580706dc00.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 2,
      title: 'Shortness of Breath',
      description: 'Difficulty in breathing or catching breath easily.',
      image: 'https://i.pinimg.com/564x/96/c5/95/96c595303ef81b1f92beeb95a0e8f81e.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 3,
      title: 'Chest Pain',
      description: 'Pain or discomfort in the chest area.',
      image: 'https://img.freepik.com/premium-vector/man-holding-his-chest-because-heartbroken-hand-drawn-illustration_288796-3740.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699401600&semt=ais',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 4,
      title: 'Hoarseness',
      description: 'Change in voice, hoarseness, or wheezing.',
      image: 'https://i.pinimg.com/564x/47/2d/c8/472dc8e4c9279ff642c5be8557ec4592.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 5,
      title: 'Unexplained Weight Loss',
      description: 'Significant weight loss without changes in diet or exercise.',
      image: 'https://i.pinimg.com/564x/5c/c1/12/5cc112ab361f97b7afad98e5892dbe9b.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 6,
      title: 'Coughing up Blood',
      description: 'Blood in coughed-up mucus or sputum.',
      image: 'https://t3.ftcdn.net/jpg/05/35/82/42/360_F_535824295_ak4q2OzMGGOArxPouV5yoiEtZkHTDdL3.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
    {
      id: 7,
      title: 'Fatigue',
      description: 'Persistent tiredness or weakness',
      image: 'https://i.pinimg.com/564x/e0/e3/5e/e0e35e225946b8d48a51a85bf7cf315f.jpg',
      url: 'https://yourwebsite.com/lung-cancer-news',
      selected: false,
    },
  ]);

  const handleSymptomClick = (id) => {
    setSymptomsData((prevSymptoms) =>
      prevSymptoms.map((symptom) =>
        symptom.id === id
          ? { ...symptom, selected: !symptom.selected }
          : symptom
      )
    );

    setCounter((prevCounter) =>
      symptomsData.find((symptom) => symptom.id === id && symptom.selected)
        ? prevCounter - 1
        : prevCounter < 7
        ? prevCounter + 1
        : 0
    );
  };

  const handleResultButtonPress = () => {
    const selectedSymptoms = symptomsData.filter((symptom) => symptom.selected);

    let resultMessage = '';
    const selectedIds = selectedSymptoms.map((symptom) => symptom.id);

    if (selectedIds.length === 7) {
      resultMessage = 'Congratulations! You have won!';
    } else if (selectedIds.includes(1) && selectedIds.includes(2)) {
      resultMessage = 'You have Minimal Symptoms.';
    } else if (selectedIds.includes(6) && selectedIds.includes(7) && selectedIds.includes(2)) {
      resultMessage = 'You have Mild Symptoms.';
    } else if (selectedIds.includes(1) && selectedIds.includes(2) && selectedIds.includes(7) ) {
      resultMessage = 'You have Moderate Symptoms.';
    }else if (selectedIds.includes(1) && selectedIds.includes(2) && selectedIds.includes(7) && selectedIds.includes(6) ) {
      resultMessage = 'You have Moderate Symptoms.';
    } else if (selectedIds.includes(1) && selectedIds.includes(2) && selectedIds.includes(6) && selectedIds.includes(7) && selectedIds.includes(5)) {
      resultMessage = 'You have Critical condition.';
    } else if (selectedIds.includes(1) && selectedIds.length === 1) {
      resultMessage = 'You have minimal symptoms';
    } else if (selectedIds.includes(2) && selectedIds.length === 1) {
      resultMessage = 'You have minimal symptoms.';
    } else if (selectedIds.includes(3) && selectedIds.length === 1) {
      resultMessage = 'You have minimal symptoms.';
    } else if (selectedIds.includes(4) && selectedIds.length === 1) {
      resultMessage = 'You have Mild Symptoms.';
    } else if (selectedIds.includes(5) && selectedIds.length === 1) {
      resultMessage = 'You have Mild Symptoms.';
    } else if (selectedIds.includes(6) && selectedIds.length === 1) {
      resultMessage = 'You have Mild Symptoms';
    } else {
      resultMessage = 'Keep selecting symptoms to discover your fate.';
    }

    Alert.alert(resultMessage);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.counterText}>{counter}/7</Text>
        {symptomsData.map((symptom) => (
          <TouchableOpacity
            key={symptom.id}
            onPress={() => handleSymptomClick(symptom.id)}
          >
            <View
              style={[
                styles.card,
                { backgroundColor: symptom.selected ? '#ADD8E6' : 'white' },
              ]}
            >
              <Image source={{ uri: symptom.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{symptom.title}</Text>
              <Text style={styles.cardDescription}>{symptom.description}</Text>
              {symptom.selected && (
                <Text style={styles.checkMark}>✔</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Result Button */}
      <TouchableOpacity
        style={styles.resultButton}
        onPress={handleResultButtonPress}
      >
        <Text style={styles.resultButtonText}>Show Results</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: wp('80%'),
    padding: wp('5%'),
    margin: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  cardImage: {
    width: wp('40%'),
    height: hp('25%'),
    marginBottom: wp('2%'),
  },
  cardTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
  counterText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  checkMark: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'green',
  },
  resultButton: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('2%'),
    backgroundColor: '#008080',
    padding: wp('3%'),
    borderRadius: wp('1%'),
  },
  resultButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default SymptomsTracking;
