import React, { useEffect, useState } from "react";
import "../App.css";
import { getCharacterNumber, capitalizeFirstLetter } from "../utils"
import axios from "axios";

const getFilm = async (url) => {
  const res = await axios.get(url)
  console.log('res')
  console.log(res)
  console.log('res')
  return res.data.title
}

const Modal = ({ card, onClose }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmTitles = async () => {
      try {
        const film = await Promise.all(card.films.map(getFilm));
        setFilms(film);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching film titles:", error);
      }
    };

    fetchFilmTitles();
  }, [card.films]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={`/assets/${getCharacterNumber(card.url)}.jpg`} alt={card.name} className="modal-image" />
        <div className="modal-content">
          <p><strong>Name:</strong> {card.name}</p>
          <p><strong>Gender:</strong> {capitalizeFirstLetter(card.gender)}</p>
          <p><strong>Height:</strong> {capitalizeFirstLetter(card.height)}</p>
          <p><strong>Weight:</strong> {capitalizeFirstLetter(card.mass)} </p>
          <p><strong>Films:</strong></p>
          {loading ? (
            <p style={{paddingLeft: '20px'}}>Loading films...</p> // Loading text message
          ) : (
            films.length > 0 ? (
              <ul>
                {films.map((film, index) => (
                  <li key={index}>{film}</li>
                ))}
              </ul>
            ) : (
              <p>No Star Wars film appearance</p>
            )
          )}
        </div>
      </div>
    </div>
  )
};

export default Modal;