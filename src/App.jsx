import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; 
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Trending from './Pages/Trending';
import Shopping from './Pages/Shopping';
import Gaming from './Pages/Gaming';
import Search from './Pages/Search'
import VideoPlayerPage from './Components/VideoPlayerPage';
import ChannelPage from './Pages/ChannelPage';
// import NotFound from './Pages/NotFound'; 

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="trending" element={<Trending />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="gaming" element={<Gaming />} />
          <Route path="search" element={<Search />} />
          <Route path="/watch/:videoId" element={<VideoPlayerPage />} />
          <Route path="channel/:id" element={<ChannelPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </> 
  );
};

export default App;
