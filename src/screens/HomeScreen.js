import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  {
    id: '1',
    title: 'Lung Cancer News',
    description: 'Stay updated with the latest lung cancer research and news.',
    image: 'https://i.pinimg.com/564x/38/0c/cf/380ccf7bac9140234486bf82e8bfe694.jpg',
    url: 'https://www.sciencedaily.com/news/health_medicine/lung_cancer/'
  },
  {
    id: '2',
    title: 'Understanding Lung Cancer',
    description: 'Learn about causes, symptoms, and treatments of lung cancer.',
    image: 'https://img.jagranjosh.com/imported/images/E/GK/What-is-Lung-Cancer.png',
    url: 'https://shaukatkhanum.org.pk/about-us/blog/lung-cancer-awareness/'
  },
  {
    id: '3',
    title: 'Preventive Measures',
    description: 'Discover methods to reduce the risk of lung cancer.',
    image: 'https://scrmc.com/wp-content/uploads/2022/11/Low-Dose-CT-Lung-Screening-11.22.jpg',
    url: 'https://www.cdc.gov/cancer/lung/basic_info/prevention.htm'
  },
  {
    id: '4',
    title: 'Support and Communities',
    description: 'Find communities and support systems for lung cancer patients.',
    image: 'https://i.pinimg.com/564x/58/95/31/5895315947d3bd4c05680e881fc00f84.jpg',
    url: 'https://www.lung.org/lung-health-diseases/lung-disease-lookup/lung-cancer/living-with-lung-cancer/find-support'
  },
];

const HomeScreen = ({ navigation }) => {
  const handleCardClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: wp('30%'), // Use responsive width
              height: hp('10%'), // Use responsive height
              resizeMode: "contain",
              margin: wp('1%'), // Use responsive margin
            }}
          />
          <Text style={styles.headerText}>AI AIDED LUNGS CANCER APP</Text>
        </View>

        {data.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleCardClick(item.url)}>
            <Card style={styles.cardContainer}>
              <Card.Content>
                <Title style={styles.cardTitle}>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: item.image }} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.copyrightText}>© AALCAA</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: wp('1%'), // Use responsive padding
  },
  headerText: {
    fontSize: wp('3.5%'), // Use responsive fontSize
    fontWeight: '800',
    padding: wp('2%'), // Use responsive padding
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: "#008080",
  },
  cardContainer: {
    padding: wp('2%'), // Use responsive padding
    margin: wp('2%'), // Use responsive margin
    borderRadius: wp('4%'), // Use responsive borderRadius
    elevation: 5,
  },
  cardTitle: {
    fontSize: wp('5%'), // Use responsive fontSize
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#008080',
    padding: wp('3%'), // Use responsive padding
  },
  copyrightText: {
    fontSize: wp('2.5%'), // Use responsive fontSize
    fontStyle: 'italic',
    color: 'white',
  },
});

export default HomeScreen;
