import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useEventRegistration } from '../contexts/EventRegistrationContext';
import EventCard from '../components/EventCard'; // Make sure this path is correct in your project

export default function RegisteredEventsScreen() {
  const { registeredEvents, unregisterEvent } = useEventRegistration();

  const handleUnregister = (eventId, eventName) => {
    unregisterEvent(eventId);
    Alert.alert('Removed', `You have unregistered from "${eventName}"`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#5c258d" />
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>🎟️ Registered Events</Text>
        <Text style={styles.headerSubtitle}>
          See all the events you have registered for.
        </Text>
      </View>
      {registeredEvents.length === 0 ? (
        <View style={styles.centerWrap}>
          <Text style={styles.emptyText}>You haven't registered for any events yet.</Text>
        </View>
      ) : (
        <FlatList
          data={registeredEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.rowCard}>
              <EventCard event={item} onPress={() => {}} />
              <TouchableOpacity
                style={styles.unregButton}
                onPress={() => handleUnregister(item.id, item.Name)}
              >
                <Text style={styles.unregText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5fc",
  },
  headerBox: {
    backgroundColor: "#5c258d",
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    marginBottom: 10,
    elevation: 7,
    shadowColor: "#3e1619",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 13,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#ffe5fe",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  list: {
    paddingHorizontal: 14,
    paddingTop: 5,
    paddingBottom: 30,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5fc',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 17,
    color: '#888',
    padding: 16,
    textAlign: 'center',
    fontWeight: "500"
  },
  rowCard: {
    marginBottom: 7,
  },
  unregButton: {
    backgroundColor: "#d23434",
    alignSelf: "flex-end",
    paddingVertical: 7,
    paddingHorizontal: 26,
    borderRadius: 18,
    marginTop: -16,
    marginRight: 7,
    marginBottom: 13,
    elevation: 2,
    shadowColor: "#d23434aa"
  },
  unregText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5
  }
});
