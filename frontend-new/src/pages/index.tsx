import React, { useEffect, useState } from "react"
import MainNavbar from "../components/MainNavbar/MainNavbar"
import axios from "axios"
import { Link } from 'gatsby'
import { FaCircle } from 'react-icons/fa'

interface Pro {
  id: number;
  fullname: string;
  location_from: string;
  profession: string;
  slug: string;
  image_name: string;
}

const IndexPage = () => {

  const [pros, setPros] = useState<Pro[]>([]);

  useEffect(() => {
    axios.post<Pro[]>(`${process.env.GATSBY_API_ENDPOINT}/get-all-pros`)
      .then(res => {
        setPros(res.data);
      })
  }, []);

  return (
    <div>
      <MainNavbar></MainNavbar>

      <div className="w-3/5 m-auto text-center my-5">
        {
          pros.length > 0 && pros.map((pro) => (
            <Link to={`/professionals?id=${pro.id}`} className="m-3 w-1/4 inline-block bg-center bg-no-repeat bg-cover h-64 relative" style={{ backgroundImage: `url(${process.env.GATSBY_API_ENDPOINT}/images/${pro.image_name})` }}>
              <div className="w-full h-1/5 bg-black bg-opacity-60 absolute bottom-0 flex items-center justify-between px-3">
                <p className="text-white">{pro.fullname}</p>
                <FaCircle className="text-green-500 text-xs" />
              </div>
            </Link>

          ))
        }
      </div>
    </div>
  )
}

export default IndexPage
