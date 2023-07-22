import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
  SafeAreaView,
} from 'react-native';
import {getUsersRequest} from '../api'; // Import the fetchData function
import {User} from '../types';
import ErrorModal from '../components/ErrorModal';

const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const responseData = await getUsersRequest();
      setUsers(responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowErrorModal(true);
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
    <>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </SafeAreaView>
      <ErrorModal visible={showErrorModal} />
    </>
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
