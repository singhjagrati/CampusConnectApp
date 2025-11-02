import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const categoryColors = {
  Technology: "#36D1C4",
  Music: "#AD7BE9",
  Art: "#f89f49",
  Entrepreneurship: "#F7797D",
  Healthcare: "#b4ec51",
  Default: "#868686"
  // Expand as needed
};

export default function EventCard({ event, onPress }) {
  const eventDate = event.date ? new Date(event.date) : (event.Date ? new Date(event.Date) : null);
  const month = eventDate ? eventDate.toLocaleString('default', { month: 'short' }) : '';
  const day = eventDate ? eventDate.getDate() : '';
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper} activeOpacity={0.9}>
      <View style={[
        styles.categoryBar,
        { backgroundColor: categoryColors[event.category || event.Category] || categoryColors.Default }
      ]} />

      <View style={styles.dateCircleShadow}>
        <View style={styles.dateCircle}>
          <Text style={styles.dateMonth}>{month}</Text>
          <Text style={styles.dateDay}>{day}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={styles.eventName}>
          {event.name || event.Name || event.title}
        </Text>
        <Text
          style={[
            styles.categoryText,
            { backgroundColor: categoryColors[event.category || event.Category] + '22' || "#faf0ff" }
          ]}
          numberOfLines={1}
        >
          {event.category || event.Category || "Other"}
        </Text>
        {event.Organizer || event.organizer ? (
          <Text style={styles.organizerText} numberOfLines={1}>
            {event.Organizer || event.organizer}
          </Text>
        ) : null}
        <Text style={styles.metaText} numberOfLines={1}>
          {event.location || event.Location || ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#fff",
    borderRadius: 22,
    marginBottom: 22,
    elevation: 7,
    shadowColor: "#23295a",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 17,
    minHeight: 94,
    paddingVertical: 13,
    paddingHorizontal: 8,
  },
  categoryBar: {
    width: 8,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    marginRight: 13,
    marginLeft: 3,
    backgroundColor: "#868686",
  },
  dateCircleShadow: {
    alignSelf: 'center',
    marginTop: 2,
    marginRight: 9,
    shadowColor: "#ECB65D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
  },
  dateCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff3cf",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff7ef",
    elevation: 2,
  },
  dateMonth: {
    fontSize: 12,
    color: "#b68503",
    fontWeight: "bold",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: -4,
  },
  dateDay: {
    fontSize: 17,
    color: "#3e2818",
    fontWeight: "bold",
    marginTop: -1,
    letterSpacing: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 4,
    marginRight: 6,
    minWidth: 0,
  },
  eventName: {
    fontSize: 20.5,
    fontWeight: "bold",
    color: "#2d224c",
    marginBottom: 2,
    letterSpacing: 0.17,
    flexWrap: "wrap"
  },
  categoryText: {
    color: "#5835de",
    fontWeight: "bold",
    fontSize: 13.5,
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 4,
    marginTop: 3,
    alignSelf: "flex-start",
    letterSpacing: 0.36,
    overflow: "hidden",
    maxWidth: "85%",
  },
  organizerText: {
    fontSize: 11.8,
    color: "#8470fa",
    marginTop: 2,
    fontWeight: "bold",
    marginBottom: 1,
    maxWidth: "98%"
  },
  metaText: {
    color: "#a5a5b5",
    marginTop: 7,
    fontSize: 12.7,
    marginLeft: 1,
    fontStyle: "italic",
    fontWeight: "600",
    maxWidth: "99%"
  }
});
