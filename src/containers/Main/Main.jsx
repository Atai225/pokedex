import "./Main.css";
import debounce from 'lodash.debounce'

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  removePokemonArray,
  setType,
  removeType,
  setPokemonArray,
  setModal,
  getSpecialPokemon,
  removeSpecialPokemon,
} from "../../store/reducers/pokemon.reducer";
import CategoriedPoke from "../../components/CategoriedPoke/CategoriedPoke";
import PokemonList from "../../components/PokemonList/PokemonList";
// import useDebounce from "../../components/Debounce/Debounce";

function Main() {
  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons.pokemons);
  const pokemonArray = useSelector((store) => store.pokemons.pokemonArray);
  const categories = useSelector((store) => store.pokemons.categories);
  const pokemon = useSelector((store) => store.pokemons.pokemon);
  const type = useSelector((store) => store.pokemons.type);
  const [text, setText] = useState(null);
  const [event, setEvent] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [pokemonsPerPage] = useState(20);
  const lastIndex = currentPage * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;


  const getCategories = (e) => {
    dispatch(removePokemonArray());
    dispatch(setType(e.target.id));
  };
  const getAllPoks = () => {
    dispatch(removeType());
    dispatch(removePokemonArray());
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const changeHandler = (e) => {
    setText(e.target?.value);
    setEvent(e?.target);
    };

  const debouncedOnChange = debounce((e) => changeHandler(e), 1000)

  useEffect(() => {
    if (pokemon && type) {
      pokemon.forEach((item) => {
        item.types.forEach((i) => {
          if (i.type.name === type) {
            dispatch(setPokemonArray(item));
          }
        });
      });
      dispatch(removeType());
      setCurrentPage(1)
    }
    debouncedOnChange()
  }, [pokemons, type, debouncedOnChange, text]);





  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setModal(true));
    dispatch(getSpecialPokemon(text));
    dispatch(removeSpecialPokemon())

  };
  const setSpecial = (e) => {
    dispatch(setModal(true));
    setText(e.target.textContent)
    event.value = e.target.textContent

    setIsOpen(false);
  }

  const filteredPoke = pokemon.filter((poke) => {
    return poke.name.includes(text);
  });





  return (
    <div className="container">
      <div className="sidebar">
        <h1 className="cat__title">Categories</h1>

        <ul className="cat__list">
          <li className="cat__item" onClick={getAllPoks}>
            All
          </li>
          {categories.map((cat, index) => (
            <li key={index} className="cat__item"
            onClick={(e) => getCategories(e)} id={cat.name}>
              {cat.name !== "unknown" && cat.name !== "shadow" && (
                <>
                  {cat.name}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <form className="search" onSubmit={(e) => submitHandler(e)}>
          <input
            type="text"
            placeholder="Поиск покемона..."
            // value={text}
            onClick={() => setIsOpen(true)}
            className="search__input"
            onChange={debouncedOnChange}
          />
          <ul className="autocomplete">
                {isOpen && text &&
                  filteredPoke.map((pok, index) => (
                    <li key={index} id={pok.name} onClick={(e) => setSpecial(e)} className="autocomplete__item"><img src={pok.sprites.front_default} alt="" /><span>{pok.name}</span></li>
                  ))
                }
          </ul>

          {event.value === "" ? (
            <button disabled className="search__btn disabled">
              Поиск
            </button>
          ) : (
            <button className="search__btn">Поиск</button>
          )}
        </form>
        
        {pokemonArray.length > 0  ?  (
          <CategoriedPoke
            pokemon={pokemonArray}
            lastIndex={lastIndex}
            firstIndex={firstIndex}
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemonArray.length}
            paginate={paginate}
          />
        ) :  (
          <PokemonList
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemon.length}
            paginate={paginate}
            pokemon={pokemon}
            lastIndex={lastIndex}
            firstIndex={firstIndex}
          />
        )}

        {/* {pokemonArray.length <= 0 && filteredPoke.length > 0 ? 
          (
            <PokemonList
              pokemonsPerPage={pokemonsPerPage}
              totalPokemons={filteredPoke.length}
              paginate={paginate}
              pokemon={filteredPoke}
              lastIndex={lastIndex}
              firstIndex={firstIndex}
            />
          ) : (
            <PokemonList
              pokemonsPerPage={pokemonsPerPage}
              totalPokemons={pokemon.length}
              paginate={paginate}
              pokemon={pokemon}
              lastIndex={lastIndex}
              firstIndex={firstIndex}
            />
          )
        } */}
      </div>
    </div>
  );
}

export default Main;
