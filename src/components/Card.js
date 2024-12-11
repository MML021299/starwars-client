import React from "react";
import "../App.css";
import { getCharacterNumber } from "../utils"

const Card = ({ card, onClick }) => (
    <div className="card" onClick={onClick}>
      <img src={`/assets/${getCharacterNumber(card.url)}.jpg`} alt={card.name} className="card-image" />
      <h3>{card.name}</h3>
    </div>
  );

export default Card;