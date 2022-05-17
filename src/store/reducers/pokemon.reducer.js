import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";
import axios from 'axios';




export const getAPokemon = createAsyncThunk(
	'pokemon/get',
	async (pokemon, {
		rejectWithValue
	}) => {
		try {
			const data = await Promise.all(pokemon.map(pok => fetch(pok.url)));
			const ext = await Promise.all(data.map(res => res.json()));
			return ext;
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const getSpecialPokemon = createAsyncThunk(
	'special/get',
	async (name, {
		rejectWithValue
	}) => {
		try {
			const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)


export const getPokemons = createAsyncThunk(
	'pokemons/get',
	async (_, {
		rejectWithValue
	}) => {
		try {
			const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=100`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)


export const getCategories = createAsyncThunk(
	'categories/get',
	async (_, {
		rejectWithValue
	}) => {
		try {
			const res = await axios.get(`https://pokeapi.co/api/v2/type`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)


const pokemonSlice = createSlice({
	name: 'pokemons',
	initialState: {
		pokemons: null,
		pokemon: [],
		loading: '',
		categories: [],
		specialPokemon: [],
		type: null,
		show: false,
		pokemonName: '',
		pokemonArray: [],
	},
	extraReducers: {
		[getPokemons.pending]: (state) => {
			state.loading = 'loading';
		},
		[getPokemons.fulfilled]: (state, action) => {
			state.loading = 'completed';
			state.pokemons = action.payload.results;
		},
		[getPokemons.rejected]: (state) => {
			state.loading = 'error';
		},
		[getAPokemon.pending]: (state) => {
			state.loading = 'loading';
		},
		[getAPokemon.fulfilled]: (state, action) => {
			state.loading = 'completed';
			state.pokemon = action.payload;
		},
		[getAPokemon.rejected]: (state) => {
			state.loading = 'error';
		},
		[getCategories.pending]: (state) => {
			state.loading = 'loading';
		},
		[getCategories.fulfilled]: (state, action) => {
			state.loading = 'completed';
			state.categories = action.payload.results;
		},
		[getCategories.rejected]: (state) => {
			state.loading = 'error';
		},
		[getSpecialPokemon.pending]: (state) => {
			state.loading = 'loading';
		},
		[getSpecialPokemon.fulfilled]: (state, action) => {
			state.loading = 'completed';
			state.specialPokemon = [action.payload];
		},
		[getSpecialPokemon.rejected]: (state) => {
			state.loading = 'error';
		},

	},
	reducers: {
		updatePokemon: (state) => {
			state.specialPokemon = [];
		},
		setPokemonArray: (state, action) => {
			state.pokemonArray.push(action.payload);
		},
		removePokemonArray: (state) => {
			state.pokemonArray = [];
		},
		setType: (state, action) => {
			state.type = action.payload;
		},
		setModal: (state, action) => {
			state.show = action.payload;
		},
		removeType: (state) => {
			state.type = null;
		},
		removeSpecialPokemon: (state) => {
			state.specialPokemon = [];
		}
	}
});
export default pokemonSlice.reducer;
export const {
	updatePokemon,
	setType,
	removeType,
	setModal,
	setPokemonArray,
	removePokemonArray,
	removeSpecialPokemon
} = pokemonSlice.actions;