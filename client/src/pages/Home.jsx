import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    time: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, we'd pass these as query params
    navigate('/search', { state: searchData });
  };

  return (
    <div className="hero-container">
      <style>{`
        .hero-container {
          height: 100vh;
          width: 100%;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                      url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-card {
          width: 90%;
          max-width: 1000px;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow-lg);
          color: white;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          text-align: center;
          opacity: 0.9;
        }

        .search-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper i, .input-wrapper svg {
          position: absolute;
          left: 1rem;
          color: var(--primary);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: var(--radius);
          border: none;
          background: white;
          color: var(--foreground);
        }

        .search-button {
          grid-column: 1 / -1;
          background: var(--primary);
          color: white;
          padding: 1.25rem;
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .search-button:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-card { padding: 1.5rem; }
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-card glass"
      >
        <h1 className="hero-title">Your Journey Starts Here</h1>
        <p className="hero-subtitle">Book bus tickets across 2000+ cities in India</p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label>From</label>
            <div className="input-wrapper">
              <MapPin size={18} />
              <input 
                type="text" 
                placeholder="Source City" 
                className="search-input"
                required
                value={searchData.from}
                onChange={(e) => setSearchData({...searchData, from: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>To</label>
            <div className="input-wrapper">
              <MapPin size={18} />
              <input 
                type="text" 
                placeholder="Destination City" 
                className="search-input"
                required
                value={searchData.to}
                onChange={(e) => setSearchData({...searchData, to: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Date</label>
            <div className="input-wrapper">
              <Calendar size={18} />
              <input 
                type="date" 
                className="search-input"
                required
                value={searchData.date}
                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Time</label>
            <div className="input-wrapper">
              <Clock size={18} />
              <input 
                type="time" 
                className="search-input"
                value={searchData.time}
                onChange={(e) => setSearchData({...searchData, time: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="search-button">
            <Search size={20} />
            Search Buses
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;
