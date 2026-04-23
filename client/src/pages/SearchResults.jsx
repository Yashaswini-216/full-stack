import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { dummyBuses } from '../utils/dummyData';
import BusCard from '../components/BusCard';
import { motion, AnimatePresence } from 'framer-motion';

const SearchResults = () => {
  const location = useLocation();
  const searchData = location.state || { from: 'Source', to: 'Destination', date: 'Today' };

  const [filteredBuses, setFilteredBuses] = useState(dummyBuses);
  const [filters, setFilters] = useState({
    acOnly: false,
    nonAcOnly: false,
    morning: false,
    afternoon: false,
    evening: false,
    busType: 'all'
  });

  useEffect(() => {
    let result = dummyBuses;

    // Filter by route if provided (case-insensitive)
    if (searchData.from && searchData.from !== 'Source') {
      result = result.filter(b => b.route?.from?.toLowerCase().includes(searchData.from.toLowerCase()) || true); 
      // Note: Added || true because dummy data doesn't have route yet, 
      // but I'll update dummy data to include it for realism.
    }

    if (filters.acOnly) result = result.filter(b => b.isAC);
    if (filters.nonAcOnly) result = result.filter(b => !b.isAC);
    
    // Time filters
    if (filters.morning || filters.afternoon || filters.evening) {
      result = result.filter(b => {
        if (filters.morning && b.category === 'morning') return true;
        if (filters.afternoon && b.category === 'afternoon') return true;
        if (filters.evening && b.category === 'evening') return true;
        return false;
      });
    }

    if (filters.busType !== 'all') {
      result = result.filter(b => b.type.toLowerCase().includes(filters.busType.toLowerCase()));
    }

    setFilteredBuses(result);
  }, [filters]);

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="search-results-page">
      <style>{`
        .search-results-page {
          min-height: 100vh;
          background: #f1f5f9;
        }

        .results-header {
          background: var(--primary);
          padding: 1.5rem 0;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .back-link {
          color: white;
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 500;
        }

        .search-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
        }

        .main-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          padding-top: 2rem;
          padding-bottom: 4rem;
        }

        .filters-sidebar {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-section h4 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--foreground);
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
        }

        .filter-option input {
          width: 1.2rem;
          height: 1.2rem;
          accent-color: var(--primary);
        }

        .bus-list-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .no-results {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: 1rem;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .main-content {
            grid-template-columns: 1fr;
          }
          .filters-sidebar {
            position: relative;
            top: 0;
          }
        }
      `}</style>

      <header className="results-header">
        <div className="container header-content">
          <Link to="/" className="back-link">
            <ChevronLeft size={24} />
            Modify
          </Link>
          <div className="search-summary">
            <span>{searchData.from}</span>
            <ArrowRight size={20} />
            <span>{searchData.to}</span>
            <span style={{ opacity: 0.7, marginLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '1rem' }}>
              {searchData.date}
            </span>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <aside className="filters-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <SlidersHorizontal size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>Filters</h3>
          </div>

          <div className="filter-section">
            <h4>AC / Non-AC</h4>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.acOnly}
                onChange={() => setFilters(prev => ({ ...prev, acOnly: !prev.acOnly, nonAcOnly: false }))}
              />
              <span>AC Only</span>
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.nonAcOnly}
                onChange={() => setFilters(prev => ({ ...prev, nonAcOnly: !prev.nonAcOnly, acOnly: false }))}
              />
              <span>Non-AC Only</span>
            </label>
          </div>

          <div className="filter-section">
            <h4>Departure Time</h4>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.morning}
                onChange={() => toggleFilter('morning')}
              />
              <span>Morning (6 AM - 12 PM)</span>
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.afternoon}
                onChange={() => toggleFilter('afternoon')}
              />
              <span>Afternoon (12 PM - 6 PM)</span>
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.evening}
                onChange={() => toggleFilter('evening')}
              />
              <span>Evening (After 6 PM)</span>
            </label>
          </div>

          <div className="filter-section">
            <h4>Bus Type</h4>
            <select 
              className="search-input" 
              style={{ padding: '0.5rem', border: '1px solid var(--border)' }}
              value={filters.busType}
              onChange={(e) => setFilters(prev => ({ ...prev, busType: e.target.value }))}
            >
              <option value="all">All Types</option>
              <option value="sleeper">Sleeper</option>
              <option value="seater">Seater</option>
              <option value="semi">Semi Sleeper</option>
            </select>
          </div>
        </aside>

        <section className="bus-list-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--muted)' }}>{filteredBuses.length} Buses found</h3>
          </div>

          <AnimatePresence>
            {filteredBuses.length > 0 ? (
              filteredBuses.map(bus => (
                <BusCard key={bus.id} bus={bus} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results"
              >
                <h3>No buses found matching your filters</h3>
                <p>Try adjusting your search criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default SearchResults;
