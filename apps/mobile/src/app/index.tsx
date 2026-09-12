import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { usePlantsList } from '@/features/plants/plantsApi';

export default function Index() {
  const { plants, isLoading, error } = usePlantsList();

  if (isLoading) return <ActivityIndicator style={styles.container} />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Load error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {plants?.map((plant) => (
        <Text key={plant._id}>{plant.latinName}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
