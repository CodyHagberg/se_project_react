import { useEffect, useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import{ coordinates, APIkey } from '../../utils/constants.js'
import Header from '../Header/Header.jsx' 
import Main from '../Main/Main.jsx'
import Footer from '../Footer/Footer.jsx'
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import Profile from '../Profile/Profile.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.jsx';
import { getItems } from '../../utils/api.js';



function App() {
const [weatherData, setWeatherData] = useState({type: "", temp: { F: 999, C:999 }, city: ""});
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({});
const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

const [clothingItems, setClothingItems] = useState([]);


const handleToggleSwitchChange = () => {
  setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
};

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCard(card);
};

const onAddItem = (item) => {
  setClothingItems([{ ...item, _id: Date.now() }, ...clothingItems]);
  closeActiveModal();
};

const handleAddClick = () => {
  setActiveModal("add-garment");
};

const closeActiveModal = () => {
setActiveModal("");
};

useEffect(() => {
getWeather(coordinates, APIkey)
.then((data) => {
  const filteredData = filterWeatherData(data);
  setWeatherData(filteredData);
})
.catch(console.error);
getItems().then((data) => {
setClothingItems(data);
}).catch(console.error);

}, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Routes>
         <Route path="/" element={
        <Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems} setClothingItems={setClothingItems}/>
          }
          />
          <Route path="/profile" element={<Profile onCardClick={handleCardClick} clothingItems={clothingItems}/>}/>
          </Routes>
      </div>
      <AddItemModal
      buttonText="Add Garment"
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      onAddItem={onAddItem}
      />
      <ItemModal activeModal={activeModal} card={selectedCard} handleCloseClick={closeActiveModal}/>
      <Footer />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  )
}

export default App
