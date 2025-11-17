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

	// Form-data
	date: string;
	time: string;
	people: number;
	lanes: number;
	shoes: number[]

	// Bekräftelse
	confirmation: BookingResponse | null;
	isLoading: boolean;
	error: string | null;

	// Actions
	setApiKey: (key: string | null) => void;

	// Actions för att sätta form-field
	setDraftDetail: <K extends keyof Omit<BookingState, 'apiKey' | 'confirmation' | 'isLoading' | 'error' | 'shoes' | 'fetchApiKey' | 'startBooking' | 'setApiKey' | 'resetBooking' | 'setDraftDetail'>>(key: K, value: BookingState[K]) => void;
  setShoes: (shoes: number[]) => void;
  resetBooking: () => void;
  fetchApiKey: () => Promise<void>;
  startBooking: (request: BookingRequest) => Promise<void>;
}