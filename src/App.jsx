import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyContext from "./myContext";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

import { useEffect, useState } from "react";

export default function App() {
  const endpoint = "./photos.json";
  const [gallery, setGallery] = useState([]);
  const [fav, setFav] = useState([]);
  const [heart , setHeart] = useState({});
  const globalState = { gallery , setGallery , fav , setFav , heart , setHeart}

  const getData = async() => {
    const response = await fetch(endpoint);
    const photos = await response.json();
    console.log(photos.photos);
    const arrayPhotos = photos.photos;
    setGallery(prevGallery => [...arrayPhotos]);
    console.log(gallery);
  }
  useEffect(() => {
    getData()
  },[]);

  return (
    <div className="App">
      <MyContext.Provider value = {globalState}>
        <BrowserRouter basename="/">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}