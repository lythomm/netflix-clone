import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../hooks/requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { AiOutlineClose } from "react-icons/ai";

import "./row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  const handleClick = (movie) => {
    console.log({ movie });
    if (trailerUrl) {
      setTrailerUrl("");
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          console.log({ url });
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          console.log({ url });
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movies.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <div style={{ marginBottom: "10px" }}>
          <div
            className="row__tailer-iconDiv"
            onClick={() => setTrailerUrl("")}
          >
            <AiOutlineClose className="row__trailer-closeIcon" />
          </div>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;
