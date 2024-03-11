import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';
import {myButtonStyles} from '../../styles/myButtonStyles';

const EditCarComponent = ({carId, onEdit}) => {
  const [responseData, setResponseData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State variables to store form data
  const [formFields, setFormFields] = useState({
    name: '',
    registration_expiration: '',
    lastService: '',
    note: '',
  });

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
  }) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  const handleClick = async () => {
    // Fetch user info and display modal
    setIsModalVisible(true);
    setResponseData(data);
  };

  const handleClose = () => {
    // Close the modal
    setIsModalVisible(false);
    setResponseData(null);
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car/${carId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formFields),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      setIsModalVisible(false); // Close the modal

      onEdit();
    } catch (error) {
      console.error('Handle error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <Image style={styles.tinyJpg} source={require('../images/edit.png')} />
      </TouchableOpacity>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalContainer}>
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>Edit Car Information:</Text>
                <InputField
                  autoCapitalize="none" // Disable auto-capitalization
                  label="Car name:"
                  value={formFields.name}
                  onChangeText={text =>
                    setFormFields({...formFields, name: text})
                  }
                  placeholder="Enter car name"
                />
                <InputField
                  label="registration_expiration:"
                  value={formFields.registration_expiration}
                  onChangeText={text =>
                    setFormFields({
                      ...formFields,
                      registration_expiration: text,
                    })
                  }
                  placeholder="YYYY-MM-DD"
                />
                <InputField
                  label="Last service:"
                  value={formFields.lastService}
                  onChangeText={text =>
                    setFormFields({...formFields, lastService: text})
                  }
                  placeholder="YYYY-MM-DD"
                />
                <InputField
                  label="Note:"
                  value={formFields.note}
                  onChangeText={text =>
                    setFormFields({...formFields, note: text})
                  }
                  placeholder="Enter note"
                />
              </View>

              <TouchableOpacity
                style={myButtonStyles.basicSmallButton}
                onPress={handleSave}>
                <Text style={styles.buttonTexts}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={myButtonStyles.basicSmallButton}
                onPress={handleClose}>
                <Text style={styles.buttonTexts}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  tinyJpg: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
  },
  buttonTexts: {
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  responseText: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EditCarComponent;
