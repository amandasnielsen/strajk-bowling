// API-models

export interface BookingRequest {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

export interface BookingResponse extends BookingRequest {
  price: number;
  id: string;
  active: boolean;
}

// Zustand State Model

export interface BookingState {
  apiKey: string | null;

  // Formulärdata
  date: string;
  time: string;
  people: number;
  lanes: number;
  shoes: number[];

  // Status/Bekräftelse
  bookings: BookingResponse[]; 
  isLoading: boolean;
  error: string | null;

  // Actions
  setApiKey: (key: string | null) => void;
  setDraftDetail: <K extends "date" | "time" | "people" | "lanes">(key: K, value: BookingState[K]) => void;
  setShoes: (shoes: number[]) => void;
  resetBooking: () => void;
  fetchApiKey: () => Promise<void>;
  startBooking: (request: BookingRequest) => Promise<void>;
  
  setError: (message: string | null) => void;
}