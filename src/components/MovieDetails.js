import { useNavigate, useParams } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import useMovieImages from '../hooks/useMovieImages';
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import useSimilarMovies from "../hooks/useSimilarMovies";
import MovieCard from "./MovieCard";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const { data, isLoading, isFetching } = useMovieDetails(movieId);
  const { data: images, isLoading: isImagesLoading } = useMovieImages(movieId);
  const { data: similarMovies, isLoading: isSimilarMoviesLoading } = useSimilarMovies(movieId);
  useMovieTrailer(movieId);

  useEffect(() => {
    console.log(similarMovies)

  }, [isLoading, isImagesLoading, trailerVideo, isSimilarMoviesLoading])

  return (

    <div className='main w-screen h-fit flex flex-wrap justify-center items-start p-4 bg-slate-900 min-w-screen min-h-screen gap-y-5 overflow-x-hidden' >
      {isLoading && !data && <div className='place-self-center text-white text-xl font-medium '>Loading...</div>}
      {!isLoading && !isImagesLoading &&
        <>

          <div className='header w-full h-16 bg-slate-900 text-white  flex justify-between items-center mb-5' >
            <span className='font-bold text-3xl'>{data.original_title}</span>
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-fit h-fit' onClick={() => {
              navigate("/browse")
            }}>Home</button>
          </div>
          <div className="grow w-full sm:w-1/2 h-113 bg-slate-900 text-white flex justify-center items-center" >
            <div className='w-60 '>
              <img alt="Movie Card" className="w-full rounded-md m-auto" src={IMG_CDN_URL + data.poster_path} />
            </div>

          </div>
          <div className="grow w-full sm:w-1/2 h-fit bg-slate-900  text-white flex flex-col justify-evenly gap-2" >
            <span className='font-semibold text-2xl'>{data.original_title}</span>
            <span className='text-lg'>Rating: {data.vote_average.toString().slice(0, 3) + "/10"}</span>
            <span className='text-lg'>Length(time): {data.runtime + "min"}</span>
            <span className='text-lg'>Release Date: {data.release_date}</span>
            <span className='text-lg'>Age Restricted{"(18+) : "}{data.adult == true ? "Yes" : "No"}</span>
            <span className='text-lg'>Budget: {"$" + data.budget}</span>
            <span className='text-lg'>Revenue: {"$" + data.revenue}</span>
            <span className='text-lg'>Genres: {data.genres.map((genre, i) => (<span key={i}>{genre.name}{i != data.genres.length - 1 ? "," : ""}</span>))}</span>
          </div>
          <div className=' w-full col-span-2  h-fit bg-slate-900 text-white text-lg  mt-5' >
            <h1 className='block text-xl font-semibold'>Overview:</h1>
            {data.overview}
          </div>
          <div className=' w-full col-span-2  h-fit bg-slate-900  text-white' >
            <h1 className='block text-xl font-semibold'>Preview:</h1>
            <div className="p-2 ">

              <div className="flex overflow-x-scroll">
                <div className="flex">
                  {images.backdrops.map((image, i) => (
                    <img alt="Movie Card" className='mx-2 my-1 rounded-md' src={IMG_CDN_URL + image.file_path} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=' w-full col-span-2  h-fit bg-slate-900  text-white' >
            <h1 className='block text-xl font-semibold'>Trailer:</h1>
            <div className="p-2 ">

              <div className="w-full ">
                <div className="flex">
                  <iframe
                    className="w-screen aspect-video"
                    src={
                      "https://www.youtube.com/embed/" +
                      trailerVideo?.key +
                      "?&autoplay=1&mute=1"
                    }
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {
            !isSimilarMoviesLoading && similarMovies && similarMovies.results &&
            <div className=' w-full col-span-2  h-fit bg-slate-900  text-white' >
              <h1 className='block text-xl font-semibold'>Similar Movies:</h1>
              <div className="p-2 ">

                <div className="flex overflow-x-scroll">
                  <div className="flex">
                    {similarMovies.results.map((movie, i) => (
                      <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }

    </div>

  );
};
export default MovieDetails;