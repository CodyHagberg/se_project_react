import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { addItem, getItems, removeItem, updateUser, addCardLike, removeCardLike, } from "../../utils/api.js";
import { register, login, getCurrentUser } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [clothingItems, setClothingItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardLike = ({ id, isLiked }) => {
  const token = localStorage.getItem("jwt");

  if (!isLiked) {
    addCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  } else {
    removeCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  }
};

function handleSignOut() {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  setCurrentUser(null);
  setActiveModal("");
}

 function handleUpdateUser(data) {
  updateUser(data)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeActiveModal();
    })
    .catch(console.error);
}

  function handleRegister(data) {
  register(data)
    .then(() => {
      return login({
        email: data.email,
        password: data.password,
      });
    })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      closeActiveModal();
    })
    .catch(console.error);
}

  function handleLogin(data) {
  login(data)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      closeActiveModal();
    })
    .catch(console.error);
}

useEffect(() => {
  const token = localStorage.getItem("jwt");

  if (!token) return;

  getCurrentUser(token)
    .then((user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
    })
    .catch(() => {
      localStorage.removeItem("jwt");
    });
}, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const token = localStorage.getItem("jwt");

  const handleDeleteItem = (id) => {
    removeItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} isLoggedIn={isLoggedIn} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
               path="/profile"
               element={
               <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                     onCardClick={handleCardClick}
                     onCardLike={handleCardLike}
                     clothingItems={clothingItems}
                     handleAddClick={handleAddClick}
                     onEditProfile={() => setActiveModal("edit-profile")}
                     onSignOut={handleSignOut}
                    />
                     </ProtectedRoute>
               }
            />
          </Routes>
        </div>
        <AddItemModal
          buttonText="Add Garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          onDelete={handleDeleteItem}
        />
        <RegisterModal
         isOpen={activeModal === "register"}
         onClose={closeActiveModal}
         onRegister={handleRegister}
        />

        <LoginModal
         isOpen={activeModal === "login"}
         onClose={closeActiveModal}
         onLogin={handleLogin}
        />
        <EditProfileModal
         isOpen={activeModal === "edit-profile"}
         onClose={closeActiveModal}
         onUpdateUser={handleUpdateUser}
        />
        <Footer />
      </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
