import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchPage() {
// route the id of the item clicked into the main page, passing the ride id as a parameter

    return (
        <div className="search-page">
            {/* two components, ride list and input fields */}
            <h1>
                search page
            </h1>
            <Link to="/main">
                back
            </Link>
        </div>
    )
}