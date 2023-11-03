import { useQuery } from "@tanstack/react-query";
import { API_OPTIONS } from "../utils/constants";
import ms from 'ms';
const getData = async (movieId) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "/similar?language=en-US&page=1",
    API_OPTIONS
  );
  const data = await response.json();
  return data;
}

const useSimilarMovies = (movieId) =>
  useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: () => getData(movieId),
    staleTime: ms("24h"),
    enabled: !!movieId,
  });

export default useSimilarMovies;