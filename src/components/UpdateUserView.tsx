import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const updateStatusColor = 'green';

interface Props {
  updateRandomUserAge: () => void;
  updateStatus: string;
}
const UpdateUserView = ({updateRandomUserAge, updateStatus}: Props) => {
  return (
    <View>
      <Button
        title="Click to update Random user age"
        onPress={updateRandomUserAge}
      />
      {updateStatus.length > 0 && (
        <View style={styles.updateStatusContainer}>
          <ActivityIndicator size={'small'} color={updateStatusColor} />
          <Text style={styles.updateStatusText}>{updateStatus}</Text>
        </View>
      )}
    </View>
  );
};

export default UpdateUserView;

const styles = StyleSheet.create({
  updateStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateStatusText: {
    color: updateStatusColor,
    paddingStart:5
  },
});
