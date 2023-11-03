import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useDramaMovies from "../hooks/useDramaMovies";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  useHorrorMovies();
  useDramaMovies()
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Trending"} movies={movies.horrorMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Drama"}
            movies={movies.dramaMovies}
          />
          <MovieList title={"Horror"} movies={movies.horrorMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;