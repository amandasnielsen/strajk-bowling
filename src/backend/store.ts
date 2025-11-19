import { create } from 'zustand'
import type { BookingState, BookingRequest, BookingResponse } from './types'

const API_KEY = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/key'
const API_BOOKING = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking'

// Zustand-store för boknings-logiken
export const useBookingStore = create<BookingState>((set, get) => ({
  apiKey: null,
  date: new Date().toISOString().split('T')[0],
  time: '18:00',
  people: 1,
  lanes: 1,
  shoes: [38],

  bookings: [],
  isLoading: false,
  error: null,

  setError: (message) => set({ error: message }),
  setApiKey: (key) => set({ apiKey: key }),
	// Uppdaterar ett enskilt fält
  setDraftDetail: (key, value) => set({ [key as keyof BookingState]: value }),
  setShoes: (shoes) => set({ shoes: shoes }),

  // Återställer formulärdata, men behåller befintliga bokningar
  resetBooking: () => set({ 
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    people: 1, 
    lanes: 1, 
    shoes: [38],
    error: null,
  }),

  // Hämtar API-nyckeln och felhantering för olika typer av fel
  fetchApiKey: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_KEY);
      if (!response.ok) throw new Error("Could not get API-key. Check network connection.");
      const data = await response.json();
      set({ apiKey: data.key, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message || "Could not get API-key.", isLoading: false });
    }
  },

  // Skickar bokningsförfrågan till API:et
	// Kastar fel vid misslyckande som komponenten fångar upp
  startBooking: async (request: BookingRequest) => {
    const { apiKey } = get();

    if (!apiKey) {
      set({ error: "API-key missing. Reload page." });
      return;
    }

    set({ isLoading: true, error: null }); 

    try {
      const response = await fetch(API_BOOKING, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(request),
      });

      // Logga rådata från servern, för felsökning
      const raw = await response.clone().text();
      console.log("SERVER STATUS:", response.status);

      // Om inte OK > behandla serverfel
      if (!response.ok) {
        let serverMessage = "Unknown server error occured.";

        try {
          const errJson = JSON.parse(raw);
          if (errJson?.message) serverMessage = errJson.message;
        } catch (_) {
          // Ignorera parsingfel om servern inte returnerade JSON
        }

        throw new Error(serverMessage);
      }

      // Annars: lyckad bokning
      const rawJson = JSON.parse(raw)

      const data = rawJson.bookingDetails

      if (!data || !data.bookingId) {
        throw new Error("Server returned faulty bookingformat.")
      }

      const confirmationData: BookingResponse = {
        when: data.when,
        lanes: data.lanes,
        people: data.people,
        shoes: data.shoes,
        price: data.price,
        id: data.bookingId,
        active: data.active,
      };

      // Uppdaterar tillståndet med den nya bokningen
      set((state) => ({
        bookings: [...state.bookings, confirmationData],
        isLoading: false,
        error: null
      }))

      // Återställ formulärfälten efter lyckad bokning
      get().resetBooking()

    } catch (err) {
      console.error("Booking Error:", err);

			// Sätter felmeddelandet i state för att visa modalen
      set({
        error: (err as Error).message || "Could not book.",
        isLoading: false
      });

      throw err;
    }
  }
}));