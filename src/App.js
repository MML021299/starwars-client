import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Modal from "./components/Modal";
import SearchFilter from "./components/SearchFilter";
import Loading from "./components/Loading";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const cardsPerPage = 10;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredCards(
      cards.filter((card) =>
        card.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  const handleFilter = () => {
    setFilteredCards(filteredCards.reverse());
  };

  const openCard = (card) => {
    setSelectedCard(card);
  };

  const closeCard = () => {
    setSelectedCard(null);
  };

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const currentCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchAllPeople = async () => {
      let allPeople = []
      let page = "https://swapi.dev/api/people/"

      try {
        while(page) {
          const res = await axios.get(page)
          allPeople = [...allPeople, ...res.data.results]
          page = res.data.next
        }
      } catch (error) {
        console.log(error)
      }

      setFilteredCards(allPeople)
      setCards(allPeople)
      setLoading(false)
    }

    fetchAllPeople()
  }, [])

  return (
    <div className="App">
      <SearchFilter
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      {loading ? (
        <Loading /> // Display the loading animation
      ) : (
        <div className="card-grid">
          {currentCards.map((card) => (
            <Card key={card.id} card={card} onClick={() => openCard(card)} />
          ))}
        </div>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-button ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {selectedCard && (
        <Modal card={selectedCard} onClose={closeCard} />
      )}
    </div>
  );
};

export default App;