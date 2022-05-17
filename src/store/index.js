import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from './reducers/pokemon.reducer'

export const store = configureStore({
	reducer: {
		pokemons: pokemonSlice,
	}
})