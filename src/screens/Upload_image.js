import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import DocumentPicker from 'react-native-document-picker';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const { uri, type } = result;

      // Check if the selected document is in JPEG, JPG, or PNG format
      const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowedFormats.includes(type)) {
        setLoading(true);
        setImage(uri);
        setLoading(false);
      } else {
        Alert.alert("Invalid Image Format", "Please upload an image in JPEG, JPG, or PNG format.");
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Handle document picking cancellation
        console.log('User cancelled document picker');
      } else {
        console.error("DocumentPicker Error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/upload_image.jpg")}
      />
      <Text style={styles.instructionText}>
        Upload an image 
        (JPEG, JPG, or PNG format).
      </Text>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      {loading && (
        <ActivityIndicator size="large" color="#008080" style={styles.loadingIndicator} />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={pickDocument}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </Text>
      </TouchableOpacity>
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
  logo: {
    width: "37%",
    height: 150,
    margin: 30,
    marginVertical: 30,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#008080",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#008080",
    borderRadius: 10,
    width: 250,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default UploadImage;
