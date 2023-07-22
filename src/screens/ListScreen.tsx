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
import {getUsersRequest, updateUserAgeByIdRequest} from '../api'; // Import the fetchData function
import {User} from '../types';
import ErrorModal from '../components/ErrorModal';
import UpdateUserView from '../components/UpdateUserView';

const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [updateStatus, setUpdateStatus] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const responseData = await getUsersRequest();
      setUsers(responseData);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<User> = ({item: user}) => (
    <View style={styles.itemContainer}>
      <Text style={{color: 'black'}}>
        {user.name} {user.age}
      </Text>
    </View>
  );

  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  //range of 1-100
  const getRandomAge = () => Math.floor(Math.random() * 100) + 1;

  const updateRandomUserAge = async () => {
    try {
      const user = getRandomUser();
      const newAge = getRandomAge();
      setUpdateStatus(`Updating ${user.name} age to ${newAge}`);
      const updatedUsers = await updateUserAgeByIdRequest(user.id, `${newAge}`);
      setUsers(updatedUsers);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setUpdateStatus('');
    }
  };
  
  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {users.length > 0 && (
              <UpdateUserView updateRandomUserAge={updateRandomUserAge} updateStatus={updateStatus}/>
            )}
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContentContainer}
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
  listContentContainer: {
    paddingBottom: 50, 
  },
});

export default ListScreen;
