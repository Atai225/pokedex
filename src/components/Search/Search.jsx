// import React from 'react';

// function Search() {

//   return (
// 	<form className="search" onSubmit={(e) => submitHandler(e)}>
//           <input
//             type="text"
//             placeholder="Поиск покемона..."
//             value={text}
//             className="search__input"
//             onChange={(e) => changeHandler(e)}
//           />
//           <ul className="autocomplete">
//                 {isOpen &&
//                   filteredPoke.map((pok, index) => (
//                     <li key={index} onClick={(e) => setSpecial(e)} className="autocomplete__item"><img src={pok.sprites.front_default} alt="" /><span>{pok.name}</span></li>
//                   ))
//                 }
//           </ul>

//           {event.value === "" ? (
//             <button disabled className="search__btn disabled">
//               Поиск
//             </button>
//           ) : (
//             <button className="search__btn">Поиск</button>
//           )}
//         </form>
//   )
// }

// export default Search