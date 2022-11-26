import React, { useState } from "react";
import CardList from "./CardList";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=535942bd1362d7c8de05bb0782a6b71e&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="e.g Old Guard"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>

      <div className="card-list">
        {/* filter only movies with poster image and map through them */}
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => {
            return <CardList movie={movie} />;
          })}
      </div>
    </>
  );
};

export default SearchMovies;
