import React from "react";
import "./tabControl.css";

const TabControl = ({
  tabs,
  current,
  setCurrent,
  wraperClass,
  tabClass,
  activeTabClass, cb
}) => {
  return (
    <div className={` tabControl flex flex-wrap gap-1 ${ wraperClass} `}>
      {tabs?.map((i, idx) => {
        return (
        <button
          key={idx}
          className={`tabControl__tab tabControlItem ${tabClass} ${
            current === i ? activeTabClass : "" 
          }`}
          onClick={() => {
            setCurrent(i)}
          }
        >
          {i}
        </button>
        
        )
        
})}
    </div>
  );
};

export default TabControl;