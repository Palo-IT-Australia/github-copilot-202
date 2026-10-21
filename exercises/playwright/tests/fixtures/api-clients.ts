import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiError, Booking, BookingRequest, Flight } from './types';

// A typed result: the raw response (for status checks) plus the parsed JSON body.
export interface ApiResult<T> {
  response: APIResponse;
  body: T;
}

export class FlightsApi {
  constructor(private readonly request: APIRequestContext) {}

  async search(from?: string, to?: string): Promise<ApiResult<Flight[]>> {
    const response = await this.request.get('/api/flights', { params: { ...(from && { from }), ...(to && { to }) } });
    return { response, body: await response.json() };
  }
}

export class BookingsApi {
  constructor(private readonly request: APIRequestContext) {}

  async create(payload: Partial<BookingRequest>): Promise<ApiResult<Booking | ApiError>> {
    const response = await this.request.post('/api/bookings', { data: payload });
    return { response, body: await response.json() };
  }
}
