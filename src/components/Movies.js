import React from 'react';
import Result from './Result';

const Movies = ({ movies, openPopup }) => {
    return (
        <section className="movies">
            {movies.map(result => (
                <Result key={result.imdbID} result={result} openPopup={openPopup} />
            ))}
        </section>
    )
}

export default Movies;

