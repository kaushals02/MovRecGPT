import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addDramaMovies } from "../utils/moviesSlice";

const useDramaMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const dramaMovies = useSelector((store) => store.movies.dramaMovies);

  const getdramaMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=18",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addDramaMovies(json.results));
  };

  useEffect(() => {
    !dramaMovies && getdramaMovies();
  }, []);
};

export default useDramaMovies;
