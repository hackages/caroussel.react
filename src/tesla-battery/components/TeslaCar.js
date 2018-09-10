import React from 'react';

export const TeslaCar = ({wheels, speed}) => {
    return (
      <div className="tesla-car">
        <div className="tesla-wheels">
          <div className={`tesla-wheel tesla-wheel--front tesla-wheel--${wheels}--${speed}`}/>
          <div className={`tesla-wheel tesla-wheel--rear tesla-wheel--${wheels}--${speed}`}/>
        </div>
      </div>
    );
}
