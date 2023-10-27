import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      responseData: null,
    };
  }

  handlePostRequest = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          // Your request data goes here
          firstname: 'value1',
          lastname: 'value2',
          email: 'value1',
          password: 'value2',
        },
      );

      // Handle the response here
      this.setState({responseData: response.data});
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  render() {
    return (
      <View>
        <Text>Response Data: {this.state.responseData}</Text>
        <Button title="Make POST Request" onPress={this.handlePostRequest} />
      </View>
    );
  }
}

export default MyComponent;
