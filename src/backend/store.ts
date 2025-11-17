import { create } from 'zustand';
import type { BookingState, BookingRequest, BookingResponse } from './types';

const API_KEY_ENDPOINT = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/key';
const BOOKING_ENDPOINT = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking';

export const useBookingStore = create<BookingState>((set, get) => ({
  apiKey: null,
  date: new Date().toISOString().split('T')[0],
  time: '18:00',
  people: 2,
  lanes: 1,
  shoes: [42, 42],

  confirmation: null,
  isLoading: false,
  error: null,

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
      set({ error: "API-nyckel saknas. Försök ladda om sidan.", isLoading: false });
      return;
    }

    set({ isLoading: true, error: null, confirmation: null });
    
    // Simulerar den instabila servern (1 av 5 misslyckas)
    const shouldFail = Math.random() < 0.2; 
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (shouldFail) {
          throw new Error("Tyvärr! Servern är instabil just nu, försök igen om en stund.");
      }

      const response = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        let errorMessage = 'Ett okänt serverfel inträffade.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
        }
        throw new Error(`Bokningsfel: ${errorMessage}`);
      }

      const confirmationData: BookingResponse = await response.json();
      
      // Validera att ID och Price finns (krav på response-modellen)
      if (!confirmationData.id || typeof confirmationData.price !== 'number') {
          throw new Error("Ogiltigt svar från servern. Saknar boknings-ID eller pris.");
      }

      set({ confirmation: confirmationData, isLoading: false, error: null });

    } catch (err) {
      console.error("Booking Error:", err);
      set({ error: (err as Error).message || "Ett oväntat fel inträffade vid bokning.", isLoading: false });
      
      // Kasta felet igen för att React Router/Error Boundary kan hantera det
      throw err;
    }
  },
}));