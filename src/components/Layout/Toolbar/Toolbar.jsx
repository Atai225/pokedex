import React from 'react'
import Logo from '../Logo/Logo'
import styles from './Toolbar.module.css';

function Toolbar() {
  return (
	<header className={styles.header}>
			
			<Logo/>

	</header>
  )
}

export default Toolbar