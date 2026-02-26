import { useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

export function useFlightSearch() {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFlight = useCallback(async (flightNumber) => {
    if (!flightNumber || !flightNumber.trim()) {
      setError('Please enter a flight number.');
      return;
    }

    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const cleanedFlightNumber = flightNumber.trim().toUpperCase().replace(/\s+/g, '');
      const url = `${BASE_URL}/flights?access_key=${API_KEY}&flight_iata=${cleanedFlightNumber}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API returned an error.');
      }

      if (!data.data || data.data.length === 0) {
        setError(`No flights found for flight number "${flightNumber}". Please check and try again.`);
        return;
      }

      setFlightData(data.data);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setFlightData(null);
    setError(null);
  }, []);

  return {
    flightData,
    loading,
    error,
    searchFlight,
    clearResults,
  };
}