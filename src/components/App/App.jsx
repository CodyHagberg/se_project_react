import { useEffect, useState } from 'react'
import './App.css'
import{ coordinates, APIkey, defaultClothingItems } from '../../utils/constants.js'
import Header from '../Header/Header.jsx' 
import Main from '../Main/Main.jsx'
import Footer from '../Footer/Footer.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx'
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.jsx';


function App() {
const [weatherData, setWeatherData] = useState({type: "", temp: { F: 999, C:999 }, city: ""});
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({});
const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

const [clothingItems, setClothingItems] = useState(defaultClothingItems);

const handleToggleSwitchChange = () => {
  setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
};

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCard(card);
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
}, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems} setClothingItems={setClothingItems}/>
      </div>
      <ModalWithForm title="New garment" buttonText="Add Garment" activeModal={activeModal} handleCloseClick={closeActiveModal}>
        <label htmlFor="name" className="modal__label">
            Name {""}
            <input type="text"
             className="modal__input"
              id="name" 
              placeholder="Name"
              required />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
            Image {""}
            <input type="url"
             className="modal__input"
              id="imageUrl" 
              placeholder="Image URL"
              required/>
        </label>
        <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
              <input id="hot" type="radio" name="weather" className="modal__radio-input" /> <span>Hot</span>
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
              <input id="warm" type="radio" name="weather"  className="modal__radio-input" /> <span>Warm</span>
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
              <input id="cold" type="radio" name="weather" className="modal__radio-input" /> <span>Cold</span>
            </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} handleCloseClick={closeActiveModal}/>
      <Footer />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  )
}

export default App
