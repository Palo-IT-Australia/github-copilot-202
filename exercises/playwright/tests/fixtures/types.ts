// Typed shapes of the Skyline Air API responses.
export interface Flight {
  id: number;
  flightNo: string;
  from: string;
  to: string;
  departs: string;
  priceAud: number;
}

export interface BookingRequest {
  flightId: number;
  passengerName: string;
}

export interface Booking {
  bookingRef: string;
  flightId: number;
  passengerName: string;
  status: 'CONFIRMED' | 'CANCELLED';
  totalAud: number;
}

export interface ApiError {
  error: string;
}
