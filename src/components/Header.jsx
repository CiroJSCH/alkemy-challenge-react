import React from 'react'

const Header = (props) => {
  return (
    <header>
        <nav>
            <ul>
                <li>Listado</li>
                <li>
                    <p>Favoritos</p>
                    <span>{props.favorites.length}</span>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header