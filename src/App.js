import React, { useState } from "react";
import './App.css';
import Header from "./components/Header";
import Search from "./components/Search";
import ShowList from "./components/ShowList";
import ShowEpisodes from "./components/ShowEpisodes";

function App() {
  const [loading, setLoading] = useState(false);
  const [showsList, setShows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [episodesList, setEpisodesList] = useState([]);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [selectedShow, setSelectedShow] = useState("");

  const search = searchValue => {
    setLoading(true);
    setShowEpisodes(false);
    setErrorMessage(null);

    fetch(`https://api.tvmaze.com/search/shows?q=${searchValue}&embed=episodes`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse) {
          setShows(jsonResponse);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const getShowEpisodes = show => {
    setShowEpisodes(true);
    setSelectedShow(show);

    fetch(`http://api.tvmaze.com/shows/${show?.id}/episodes`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse) {
          setEpisodesList(jsonResponse);
        } else {
          setErrorMessage(jsonResponse.Error);
        }
      });
  };

  return (
    <div className="App">
      <Header text="Show Finder" />
      <div className="App-body">
        <Search search={search}/>
        <div className="show-list flex-center">
          {loading && !errorMessage ? (
          <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            (showsList.length > 0 && !showEpisodes )&& showsList.map((data) => (
              <ShowList show={data.show} getShowEpisodes={getShowEpisodes}/>
            ))
          )}
          {showEpisodes && 
            <ShowEpisodes episodesList={episodesList} selectedSeason={1} selectedShow={selectedShow}/>
           }
        </div>
      </div>
    </div>
  );
}

export default App;
