import React from 'react'
import { Link } from 'gatsby'
import { FaComments } from 'react-icons/fa'

export default function MainNavbar() {
    return (
        <div className="bg-black py-3 px-10 flex justify-between items-center">
            <Link to="/" className="text-white text-xl">ProHire</Link>
            <button className="border border-saffron text-saffron p-2">Chat Now <FaComments className="inline"></FaComments></button>
        </div>
    )
}
