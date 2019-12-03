import React from 'react';
import './styles.css'

const Header = () => {
  return (
    <header id="main-header">
      <nav className="content">
        <h1>facebook</h1>
        <div>
          <a href="#">Meu perfil</a>
          <i className="material-icons">account_circle</i>
        </div>
      </nav>
    </header>
  )
}

export default Header;