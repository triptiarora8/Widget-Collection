import React from 'react';

export default function Heading({ onSearchChange }) {
  return (
    <>
      <header className='dashboard'>
        <div className="heading colorChange">
          <h2>Dashboard</h2>
        </div>
        <div className='searchbar'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type='search'
            placeholder='Search Anything...'
            onChange={onSearchChange}
          />
        </div>
        <button className='login colorChange' style={{
          backgroundColor: "transparent",
          border: "none",
          fontSize: "1rem",
          fontWeight: "700"
        }}>
          Login
        </button>
      </header>
    </>
  );
}
