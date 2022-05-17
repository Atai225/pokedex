import React from 'react'
import { useSelector } from 'react-redux';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

function Modal({children, close}) {
  const show = useSelector(store=>store.pokemons.show)
  return (
    <>
      <Backdrop show={show} close={close} />
     <div onClick={(e) => e.stopPropagation()} className={`modalwindow${show ? " on" : ""}`}>
          {children}
     </div>
    </>
  );
}

export default Modal
