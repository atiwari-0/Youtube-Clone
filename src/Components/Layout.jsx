import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import NavBar from './NavBar/NavBar';
import Aside from './Aside/Aside';
import BodyContainer from './BodyContainer';
import { fetchData } from '../utils'; 

const Layout = () => {
  const [expanded, setExpanded] = useState(true);
  const [height, setHeight] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedQuery = searchVal.trim().toLowerCase();
    if (!trimmedQuery) return;

    const cached = sessionStorage.getItem(trimmedQuery);
    if (cached) {
      console.log('⚡ Using cache for', trimmedQuery);
      setSearchResults(JSON.parse(cached));
      setError(null);
      navigate('/search');
      return;
    }

    try {
      console.log('🌐 Fetching API for', trimmedQuery);
      const result = await fetchData(`/search/?q=${trimmedQuery}&hl=en&gl=us`);

      if (result.success) {
        sessionStorage.setItem(trimmedQuery, JSON.stringify(result.data));
        setSearchResults(result.data);
        setError(null);
        navigate('/search');
      } else {
        setError(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('API Call Error:', err);
      setError('Search failed. Please try again.');
    }
  };

  return (
    <>
      <NavBar
        expanded={expanded}
        setExpanded={setExpanded}
        setHeight={setHeight}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        onSearch={handleSearch} // 🚀 connect the handler
      />
      <Aside expanded={expanded} height={height} />
      <BodyContainer expanded={expanded} height={height}>
        <Outlet context={{ searchVal, searchResults, error }} />
      </BodyContainer>
    </>
  );
};

export default Layout;
