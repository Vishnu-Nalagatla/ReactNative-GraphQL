import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            
            username
            name
            age
            nationality
        }
    }
`

const DisplayData = () => {
    const { data: userData, loading: userLoading } = useQuery(QUERY_ALL_USERS);
    if (userLoading) {
        return <Text>Data is Loading......</Text>
    }
    if (userData) {
        console.log(userData, "userData");
    } else {
        console.log('error');
    }
    return (
        <>
            <ScrollView>
                <View>
                    <Text>List of Users</Text>
                </View>

                {userData && userData.users.map((user) => {
                    return (
                        <View style={styles.viewContainer} key={user.id}>
                            <Text style={styles.textContainer}>{user.name}</Text>
                            <Text style={styles.textContainer}>{user.age}</Text>
                            <Text style={styles.textContainer}>{user.nationality}</Text>
                            <Text style={styles.textContainer}>{user.username}</Text>
                        </View>
                    )
                }
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        margin: 20,
    },
    textContainer: {
        margin: 5,
    }
});

export default DisplayData










import React from 'react';
import { View, Text } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import DisplayData from './src/components/DisplayData';

const App = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'http://172.18.97.81:4000/graphql',  
    cache: new InMemoryCache()
  });
  return (
    <>
      <ApolloProvider client={client}>
        <DisplayData></DisplayData>
      </ApolloProvider>
    </>
  )
}

export default App
