// screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'https://6904c0616b8dabde4964fc0f.mockapi.io/api/cc/CampusConnect';

const categoryColors = {
  Technology: '#36D1C4',
  Entrepreneurship: '#F7797D',
  Healthcare: '#b4ec51',
  Music: '#AD7BE9',
  Art: '#f89f49',
  Environment: '#57C978',
  Food: '#ffcd70',
  Finance: '#5c258d',
  Film: '#8371b7',
  Gaming: '#34ace0',
  Fashion: '#ff90b3',
  Hackathon: '#ffd31d',
  Education: '#46bdf4',
  Travel: '#33d9b2',
  Science: '#ae1438',
  Business: '#6c5ce7',
  Culture: '#fad961',
  Marketing: '#2d98da',
  Politics: '#218c5c',
  Literature: '#7ed6df',
  Default: '#868686',
};

const EventCard = ({ event, onPress }) => {
  const eventDate = new Date(event.Date);
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const day = eventDate.getDate();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardWrapper}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.categoryBar,
          {
            backgroundColor: categoryColors[event.Category] || categoryColors.Default,
          },
        ]}
      />
      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View style={styles.dateCircle}>
            <Text style={styles.dateMonth}>{month}</Text>
            <Text style={styles.dateDay}>{day}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.eventName}>{event.Name}</Text>
            <Text style={styles.categoryText}>{event.Category}</Text>
            <Text style={styles.organizerText}>{event.Organizer}</Text>
          </View>
        </View>
        <Text style={styles.metaText}>{event.Location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) setFilteredEvents(events);
    else {
      const lower = search.toLowerCase();
      setFilteredEvents(
        events.filter(
          (e) =>
            e.Name?.toLowerCase().includes(lower) ||
            e.Category?.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, events]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#5c258d" />
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>🏫 Campus Events</Text>
        <Text style={styles.headerSubtitle}>
          Stay connected. Join, learn, and have fun!
        </Text>
      </View>
      <View style={styles.searchBox}>
        <View style={styles.searchInner}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            placeholder="Search events by name or category..."
            placeholderTextColor="#bbb"
            clearButtonMode="always"
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#5c258d" style={{ marginTop: 30 }} />
      ) : !filteredEvents.length ? (
        <Text style={styles.emptyText}>No events match your search.</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() =>
                navigation.navigate("EventDetails", { event: item })
              }
            />
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
    paddingBottom: 32,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    marginBottom: 8,
    elevation: 7,
    shadowColor: "#3e1619",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 13,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 3,
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: "#ffe5fe",
    fontSize: 16,
    marginTop: 2,
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#f5f5fc"
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingLeft: 14,
    shadowColor: "#5447",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ebecee"
  },
  searchIcon: {
    fontSize: 21,
    color: "#868f9b",
    marginRight: 9,
    marginTop: 2
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 24,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 16,
    color: "#24262d"
  },
  emptyText: {
    padding: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 18
  },
  list: {
    paddingHorizontal: 14,
    paddingTop: 5,
    paddingBottom: 30,
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#2d224c",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 13,
    minHeight: 90,
  },
  categoryBar: {
    width: 8,
    height: "90%",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    marginLeft: 3,
    marginRight: 13,
    alignSelf: "center",
  },
  cardContent: {
    flex: 1,
    paddingVertical: 17,
    paddingRight: 12,
    flexDirection: "column",
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  organizerText: {
    fontSize: 12,
    color: "#8470fa",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 2,
  },
  eventName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2d224c",
    marginBottom: 1,
    letterSpacing: 0.35,
  },
  categoryText: {
    backgroundColor: "#faf0ff",
    color: "#5835de",
    fontWeight: "600",
    fontSize: 13,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 3,
    alignSelf: "flex-start",
    letterSpacing: 0.4,
  },
  dateCircle: {
    width: 49,
    height: 49,
    borderRadius: 25,
    backgroundColor: "#ffd97d",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#fff7ef",
    elevation: 2,
    shadowColor: "#fdd835",
    marginTop: 1,
  },
  dateMonth: {
    fontSize: 12,
    color: "#b68503",
    fontWeight: "bold",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: -5,
  },
  dateDay: {
    fontSize: 17,
    color: "#3e2818",
    fontWeight: "bold",
    marginTop: -2,
    letterSpacing: 1,
  },
  metaText: {
    color: "#a5a5b5",
    marginTop: 7,
    fontSize: 13,
    marginLeft: 2,
    fontStyle: "italic",
    fontWeight: "600",
  },
});
