import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props{
    visible:boolean
}
const ErrorModal = ({visible}:Props) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.innerView}>
          <Text style={styles.text}>Oops...</Text>
          <Text style={styles.text}>Something went wrong</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    width: 360,
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 30,
  },
});
