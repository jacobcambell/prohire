import React from 'react'
import { Link } from 'gatsby'

export default function MainNavbar() {
    return (
        <div>
            <div className="bg-black py-3 px-5">
                <Link to="/" className="text-white text-xl">ProHire</Link>
            </div>
        </div>
    )
}
