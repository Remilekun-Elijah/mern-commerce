import React from 'react'
import PropTypes from 'prop-types';
import './card.css';

const NewsCardComp = ({ children, className, details, date, time, icon, style, ...props}) => {
  return (
    <div id={props.id} className={` ${className ? className : ''}`} style={{...style}}>
        <div className='text-start mb-4'>
            <div className="__card__header_bg">
            </div>
            <p className="description mt-7 ml-3 text-[15px]  text-[#333333]">{details} </p>
            <div className="flex mb-3">
            <span className="icon__ ml-3 text-[#7A7E80] w-[3%] h-[3%]">{icon}</span>
            <span className='flex ml-4 text-[#7A7E80] text-[14px] font-[400]'>{date}</span>
            <span className='flex ml-4 text-[#45742F] text-[14px] font-[400]'>{time}</span>
            </div>
        </div>
        {children}
    </div>
  )
}

NewsCardComp.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default NewsCardComp;