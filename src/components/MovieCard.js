import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, movieId }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 my-2" onClick={() => { navigate(`/movie/${movieId}`) }}>
      <img alt="Movie Card" className="rounded-md" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
