import { useState } from "react";
import "./PokemonList.css";
import Paginations from '../Paginations/Paginations'
import Modal from "../UI/Modal/Modal";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  getSpecialPokemon,
  setModal,
  removeSpecialPokemon,
} from "../../store/reducers/pokemon.reducer";

function PokemonList({ pokemon, lastIndex, firstIndex, pokemonsPerPage, totalPokemons, paginate }) {

  const dispatch = useDispatch();
  const currentPokemons = pokemon.slice(firstIndex, lastIndex);
  const [showAbilities, setShowAbilities] = useState(false);
  const specialPokemon = useSelector((store) => store.pokemons.specialPokemon);
  const show = useSelector((store) => store.pokemons.show);

  const openModal = (name) => {
    setShowAbilities(false)
    dispatch(setModal(true));
    dispatch(getSpecialPokemon(name));
  };

  return (
    <>
      <h1 className="pok__title">Pokemons</h1>

      <div className="pokemons">
        {currentPokemons &&
          currentPokemons.map((pok, i) => (
            <div
              key={i}
              className="pokemon__item"
              onClick={() => openModal(pok.name)}
            >
              <div className="pokemon__type">
                {pok.types.map((el, key) => {
                  return (
                    <p className="type" key={key}>
                      {el.type.name}
                    </p>
                  );
                })}
              </div>
              <div className="pokemon__img-box">
                <img
                  className="pokemon__img"
                  src={pok.sprites?.front_default}
                  alt="sprite"
                />
              </div>
              <h4 className="pokemon__title">{pok.name}</h4>
              <p>Height: {pok.height}ft</p>
              <p>Weight: {pok.weight}lbs</p>
              <p>Experience: {pok.base_experience}</p>
            </div>
          ))}
        {show && specialPokemon.length > 0 && (
          <Modal close={() => {
            dispatch(setModal(false))
            dispatch(removeSpecialPokemon())
          }}>
            {specialPokemon.map((pokemon) => (
              <>
                <div className="modal__images">
                  <img src={pokemon.sprites.front_default} alt="" />
                  <img src={pokemon.sprites.back_default} alt="" />
                  <img src={pokemon.sprites.front_shiny} alt="" />
                  <img src={pokemon.sprites.back_shiny} alt="" />
                </div>
                <h1 className="modal__name">
                  {pokemon.name}
                </h1>
                <div className="modal__info">
                  <ul className="characteristics">
                    <h3>Characteristics</h3>
                    <li>Height: {pokemon.height}ft</li>
                    <li>Weight: {pokemon.weight}lbs</li>
                    <li>
                      Experience: {pokemon.base_experience}
                    </li>
                  </ul>
                  <ul className="abilities">
                    <span className="modal__title">Abilities</span>
                    {!showAbilities ? (
                      <span
                        className="show"
                        onClick={() => {
                          setShowAbilities(true);
                        }}
                      >
                        <BsFillCaretDownFill />
                      </span>
                    ) : (
                      <span
                        className="close"

                        onClick={() => {
                          setShowAbilities(false);
                        }}
                      >
                        <BsFillCaretUpFill className="close" />
                      </span>
                    )}
                    {showAbilities &&
                      pokemon.abilities.map((el, key) => {
                        return <li key={key}>{el.ability.name}</li>;
                      })}
                  </ul>
                  <ul className="stats">
                    <h3>Stats</h3>
                    {pokemon.stats.map((el, key) => {
                      return (
                        <li key={key}>
                          {el.stat.name}: {el.base_stat}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <h3>Types</h3>
                <ul className="modal__types">
                  {pokemon.types.map((el, key) => {
                    return (
                      <p className="type" key={key}>
                        {el.type.name}
                      </p>
                    );
                  })}
                </ul>
              </>
            ))}



          </Modal>
        )}
      </div>
      <Paginations pokemonsPerPage={pokemonsPerPage} totalPokemons={totalPokemons} paginate ={paginate}/>
    </>
  );
}

export default PokemonList;
