import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    // BsHourGlassSplit,
    BsFillFileEarmarkTextFill
} from "react-icons/bs";

import { IoIosTime } from "react-icons/io";

import MovieCard from "../components/MovieCard";

import "./movie.css";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie= () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async(url) => {
        const res = await fetch (url);
        const data = await res.json();

        setMovie(data);
    };

    const formatCurrency = (number) => {
        if (typeof number !== 'number' || isNaN(number)) {
            throw new TypeError('The input must be a valid number');
        }
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    useEffect(() => {
        const movieUrl = `${movieURL}${id}?${apiKey}`;
        getMovie(movieUrl)
}, []);

    return(
    <div className="movie-page">
        {movie &&(
        <>
            <MovieCard movie={movie} showLink={false} />
            <p className="tagline">{movie.tagline}</p>
            <div className="info">
                <h3>
                    <BsWallet2/>Orçamento:
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
            </div>
            <div className="info">
                <h3>
                    <BsGraphUp/>Receita:
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
            </div>
            <div className="info">
                <h3>
                <IoIosTime />Duração:
                </h3>
                <p>{movie.runtime} minutos</p>
            </div>
            <div className="info description">
                <h3>
                    <BsFillFileEarmarkTextFill/>Descrição:
                </h3>
                <p>{movie.overview}</p>
            </div>
        </>
        )}
    </div>    
    );
;}

export default Movie;
