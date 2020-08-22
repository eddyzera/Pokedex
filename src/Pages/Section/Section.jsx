/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import './style.css'
export default function Section() {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const getPokemon = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
        const pokemonsPromises = []
        for (let i = 1; i <= 150; i++) {
            pokemonsPromises.push(fetch(getPokemon(i)).then(response => response.json()))
        }
        Promise.all(pokemonsPromises).then(pokemonJson => setPokemons(pokemonJson))
    },[])

    console.log(pokemons)

    return (
        <section>
              <div className="container">
                <ul data-js="pokedex" className="pokedex">
                    {pokemons.map(pokemon => {
                        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                        return (
                            <li key={pokemon.name} className={`card ${types[0]}`}>
                                <img className={"card-image"} srcSet={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}/>
                                <h2 className={"card-title"}>{pokemon.id}. {pokemon.name}</h2>
                                <p className={"card-subtitle"}>{types.join(' | ')}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
