import { useState } from "react";
import useFlightSearch from "../hooks/useFlightSearch";
import FlightCard from "./FlightCard";

const FlightSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const { flightData, loading, error } = useFlightSearch(flightNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim().toUpperCase();
    if (trimmed) {
      setFlightNumber(trimmed);
    }
  };

  return (
    <div className="flight-search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter flight number (e.g. AA100)"
            className="search-input"
            aria-label="Flight number input"
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !inputValue.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      <div className="results-container">
        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching flight information...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <p className="error-message">⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && flightData && flightData.length === 0 && flightNumber && (
          <div className="empty-state">
            <p>No flight data found for <strong>{flightNumber}</strong>. Please check the flight number and try again.</p>
          </div>
        )}

        {!loading && !error && flightData && flightData.length > 0 && (
          <div className="flight-results">
            <h2 className="results-heading">
              Results for <span className="flight-number-highlight">{flightNumber}</span>
            </h2>
            {flightData.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
        )}

        {!flightNumber && !loading && (
          <div className="initial-state">
            <div className="plane-icon">✈️</div>
            <p>Enter a flight number above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;