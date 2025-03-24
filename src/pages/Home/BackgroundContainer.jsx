import React from 'react';

export default function BackgroundContainer({index, pref}){
    const source = `/${index+1}.jpg`;
    return (
        <div className="background-container">
          <img ref={pref} src={source} alt={source.toString()} />
        </div>
      );    
}