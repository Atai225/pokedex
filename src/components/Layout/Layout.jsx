import Toolbar from './Toolbar/Toolbar'
import './Layout.css';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getPokemons, getAPokemon, getCategories } from '../../store/reducers/pokemon.reducer';




function Layout(props) {
  const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getPokemons()).then((res) => {
      dispatch(getAPokemon(res.payload.results));
      dispatch(getCategories());
  })
 }, []);
 
  return (
    <>
        <Toolbar/>
        <main className="main-wrapper">
            {props.children}
        </main>
    </>
  )
}



export default Layout;
  