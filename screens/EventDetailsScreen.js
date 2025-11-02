import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share, Linking, TextInput, FlatList, useWindowDimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEventRegistration } from '../contexts/EventRegistrationContext';

export default function EventDetailsScreen({ route }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 32, 430);

  const { event } = route.params;
  const { registeredEvents, registerEvent, unregisterEvent } = useEventRegistration();
  const alreadyRegistered = registeredEvents.some(e => e.id === event.id);

  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fixed image picker for SDK 47+/Expo Go
  const pickPhoto = async () => {
    // Ask permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo library access to upload images.');
      return;
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      // Log for debugging
      // console.log(result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (photos.length < 3) {
          setPhotos([...photos, result.assets[0].uri]);
        } else {
          Alert.alert("Limit reached", "Max 3 photos per event.");
        }
      } // else user canceled, simply do nothing
    } catch (e) {
      Alert.alert("Image Picker Error", e.message);
    }
  };

  const handleRegister = () => {
    if (!alreadyRegistered) {
      registerEvent(event);
      Alert.alert('Registered!', `You have successfully registered for "${event.Name}"`);
    }
  };

  const handleUnregister = () => {
    unregisterEvent(event.id);
    Alert.alert('Unregistered!', `You have removed "${event.Name}" from your events.`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: event.Name,
        message: `${event.Name}\n${event.Date}, ${event.Location}\n${event.Description}`
      });
    } catch (e) {
      Alert.alert('Share failed', e.message);
    }
  };

  const handleCalendar = () => {
    const gcalUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.Name)}&dates=${event.Date.replace(/-/g, '')}T090000Z/${event.Date.replace(/-/g, '')}T120000Z&details=${encodeURIComponent(event.Description)}&location=${encodeURIComponent(event.Location)}`;
    Linking.openURL(gcalUrl);
  };

  const sendEmail = () => {
    if (event.Organizer && event.Organizer.includes('@')) {
      Linking.openURL(`mailto:${event.Organizer}`);
    } else {
      Alert.alert('Organizer info', `Contact: ${event.Organizer}`);
    }
  };

  const openMap = () => {
    if (event.Location) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.Location)}`;
      Linking.openURL(mapUrl);
    } else {
      Alert.alert('No location specified for this event.');
    }
  };

  const submitReview = () => {
    if (review.trim()) {
      setReviews([{ text: review, rating }, ...reviews]);
      setReview('');
      setRating(0);
      Alert.alert("Submitted", "Your review was posted!");
    }
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }}>
      <View style={[styles.card, { width: cardWidth }]}>
        <View style={styles.headerRow}>
          <Text style={styles.eventIcon}>📅</Text>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{event.Name}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldIcon}>🏷️</Text>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{event.Category}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldIcon}>🗓️</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{event.Date}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldIcon}>📍</Text>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.info} numberOfLines={2} ellipsizeMode="tail">{event.Location}</Text>
          <TouchableOpacity style={styles.featureBtnSmall} onPress={openMap}>
            <Text style={{ color: "#2945bb", fontWeight: "bold" }}>Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldIcon}>👤</Text>
          <Text style={styles.label}>Organizer:</Text>
          <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{event.Organizer}</Text>
          <TouchableOpacity style={styles.featureBtnSmall} onPress={sendEmail}>
            <Text style={{ color: "#2945bb", fontWeight: "bold" }}>Contact</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descBlock}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.info} numberOfLines={5} ellipsizeMode="tail">{event.Description}</Text>
        </View>
        {photos.length > 0 && (
          <FlatList
            data={photos}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.photo} />
            )}
            keyExtractor={(_, i) => String(i)}
            style={{ marginBottom: 5, marginTop: 10, maxWidth: cardWidth - 16 }}
            contentContainerStyle={{ maxWidth: cardWidth - 16 }}
            showsHorizontalScrollIndicator={false}
          />
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={alreadyRegistered}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {alreadyRegistered ? "Registered" : "Register"}
            </Text>
          </TouchableOpacity>
          {alreadyRegistered && (
            <TouchableOpacity style={[styles.button, styles.remove]} onPress={handleUnregister}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Unregister</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.uxRow}>
          <TouchableOpacity style={styles.featureBtn} onPress={handleShare}>
            <Text style={styles.featureText}>Share 🔗</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureBtn} onPress={handleCalendar}>
            <Text style={styles.featureText}>Calendar 📅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureBtn} onPress={pickPhoto}>
            <Text style={styles.featureText}>Upload 📷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviewSection}>
          <Text style={styles.label}>Your review & rating:</Text>
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map(val => (
              <TouchableOpacity key={val} onPress={() => setRating(val)}>
                <Text style={{
                  fontSize: 27,
                  color: val <= rating ? "#ffd400" : "#d6d6d6"
                }}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.reviewInput}
            value={review}
            onChangeText={setReview}
            placeholder="Write your review here..."
            multiline
          />
          <TouchableOpacity style={styles.buttonSubmit} onPress={submitReview}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
          {reviews.length > 0 && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>Reviews:</Text>
              {reviews.map((r, idx) => (
                <View key={idx} style={styles.reviewBox}>
                  <Text style={styles.reviewText}>{'★'.repeat(r.rating)} {r.text}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#e9e5fd'
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 18,
    borderRadius: 24,
    shadowColor: "#bbb",
    shadowOpacity: 0.21,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 22,
    elevation: 13,
    padding: 18,
    minWidth: 270,
    alignItems: "flex-start"
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 10,
    width: "100%"
  },
  eventIcon: {
    fontSize: 31,
    marginRight: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46237a',
    maxWidth: "80%",
    flexWrap: 'wrap'
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 7,
    gap: 9
  },
  fieldIcon: {
    fontSize: 18,
    marginRight: 3,
    marginTop: 2
  },
  label: {
    fontWeight: 'bold',
    color: '#7a5498',
    fontSize: 14,
    marginRight: 2,
    marginBottom: 2
  },
  info: {
    color: '#252066',
    fontSize: 15,
    fontWeight: "500",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "60%"
  },
  descBlock: {
    marginVertical: 5,
    width: "100%"
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 18,
    marginBottom: 6,
    alignItems: 'center',
    width: "100%",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#5c258d",
    paddingVertical: 9,
    paddingHorizontal: 28,
    borderRadius: 22,
    minWidth: 110
  },
  remove: {
    backgroundColor: "#d23434"
  },
  uxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 17,
    marginTop: 9,
    marginBottom: 3,
    width: "100%",
    justifyContent: "flex-start"
  },
  featureBtn: {
    backgroundColor: "#eef6ff",
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 6,
    borderRadius: 16
  },
  featureText: {
    fontWeight: "700",
    fontSize: 13,
    color: "#2945bb"
  },
  featureBtnSmall: {
    backgroundColor: "#eef6ff",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 8,
    marginTop: 1
  },
  photo: {
    marginTop: 6, marginBottom: 2, borderRadius: 12, width: 104, height: 62, marginRight: 7
  },
  reviewSection: {
    marginTop: 7,
    width: "100%"
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 8
  },
  reviewInput: {
    backgroundColor: "#f5f5fe",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 9,
    fontSize: 14,
    marginBottom: 7,
    width: "97%"
  },
  buttonSubmit: {
    backgroundColor: "#2945bb",
    borderRadius: 19,
    paddingVertical: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 21,
    marginVertical: 3
  },
  reviewBox: {
    backgroundColor: "#f6f8fc",
    borderRadius: 7,
    padding: 6,
    marginTop: 5,
    maxWidth: "98%"
  },
  reviewText: {
    flexWrap: "wrap",
    maxWidth: "100%",
    fontSize: 16
  }
});
