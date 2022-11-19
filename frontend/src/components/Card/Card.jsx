import React from 'react'
import PropTypes from 'prop-types';
import './card.css';

const CardComp = ({ children, className, link, details, description, title, onClick, icon, style, ...props}) => {
  return (
    <div onClick={onClick} id={props.id} className={`__card__ ${className ? className : ''}`} style={{...style}}>
        {children}
    </div>
  )
}

CardComp.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default CardComp;