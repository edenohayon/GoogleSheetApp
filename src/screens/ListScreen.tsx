import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import {getUsers} from '../api'; // Import the fetchData function
import {User} from '../types';

const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const responseData = await getUsers();
      setUsers(responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error, e.g., show an error message
    }
  };

  const renderItem: ListRenderItem<User> = ({item: user}) => (
    <View style={styles.itemContainer}>
      <Text style={{color: 'black'}}>
        {user.name} {user.age}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});

export default ListScreen;
