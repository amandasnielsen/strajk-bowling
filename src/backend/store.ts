import { create } from 'zustand';
import type { BookingState, BookingRequest, BookingResponse } from './types';

const API_KEY_ENDPOINT = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/key';
const BOOKING_ENDPOINT = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking';

export const useBookingStore = create<BookingState>((set, get) => ({
  apiKey: null,
  date: new Date().toISOString().split('T')[0],
  time: '18:00',
  people: 1,
  lanes: 1,
  shoes: [40],

  confirmation: null,
  isLoading: false,
  error: null,

	setError: (message) => set({ error: message }),
  setApiKey: (key) => set({ apiKey: key }),
  setDraftDetail: (key, value) => set({ [key as keyof BookingState]: value }),
  setShoes: (shoes) => set({ shoes: shoes }),

  resetBooking: () => set({ 
    confirmation: null, 
    error: null, 
    people: 2, 
    lanes: 1, 
    shoes: [42, 42],
  }),

  // Action för att hämta API Key
  fetchApiKey: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_KEY_ENDPOINT);
      if (!response.ok) throw new Error("Kunde inte hämta API-nyckel. Kontrollera nätverket.");
      const data = await response.json();
      set({ apiKey: data.key, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message || "Kunde inte hämta API-nyckel.", isLoading: false });
    }
  },

  // Action för att skicka Bokning till API
  startBooking: async (request: BookingRequest) => {
		const { apiKey } = get();

		if (!apiKey) {
			set({ error: "API-nyckel saknas. Ladda om sidan." });
			return;
		}

		set({ isLoading: true, error: null, confirmation: null });

		try {
			const response = await fetch(BOOKING_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey,
				},
				body: JSON.stringify(request),
			});

			// Logga ALLT från servern för felsökning
			const raw = await response.clone().text();
			console.log("🔎 SERVER STATUS:", response.status);
			console.log("🔎 SERVER RAW RESPONSE:", raw);

			// Om inte OK → behandla serverfel
			if (!response.ok) {
				let serverMessage = "Ett okänt serverfel inträffade.";

				try {
					const errJson = JSON.parse(raw);
					if (errJson?.message) serverMessage = errJson.message;
				} catch (_) {
					// Om API:et inte returnerar JSON, behåll default
				}

				throw new Error(serverMessage);
			}

			// Annars: lyckad bokning
			const rawJson = await response.json();

			const data = rawJson.bookingDetails;

			if (!data || !data.bookingId) {
				throw new Error("Servern returnerade ett felaktigt bokningsformat.");
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

			set({
				confirmation: confirmationData,
				isLoading: false,
				error: null
			});

		} catch (err) {
			console.error("❌ Booking Error:", err);

			set({
				error: (err as Error).message || "Kunde inte genomföra bokningen.",
				isLoading: false
			});

			throw err;
		}
	}
}));