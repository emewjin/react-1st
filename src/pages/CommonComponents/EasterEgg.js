import React, { Component } from 'react';
import './EasterEgg.scss';

export default class EasterEgg extends Component {
  render() {
    return (
      <div className="easterEgg">
        <header className="easterEggHeader">Special Thanks To</header>
        <p className="thanksPeople">⭐황갓연욱⭐</p>
        <p className="thanksPeople">⭐홍갓연우⭐</p>
      </div>
    );
  }
}
