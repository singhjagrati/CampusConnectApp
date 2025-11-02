import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, useColorScheme } from 'react-native';

const dummySessions = [
  {
    id: "1",
    title: "AI/ML Bootcamp: Getting Started with Python",
    host: "Dr. Sara Mehrotra",
    time: "Nov 20, 2025, 7:00 - 8:30 PM",
    link: "https://youtube.com/",
    category: "Technology"
  },
  {
    id: "2",
    title: "React Native Live Q&A",
    host: "John Doe",
    time: "Nov 22, 2025, 6:00 - 7:00 PM",
    link: "https://meet.google.com/",
    category: "Technology"
  },
  {
    id: "3",
    title: "Career in Cloud Engineering (Panel)",
    host: "Amazon AWS Team",
    time: "Nov 25, 2025, 10:30 AM - 12:00 PM",
    link: "https://zoom.us/",
    category: "Business"
  },
  {
    id: "4",
    title: "Women in Tech: Leadership Stories",
    host: "Priya Singh",
    time: "Nov 28, 2025, 9:30 AM - 10:30 AM",
    link: "https://zoom.us/",
    category: "Culture"
  },
  {
    id: "5",
    title: "Campus Startup Demo Day",
    host: "Venture Incubator Panel",
    time: "Nov 29, 2025, 1:00 - 3:00 PM",
    link: "https://youtube.com/",
    category: "Entrepreneurship"
  },
  {
    id: "6",
    title: "Sustainable Cities - Webinar",
    host: "Enviro Club",
    time: "Dec 1, 2025, 5:00 - 6:15 PM",
    link: "https://meet.google.com/",
    category: "Environment"
  },
  {
    id: "7",
    title: "FoodTech Innovations - Live Cookalong",
    host: "Chef Rohan Gupta",
    time: "Dec 2, 2025, 11:00 AM - 12:30 PM",
    link: "https://zoom.us/",
    category: "Food"
  },
  {
    id: "8",
    title: "Photography Masterclass",
    host: "Ananya Patel",
    time: "Dec 3, 2025, 4:30 - 6:00 PM",
    link: "https://youtube.com/",
    category: "Art"
  },
  {
    id: "9",
    title: "Finance for Students: Webinar",
    host: "Karan Malhotra",
    time: "Dec 5, 2025, 2:00 - 3:00 PM",
    link: "https://meet.google.com/",
    category: "Business"
  },
  {
    id: "10",
    title: "Marketing Trends 2025",
    host: "Shreya Bansal",
    time: "Dec 7, 2025, 6:30 - 8:00 PM",
    link: "https://zoom.us/",
    category: "Business"
  }
];

const categoryColors = {
  Technology: '#36D1C4',
  Business: '#6c5ce7',
  Culture: '#fad961',
  Entrepreneurship: '#F7797D',
  Environment: '#57C978',
  Food: '#ffcd70',
  Art: '#f89f49',
  Default: '#868686'
};

const categoryEmoji = {
  Technology: "💻",
  Art: "🎨",
  Food: "🍔",
  Business: "💼",
  Environment: "🌱",
  Culture: "🎭",
  Entrepreneurship: "🚀",
  Default: "🎤"
};

function getDateParts(timeString) {
  const [monthDay] = timeString.split(',', 2);
  const [month, day] = monthDay.split(' ');
  return { month: month ? month.trim().toUpperCase() : '', day: day ? day.trim() : '' };
}

export default function LiveSessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const scheme = useColorScheme();
  const bgColor = scheme === 'dark' ? '#181825' : '#f5f5fa';
  const cardBg = scheme === 'dark' ? '#23223a' : '#fff';
  const textColor = scheme === 'dark' ? "#f6f6f6" : "#24244c";
  const fadedText = scheme === 'dark' ? "#b0b2c5" : "#7b7cab";

  useEffect(() => {
    setTimeout(() => {
      setSessions(dummySessions);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#5c258d" style={{ marginTop: 50 }} />;
  if (!sessions.length) return (
    <View style={[styles.center, {backgroundColor: bgColor}]}>
      <Text style={styles.empty}>No live sessions right now. Please check again soon!</Text>
    </View>
  );

  return (
    <FlatList
      data={sessions}
      keyExtractor={item => item.id}
      style={{ backgroundColor: bgColor }}
      renderItem={({ item }) => {
        const dateParts = getDateParts(item.time);
        return (
          <View style={[styles.cardOuter, { backgroundColor: cardBg }]}>
            <View
              style={[
                styles.categoryBar,
                { backgroundColor: categoryColors[item.category] || categoryColors.Default }
              ]}
            />
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <View style={styles.dateCircle}>
                  <Text style={styles.dateMonth}>{dateParts.month}</Text>
                  <Text style={styles.dateDay}>{dateParts.day}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 11 }}>
                  <Text style={[styles.sessionTitle, {color: textColor}]} numberOfLines={2}>{item.title}</Text>
                  <View style={{flexDirection:'row',alignItems:'center',marginTop:0}}>
                    <Text style={{fontSize: 15, marginRight: 2}}>
                      {categoryEmoji[item.category] || categoryEmoji.Default}
                    </Text>
                    <Text style={[
                      styles.categoryText,
                      { color: categoryColors[item.category] || categoryColors.Default }
                    ]}>{item.category}</Text>
                  </View>
                  <Text style={styles.hostLabel}>Host: <Text style={styles.host}>{item.host}</Text></Text>
                </View>
              </View>
              <Text style={[styles.timeText, {color: fadedText}]}>{item.time}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.btnPurple} onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.btnPurpleText}>Join Live</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnYellow}
                  onPress={() => {
                    const details = `${item.title} - Hosted by ${item.host}`;
                    Linking.openURL(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.title)}&details=${encodeURIComponent(details)}&dates=20251120T190000Z/20251120T203000Z`);
                  }}
                >
                  <Text style={styles.btnYellowText}>Add to Calendar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center"},
  empty: { fontSize: 17, color: "#888", marginTop: 80, textAlign: "center" },
  list: { paddingHorizontal: 6, paddingTop: 16, paddingBottom: 25 },
  cardOuter: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 20,
    marginBottom: 19,
    elevation: 7,
    shadowColor: "#6a33a566",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 15,
    minHeight: 110,
    paddingVertical: 18,
    paddingRight: 8,
    paddingLeft: 0
  },
  categoryBar: {
    width: 7,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: "stretch"
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 1,
    marginRight: 5,
    minWidth: 0,
  },
  row: { flexDirection: "row", alignItems: "center" },
  dateCircle: {
    width: 46, height: 46,
    borderRadius: 23,
    backgroundColor: "#ffe190",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff7ef",
    marginRight: 7
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
    fontSize: 18,
    color: "#3e2818",
    fontWeight: "bold",
    marginTop: -2,
    letterSpacing: 1,
  },
  sessionTitle: {
    fontSize: 17.5,
    fontWeight: "bold",
    marginBottom: 3,
    letterSpacing: 0.38,
    flexWrap: "wrap"
  },
  categoryText: {
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 12.5,
    backgroundColor: "#f5f4fa",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "flex-start",
    maxWidth: "80%"
  },
  hostLabel: {
    fontSize: 12.2,
    marginTop: 4,
    color: "#6a33a5"
  },
  host: {
    color: "#6c5ce7",
    fontWeight: "bold"
  },
  timeText: {
    marginTop: 8,
    fontSize: 13.5,
    marginLeft: 2,
    fontWeight: "500"
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 17,
    marginRight: 4,
    marginBottom: 3
  },
  btnPurple: {
    backgroundColor: "#5c258d",
    borderRadius: 19,
    paddingHorizontal: 28,
    paddingVertical: 11,
    elevation: 1,
    minWidth: 0,
    alignItems: 'center',
  },
  btnPurpleText: {
    color: "#fff", fontWeight: "bold", fontSize: 16, letterSpacing: 0.5
  },
  btnYellow: {
    backgroundColor: "#ffe190",
    borderRadius: 19,
    paddingHorizontal: 28,
    paddingVertical: 11,
    minWidth: 0,
    alignItems: 'center',
  },
  btnYellowText: {
    color: "#3e2818", fontWeight: "bold", fontSize: 16, letterSpacing: 0.5
  }
});
