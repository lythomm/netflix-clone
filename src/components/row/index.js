import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../hooks/requests";
import YouTube from "react-youtube";
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

  const selectShow = async (movie, type) => {
    if (trailerUrl) {
      setTrailerUrl("");
      const { data } = await axios.get(`/${type}/${movie.id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: "videos",
        },
      });
      const trailer = data.videos.results.find((vid) =>
        vid.name.includes("Trailer" || "trailer")
      );
      setTrailerUrl(trailer.key);
    } else {
      const { data } = await axios.get(`/${type}/${movie.id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: "videos",
        },
      });
      const trailer = data.videos.results.find((vid) =>
        vid.name.includes("Trailer" || "trailer")
      );
      setTrailerUrl(trailer.key);
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movies.id}
            onClick={() =>
              isLargeRow ? selectShow(movie, "tv") : selectShow(movie, "movie")
            }
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
