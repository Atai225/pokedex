import React from 'react'
import { NavLink } from 'react-router-dom'
import './Logo.css'
import img from './pokeap.png'

function Logo() {
  return (
	<div className='logo'>
		<a to='/'><img className='logo__img' src={img} alt="" /></a>
	</div>
  )
}

export default Logo