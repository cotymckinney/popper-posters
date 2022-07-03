import './App.css';
import {useState, useEffect} from 'react';
import MovieCard from './components/movieCard/MovieCard';
import ScrollButton from './components/scrollButton/ScrollButton';
// import Marquee from './components/marquee/Marquee';
import MovieSearchBar from './components/movieSearchBar/MovieSearchBar'

function App() {
  const [state, setState] = useState([]);
  const { search } = window.location;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;
  let userQuery = new URLSearchParams(search).get('s');
  let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${userQuery}&page=1&include_adult=false`
  let userSearch;
  let movies;
  let marqueeHeader;

  const getMovieData = async () => {
    try {

      // ADD SEARCH LOGIC
      if(!userQuery) {
        movies = await fetch(BASE_URL).then(res => res.json());
        
        setState(movies.results);
      }else {
        userSearch = await fetch(SEARCH_URL).then(res => res.json());

        setState(userSearch.results);
      };
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getMovieData();
  }
  );
  
  if(!userQuery){
    marqueeHeader = 'Now Showing!';
  }else {
    marqueeHeader = 'Movies';
  };

  return (
    <div className="App">
      <div className='marquee'>
          <span className="leftDot"></span>
          <span className="leftLittleDot"></span>
          <span className="leftBigDot"></span>
          <span className="leftDot"></span>
          <span className="leftLittleDot"></span>
          <span className="leftBigDot"></span>
          <h1>{marqueeHeader}</h1>
          <span className="rightDot"></span>
          <span className="rightBigDot"></span>
          <span className="rightLittleDot"></span>
          <span className="rightDot"></span>
          <span className="rightBigDot"></span>
          <span className="rightLittleDot"></span>
      </div>
      <MovieSearchBar/>
      <div className='movie'>
        {state.map((movie) => (
          <MovieCard key={movie.title} title={movie.title} poster={movie.poster_path} />
        ))}
      </div>
      <ScrollButton/>
    </div>
  );
}

export default App;
