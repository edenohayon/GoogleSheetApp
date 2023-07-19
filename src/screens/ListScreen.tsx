import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchData } from '../api'; // Import the fetchData function

const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const responseData = await fetchData();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error, e.g., show an error message
    }
  };

  const renderItem = ({ item }) => {
    console.log('item', JSON.stringify(item, null, 2))
    return (
      <View style={styles.itemContainer}>
        <Text style={{color:'black'}}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Assuming there's an "id" field in the data
        />
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
