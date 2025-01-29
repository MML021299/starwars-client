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
  const [planets, setPlanets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [gender, setGender] = useState("All");
  const [homeworld, setHomeworld] = useState("All");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const cardsPerPage = 10;

  const handleSearch = (query) => {
    let filtered = cards
    
    setSearchQuery(query);

    if (query) {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (gender && gender !== "All") {
      filtered = filtered.filter((card) => card.gender === gender);
    }

    if (homeworld && homeworld !== "All") {
      filtered = filtered.filter((card) => card.homeworld === homeworld);
    }

    setFilteredCards(filtered)
    setCurrentPage(1);
  };

  const handleFilter = ({ gender, homeworld, searchQuery }) => {
    let filtered = cards;
    setGender(gender)
    setHomeworld(homeworld)

    if (searchQuery) {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (gender && gender !== "All") {
      filtered = filtered.filter((card) => card.gender === gender);
    }

    if (homeworld && homeworld !== "All") {
      filtered = filtered.filter((card) => card.homeworld === homeworld);
    }
  
    setFilteredCards(filtered);
    setCurrentPage(1);
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

  const fetchAllPeople = async () => {
    setLoading(true)
    let allPeople = []
    let page = "https://swapi.py4e.com/api/people/"

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

  const fetchAllPlanets = async () => {
    setLoading(true)
    let allPlanets = []
    let page = "https://swapi.py4e.com/api/planets/"

    try {
      while(page) {
        const res = await axios.get(page)
        allPlanets = [...allPlanets, ...res.data.results]
        page = res.data.next
      }
    } catch (error) {
      console.log(error)
    }
    
    setPlanets(allPlanets)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllPeople()
    fetchAllPlanets()
  }, [])

  return (
    <div className="App">
      <SearchFilter
        searchQuery={searchQuery}
        planets={planets}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      {loading ? (
        <Loading />
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