// contexts/EventRegistrationContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'REGISTERED_EVENTS';
const EventRegistrationContext = createContext();

export function EventRegistrationProvider({ children }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Load registrations from storage on startup
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('Loaded from storage:', data); // Log what you get
        if (data) {
          setRegisteredEvents(JSON.parse(data));
        }
      } catch (e) {
        console.log('Error loading registered events:', e);
      }
    };
    loadEvents();
  }, []);

  // Save registrations to storage whenever registeredEvents change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(registeredEvents))
      .then(() => console.log("Saved to storage:", registeredEvents)) // Log save
      .catch(e => console.log('Error saving registered events:', e));
  }, [registeredEvents]);

  const registerEvent = (event) => {
    setRegisteredEvents((events) => {
      if (events.some(e => e.id === event.id)) return events; // Prevent duplicates
      return [...events, event];
    });
  };

  const unregisterEvent = (eventId) => {
    setRegisteredEvents((events) => events.filter(e => e.id !== eventId));
  };

  return (
    <EventRegistrationContext.Provider value={{
      registeredEvents,
      registerEvent,
      unregisterEvent
    }}>
      {children}
    </EventRegistrationContext.Provider>
  );
}

export function useEventRegistration() {
  return useContext(EventRegistrationContext);
}
