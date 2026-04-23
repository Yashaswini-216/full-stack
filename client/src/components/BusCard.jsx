import React from 'react';
import { Clock, User, Star, Wifi, Coffee, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

const BusCard = ({ bus }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bus-card"
    >
      <style>{`
        .bus-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bus-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .bus-info-main h3 {
          font-size: 1.25rem;
          color: var(--foreground);
          margin-bottom: 0.25rem;
        }

        .bus-type {
          font-size: 0.875rem;
          color: var(--muted);
          font-weight: 500;
        }

        .rating-badge {
          background: #22c55e;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .bus-journey {
          display: flex;
          align-items: center;
          gap: 3rem;
          padding: 1rem 0;
          border-top: 1px dashed var(--border);
          border-bottom: 1px dashed var(--border);
        }

        .journey-point {
          text-align: center;
        }

        .time {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .duration-line {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          color: var(--muted);
          font-size: 0.75rem;
          position: relative;
        }

        .duration-line::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--border);
          z-index: 0;
        }

        .bus-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .amenities {
          display: flex;
          gap: 1rem;
          color: var(--muted);
        }

        .price-section {
          text-align: right;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .price-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .book-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          display: block;
          margin-top: 0.5rem;
        }

        .book-btn:hover {
          background: var(--primary-hover);
        }

        .seats-left {
          font-size: 0.875rem;
          color: #ef4444;
          font-weight: 600;
        }
      `}</style>

      <div className="bus-header">
        <div className="bus-info-main">
          <h3>{bus.name}</h3>
          <span className="bus-type">{bus.type} | {bus.isAC ? 'AC' : 'Non-AC'}</span>
        </div>
        <div className="rating-badge">
          <Star size={14} fill="currentColor" />
          {bus.rating}
        </div>
      </div>

      <div className="bus-journey">
        <div className="journey-point">
          <div className="time">{bus.departureTime}</div>
          <div className="bus-type">Departure</div>
        </div>
        <div className="duration-line">
          <span>{bus.duration}</span>
          <div style={{ background: 'white', padding: '0 0.5rem', zIndex: 1 }}>
            <Clock size={16} />
          </div>
        </div>
        <div className="journey-point">
          <div className="time">{bus.arrivalTime}</div>
          <div className="bus-type">Arrival</div>
        </div>
      </div>

      <div className="bus-footer">
        <div className="amenities">
          <Wifi size={18} />
          <Coffee size={18} />
          <Battery size={18} />
          <span className="seats-left">{bus.seatsAvailable} Seats left</span>
        </div>
        <div className="price-section">
          <div className="price-label">Starts from</div>
          <div className="price-value">₹{bus.price}</div>
          <button className="book-btn">Select Seats</button>
        </div>
      </div>
    </motion.div>
  );
};

export default BusCard;
