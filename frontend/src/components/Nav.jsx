import React from 'react'
import '../styles/Nav.css'

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav_items">Home</div>
            <div className="nav_items">Stats</div>
            <div className="nav_items">Gallery</div>
            <div className="nav_items nav_btn">Login</div>
            <div className="nav_items nav_btn">Signin</div>
        </div>
    )
}

export default Nav