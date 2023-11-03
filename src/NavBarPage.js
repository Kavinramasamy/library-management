import React from 'react'
import { Link } from 'react-router-dom'

const NavBarPage = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light  px-3" style={{ backgroundColor: "purple" }}>
            <Link className="navbar-brand text-light px-3" to="/home">
                <h3>Dashboard</h3>
            </Link>
            <button
                className="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fa-solid fa-bars fa-xl text-light" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="btn text-light w-100 px-5" to="/BooksList">
                            Books page
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link className="btn text-light w-100 px-5" to="/outBooks">
                            Out books
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link className="btn text-light w-100 px-5" to="/addOutBooks">
                            Add Out books
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBarPage