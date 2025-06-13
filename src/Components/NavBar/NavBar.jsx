import React, { useState, useEffect, useRef } from 'react';
import YtLogo from '../../assets/Logo.svg';
import favicon from '../../assets/favicon.png';
import YtdarkLogo from '../../assets/yt_logo_rgb_dark.png'
import { Link } from 'react-router';

const NavBar = ({ expanded, setExpanded, setHeight, searchVal, setSearchVal, onSearch }) => {
  const componentRef = useRef(null);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  }); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    if (componentRef.current) {
      setHeight(componentRef.current.offsetHeight);
    }

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className="w-full h-20 px-4 flex items-center justify-between bg-[var(--color-bg-root)] sticky top-0 z-10 shadow-md shadow-gray-300 dark:shadow-gray-800"
        ref={componentRef}
      >
        {/* Left - Logo + Toggle */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-tertiary)] transition-colors duration-200 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <i className="fa-solid fa-bars text-[var(--color-secondary)] dark:text-[var(--color-dark-secondary)] text-lg" />
          </button>
          {darkMode ? (
  <Link to="/">
    <img 
      src={YtdarkLogo} 
      alt="YouTube Logo" 
      className="h-6 object-contain transition-opacity duration-300"
      draggable="false"
    />
  </Link>
) : (
  <Link to="/">
    <img 
      src={YtLogo} 
      alt="YouTube Logo" 
      className="h-6 object-contain transition-opacity duration-300"
      draggable="false"
    />
  </Link>
)}
        </div>

        {/* Middle - Search */}
        {/* Desktop Search - hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-l-full bg-[var(--color-bg-root)] text-[var(--color-text-primary)] border-[var(--color-secondary)] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
              aria-label="Search videos"
              onKeyPress={(e) => e.key === 'Enter' && searchVal.trim() && onSearch()}
            />
            <button
              aria-label="Search"
              className="px-5 bg-[var(--color-tertiary)] border-y border-r border-[var(--color-secondary)] rounded-r-full hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
              onClick={() => searchVal.trim() && onSearch()}
            >
              <i className="fa-solid fa-magnifying-glass text-[var(--color-secondary)] cursor-pointer" />
            </button>
          </div>
          <button
            aria-label="Search with your voice"
            onClick={() => setShowMicModal(true)}
            className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-tertiary)] cursor-pointer transition-colors duration-200"
          >
            <i className="fa-solid fa-microphone" />
          </button>
        </div>

        {/* Mobile Search*/}
        {showMobileSearch && (
          <div className="md:hidden absolute left-0 right-0 top-20 bg-[var(--color-bg-root)] px-4 py-2 flex items-center z-20">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full px-4 py-2 border rounded-l-full bg-[var(--color-bg-root)] text-[var(--color-text-primary)] border-[var(--color-secondary)] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                aria-label="Search videos"
                onKeyPress={(e) => e.key === 'Enter' && searchVal.trim() && onSearch()}
                autoFocus
              />
              <button
                aria-label="Search"
                className="px-4 bg-[var(--color-tertiary)] border-y border-r border-[var(--color-secondary)] rounded-r-full hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  searchVal.trim() && onSearch();
                  setShowMobileSearch(false);
                }}
              >
                <i className="fa-solid fa-magnifying-glass text-[var(--color-secondary)] cursor-pointer" />
              </button>
            </div>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="ml-2 text-[var(--color-text-primary)]"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Right - Icons */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <i className="fa-solid fa-magnifying-glass text-[var(--color-text-primary)]" />
          </button> 
          <button className="p-3 hidden sm:flex items-center justify-center rounded-full  bg-[var(--color-tertiary)]  transition-colors duration-200 cursor-pointer "
  title="Create"
>
  <div className="flex items-center ">
    <i className="fa-solid fa-plus text-lg pr-2"></i>
    <p>Create</p>
  </div>
</button>

          <button
            className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full cursor-pointer "
            title="Notifications"
          >
            <div className="relative">
              <i className="fa-solid fa-bell text-[var(--color-primary)] " />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
          </button>

          <div className="relative">
            <button
              ref={avatarRef}
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
              title="Your channel"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src={favicon} alt="User" className="w-full h-full object-cover" draggable="false" />
            </button>

            {showDropdown && (
  <div
    ref={dropdownRef}
    className="absolute right-0 top-12 bg-[var(--color-bg-root)] shadow-lg rounded-md w-64 z-20 border border-[var(--color-secondary)] transition-all duration-200 cursor-pointer"
  >
    {/* profile section */}
    <div className="p-4 border-b border-[var(--color-secondary)] flex flex-row items-center justify-around">
      <img src={favicon} className='w-10 h-10'/>
      <div>
        <p className="font-semibold text-lg text-[var(--color-text-primary)]">Akshat Tiwari</p>
        <p className="text-sm text-[var(--color-text-secondary)]">itsakshatts@gmail.com</p>
        <p className="text-sm text-blue-500 ">View your channel</p>
      </div>
    </div>

    {/* Scrollable menu section */}
    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
      <ul className="divide-y divide-gray-200 py-2 px-4">
        <li className='flex flex-col justify-left mt-3'>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-brands fa-google mr-5"></i>
            Google Account
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-user mr-5"></i>
            Switch Account
          </p>
          <p className='p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700'>
            <i className="fa-solid fa-door-open mr-5"></i>  
            Sign out
          </p>
        </li>

        <li className='flex flex-col justify-left mt-3'>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-film mr-5"></i>
            Youtube Studio
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-bitcoin-sign mr-5"></i>
            Purchases
          </p>
        </li>
        
        <li className="flex flex-col justify-left mt-3">
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-hands-holding-circle mr-5"></i>
            Your Data in Youtube
          </p>
          <p 
            className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg flex items-center cursor-pointer'
            onClick={toggleDarkMode}
          >
            <i className="fa-solid fa-moon mr-5 hidden dark:inline"></i>
            Appearance: {darkMode ? 'Dark' : 'Light'}
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-language mr-5"></i>
            Language : English
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-shield mr-5"></i>
            Restricted Mode : Off
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-globe mr-5"></i>
            Location : India
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-keyboard mr-5"></i>
            Keyboard Shortcuts
          </p>
        </li>
        
        <li className="flex flex-col justify-left mt-3">
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-gear mr-5"></i>
            Settings
          </p>
        </li>
        
        <li className="flex flex-col justify-left mt-3">
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-circle-question mr-5"></i>
            Help
          </p>
          <p className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg'>
            <i className="fa-solid fa-comments mr-5"></i>
            Send Feedback
          </p>
        </li>
      </ul>
    </div>
  </div>
)}
          </div>
        </div>
      </nav>

      {/* Microphone Modal */}
      {showMicModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[var(--color-bg-modal)] text-[var(--color-primary)] ">
          <div className="bg-[var(--color-text-secondary)] rounded-lg p-6 shadow-lg w-80 text-center relative">
            <button
              onClick={() => setShowMicModal(false)}
              className="absolute top-2 right-2 text-gray-500 "
            >
              <i className="fa-solid fa-xmark text-xl" />
            </button>
            <i className="fa-solid fa-microphone text-red-600 text-4xl mb-4"></i>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Listening...</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Speak now to search</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;