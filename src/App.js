import React, { useState } from 'react';
import Search from './components/Search';
import Movies from './components/Movies';
import axios from 'axios';
import Popup from './components/Popup';


function App() {
  const [state, setState] = useState({
    s: "",
    movies: [],
    selected: {}
  })
  const apiUrl = "https://www.omdbapi.com/?apikey=e4db3ced&t=&i";

  const search = (e) => {
    if (e.key ==="Enter") {
      if (state.s!=="") {
      axios(apiUrl + "&s=" + state.s).then(({ data }) => {
        let movies = data.Search;

        setState(prevState => {
          return { ...prevState, movies: movies }
        })
      });
    } else 
      alert("Enter movie name")
  } //enter if pab
} //funkcijos pabaiga

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return { ...prevState, s: s }
  });
  }

  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>MOVIE SEARCH</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Movies movies={state.movies} openPopup={openPopup}/>
       {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;