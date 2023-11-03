import { useQuery } from "@tanstack/react-query";
import { API_OPTIONS } from "../utils/constants";
import ms from 'ms';
const getData = async (movieId) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "?language=en-US",
    API_OPTIONS
  );
  const data = await response.json();
  return data;
}

const useMovieDetails = (movieId) =>
  useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getData(movieId),
    staleTime: ms("24h"),
    enabled: !!movieId,
  });

export default useMovieDetails;