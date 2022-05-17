import React from 'react';
import './Pagionations.css';


function Paginations({pokemonsPerPage, totalPokemons, paginate}) {

	const pageNumbers = [];

	for(let i=1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++){
		pageNumbers.push(i)
	}
	
	

  return (
	<div className='pagination'>

			{
				pageNumbers.map(num => (
					<button className='pagination-btn' key={num} onClick={() => paginate(num)}>
						{num}
					</button>
				))
			}





	</div>
  )
}

export default Paginations;