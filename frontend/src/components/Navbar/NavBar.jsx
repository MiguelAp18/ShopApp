/* eslint-disable no-unused-vars */
import {Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const NavBar = () => {

    const [title, setTitle] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setTitle(e.target.value)  
        navigate('/items-filtered')
    }
    
    const handleOnClick = (e) => {
        e.preventDefault();
        
        setSearchParams({ title: title })
        setTitle("")
    }
    
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Shop App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/items">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/item-form">Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/item-form">Pricing</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input name='title' value={title} onChange={handleInputChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button onClick={handleOnClick} className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
        
    )
}



export default NavBar;



// const handleInputChange = (e) => {
//     setTitle({ ...title, [e.target.name]: e.target.value })   
// }