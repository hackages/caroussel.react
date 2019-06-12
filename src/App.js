import React, {Component} from 'react';
import './tesla-style.scss';
import logo from './assets/logo.svg';
import {TeslaBattery} from './tesla-battery/TeslaBattery';

export const App = () => {
  return (
    <div>
      <header className="header">
        <img src="logo" />
      </header>
      <div className="wrapper">
        <TeslaBattery />
      </div>
    </div>
  );
};
