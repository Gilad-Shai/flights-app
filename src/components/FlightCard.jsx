import React from 'react';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
  if (!flight) return null;

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('active') || statusLower.includes('en route')) return 'status-active';
    if (statusLower.includes('landed') || statusLower.includes('arrived')) return 'status-landed';
    if (statusLower.includes('scheduled')) return 'status-scheduled';
    if (statusLower.includes('cancelled') || statusLower.includes('canceled')) return 'status-cancelled';
    if (statusLower.includes('delayed')) return 'status-delayed';
    return 'status-unknown';
  };

  const {
    flight: flightInfo,
    airline,
    departure,
    arrival,
    flight_status,
    aircraft,
  } = flight;

  const flightNumber = flightInfo?.iata || flightInfo?.icao || 'N/A';
  const airlineName = airline?.name || 'Unknown Airline';
  const flightStatus = flight_status || 'Unknown';

  const depAirport = departure?.airport || 'N/A';
  const depIata = departure?.iata || '';
  const depScheduled = departure?.scheduled;
  const depActual = departure?.actual || departure?.estimated;
  const depTerminal = departure?.terminal;
  const depGate = departure?.gate;
  const depDelay = departure?.delay;

  const arrAirport = arrival?.airport || 'N/A';
  const arrIata = arrival?.iata || '';
  const arrScheduled = arrival?.scheduled;
  const arrActual = arrival?.actual || arrival?.estimated;
  const arrTerminal = arrival?.terminal;
  const arrGate = arrival?.gate;
  const arrDelay = arrival?.delay;

  const aircraftReg = aircraft?.registration;
  const aircraftIata = aircraft?.iata;

  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <div className="flight-number-section">
          <span className="flight-label">Flight</span>
          <span className="flight-number">{flightNumber}</span>
        </div>
        <div className="airline-section">
          <span className="airline-name">{airlineName}</span>
        </div>
        <div className="status-section">
          <span className={`flight-status ${getStatusClass(flightStatus)}`}>
            {flightStatus.charAt(0).toUpperCase() + flightStatus.slice(1)}
          </span>
        </div>
      </div>

      <div className="flight-route">
        <div className="airport-info departure">
          <div className="airport-iata">{depIata || 'N/A'}</div>
          <div className="airport-name">{depAirport}</div>
          <div className="time-info">
            <div className="scheduled-time">
              <span className="time-label">Scheduled</span>
              <span className="time-value">{formatTime(depScheduled)}</span>
            </div>
            {depActual && (
              <div className="actual-time">
                <span className="time-label">Actual</span>
                <span className="time-value">{formatTime(depActual)}</span>
              </div>
            )}
          </div>
          {depScheduled && (
            <div className="date-info">{formatDate(depScheduled)}</div>
          )}
          {(depTerminal || depGate) && (
            <div className="terminal-gate">
              {depTerminal && <span>Terminal: {depTerminal}</span>}
              {depGate && <span>Gate: {depGate}</span>}
            </div>
          )}
          {depDelay > 0 && (
            <div className="delay-info">Delayed: {depDelay} min</div>
          )}
        </div>

        <div className="flight-path">
          <div className="plane-icon">✈</div>
          <div className="path-line"></div>
        </div>

        <div className="airport-info arrival">
          <div className="airport-iata">{arrIata || 'N/A'}</div>
          <div className="airport-name">{arrAirport}</div>
          <div className="time-info">
            <div className="scheduled-time">
              <span className="time-label">Scheduled</span>
              <span className="time-value">{formatTime(arrScheduled)}</span>
            </div>
            {arrActual && (
              <div className="actual-time">
                <span className="time-label">Actual</span>
                <span className="time-value">{formatTime(arrActual)}</span>
              </div>
            )}
          </div>
          {arrScheduled && (
            <div className="date-info">{formatDate(arrScheduled)}</div>
          )}
          {(arrTerminal || arrGate) && (
            <div className="terminal-gate">
              {arrTerminal && <span>Terminal: {arrTerminal}</span>}
              {arrGate && <span>Gate: {arrGate}</span>}
            </div>
          )}
          {arrDelay > 0 && (
            <div className="delay-info">Delayed: {arrDelay} min</div>
          )}
        </div>
      </div>

      {(aircraftReg || aircraftIata) && (
        <div className="flight-card-footer">
          {aircraftIata && (
            <div className="aircraft-info">
              <span className="info-label">Aircraft:</span>
              <span className="info-value">{aircraftIata}</span>
            </div>
          )}
          {aircraftReg && (
            <div className="aircraft-info">
              <span className="info-label">Registration:</span>
              <span className="info-value">{aircraftReg}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightCard;