// components/eventsApi.js
import axios from 'axios';

const API_URL = 'https://6904c0616b8dabde4964fc0f.mockapi.io/api/cc/CampusConnect'; // Replace with your own API if needed

export async function fetchEvents() {
  try {
    const response = await axios.get(API_URL);
    // You can rewrite/massage the data here to fit your cards
    // For demo, return the first 14 with categories/dates mapped
    return response.data.slice(0, 14).map((item, idx) => ({
      id: String(item.id),
      name: item.title,
      category: [
        'Seminar', 'Entertainment', 'Exhibition', 'Sports', 'Workshop', 
        'Festival', 'Health', 'Awareness'
      ][idx % 8],
      date: `2025-11-${10 + idx}`,
    }));
  } catch (error) {
    throw error;
  }
}
