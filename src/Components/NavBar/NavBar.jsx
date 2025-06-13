import React, { useState, useEffect, useRef } from 'react';
import YtLogo from '../../assets/logo.png';
import favicon from '../../assets/favicon.png';

const NavBar = ({ expanded, setExpanded, setHeight, searchVal, setSearchVal, onSearch }) => {
  const componentRef = useRef(null);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);

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

  return (
    <>
      {/* Navbar */}
      <nav
        className="w-full h-20 px-4 flex items-center justify-between bg-white top-0 z-10 sticky shadow-md shadow-gray-300"
        ref={componentRef}
      >
        {/* Left - Logo + Toggle */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={() => setExpanded(!expanded)}
          >
            <i className="fa-solid fa-bars text-gray-700text-lg" />
          </button>
          <img src={YtLogo} alt="YouTube Logo" className="h-6 object-contain" draggable="false" />
        </div>

        {/* Middle - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-l-full bg-transparent text-gray-800 focus:outline-none focus:border-blue-400"
              aria-label="Search videos"
            />
            <button
              aria-label="Search"
              className="px-5 bg-gray-100 border-y border-r rounded-r-full hover:bg-gray-200"
              onClick={() => searchVal.trim() && onSearch()}
            >
              <i className="fa-solid fa-magnifying-glass text-gray-600 " />
            </button>
          </div>
          <button
            aria-label="Search with your voice"
            onClick={() => setShowMicModal(true)}
            className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <i className="fa-solid fa-microphone text-gray-700" />
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 ">
            <i className="fa-solid fa-magnifying-glass text-gray-700 " />
          </button>

          <button
            className="p-3 hidden sm:flex items-center justify-center rounded-full bg-gray-100  hover:bg-gray-300 "
            title="Create"
          >
            <i className="fa-solid fa-plus text-lg pr-2 text-gray-700 "></i>
            <p className="text-gray-700 ">Create</p>
          </button>

          <button
            className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full hover:bg-gray-200 "
            title="Notifications"
          >
            <div className="relative">
              <i className="fa-solid fa-bell text-gray-700 " />
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
                className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-64 z-20 border border-gray-200  transition-all duration-200 cursor-pointer"
              >
                <div className="p-4 border-b border-gray-200 flex flex-row items-center justify-around hover:bg-gray-300">
                  <img src={favicon} className='w-10 h-10'/>
                  <div>
                  <p className="font-semibold text-lg text-gray-900 ">Akshat Tiwari</p>
                  <p className="text-sm text-gray-600 ">itsakshatts@gmail.com</p>
                  <p className="text-sm text-blue-500">View your channel</p>
                </div>
                </div>
                <ul className="divide-y divide-gray-200 py-2 px-4">
                  <li className='flex flex-col justify-left mt-3'>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-brands fa-google mr-5"></i>
                      Google Account
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-user mr-5"></i>
                      Switch Account
                    </p>
                    <p className='p-2 rounded-lg hover:bg-gray-300'>
                      <i class="fa-solid fa-door-open mr-5"></i>
                      Sign out
                    </p>
                  </li>

                  <li className='flex flex-col justify-left mt-3'>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-film mr-5"></i>
                      Youtube Studio
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-bitcoin-sign mr-5"></i>
                      Purchases
                    </p>
                  </li>
                  <li className="flex flex-col justify-left mt-3">
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-hands-holding-circle mr-5"></i>
                      Your Data in Youtube
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-sun mr-5"></i>
                      Appearance : Light
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-language mr-5"></i>
                      Language : English
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-shield mr-5"></i>
                      Restricted Mode : Off
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-globe mr-5"></i>
                      Location : India
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-keyboard mr-5"></i>
                      Keyboard Shortcuts
                    </p>
                  </li>
                  <li className="flex flex-col justify-left mt-3">
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-gear mr-5"></i>
                      Settings
                    </p>
                  </li>
                  <li className="flex flex-col justify-left mt-3">
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-circle-question mr-5"></i>
                      Help
                    </p>
                    <p className='p-2 hover:bg-gray-300 rounded-lg'>
                      <i class="fa-solid fa-comments mr-5"></i>
                      Send Feedback
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

{/* Microphone Modal */}
{showMicModal && (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-100 bg-opacity-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center relative">
      <button
        onClick={() => setShowMicModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <i className="fa-solid fa-xmark text-xl" />
      </button>
      <i className="fa-solid fa-microphone text-red-600 text-4xl mb-4"></i>
      <h2 className="text-lg font-semibold text-gray-800">Listening...</h2>
      <p className="text-sm text-gray-600 mt-2">Speak now to search</p>
    </div>
  </div>
)}

    </>
  );
};

export default NavBar;
