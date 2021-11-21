import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);   // useState is React Hook.
    const [isLoading, setIsLoading] = useState(false); //By default we are passing the isLoading state as false
    const [error, setError] = useState(null);
    //The async keyword is added to functions to tell them to return a promise rather than directly returning the value.

    //await can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, 
    //then return the resulting value.

    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            if (!response.ok) {
                throw new Error('Something went wrong!!');
            }
            const data = await response.json();
           
            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                };
            });
            setMovies(transformedMovies);
            
        }
        catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p> Found no Movies </p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>
    }



    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
                {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
                {isLoading && <p>Loading...</p>}
                {!isLoading && error && <p>{error}</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
