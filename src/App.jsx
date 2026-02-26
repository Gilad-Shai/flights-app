import { useState } from 'react'
import FlightSearch from './components/FlightSearch'
import FlightCard from './components/FlightCard'
import useFlightSearch from './hooks/useFlightSearch'
import './App.css'

function App() {
  const [flightNumber, setFlightNumber] = useState('')
  const [submittedFlight, setSubmittedFlight] = useState('')
  const { flightData, loading, error } = useFlightSearch(submittedFlight)

  const handleSearch = (value) => {
    setSubmittedFlight(value.trim().toUpperCase())
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Flight Tracker</h1>
        <p className="app-subtitle">Search for real-time flight information</p>
      </header>

      <main className="app-main">
        <FlightSearch
          flightNumber={flightNumber}
          setFlightNumber={setFlightNumber}
          onSearch={handleSearch}
          loading={loading}
        />

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching flight data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
          </div>
        )}

        {flightData && !loading && !error && (
          <FlightCard flight={flightData} />
        )}

        {submittedFlight && !loading && !error && !flightData && (
          <div className="no-results">
            <p>No flight information found for <strong>{submittedFlight}</strong>.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by AviationStack API</p>
      </footer>
    </div>
  )
}

export default App