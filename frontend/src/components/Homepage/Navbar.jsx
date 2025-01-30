// src/Navbar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("/api/profileImage", { responseType: "blob" })
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: response.headers["content-type"] });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  const gotoProfile = () => {
    navigate("/profile_page");
  };

  const goto_homepage = () => [navigate("/homepage")];

  return (
    <nav className="flex justify-between items-center p-4 border-b ">
      {/* Left section with logo and links */}
      <div className="flex items-center space-x-8">
        <img src={logo} alt="Upwork logo" className="h-10 pl-3" />
        <div onClick={goto_homepage} className="text-xl tracking-tight mr-4 cursor-pointer">
          Freelancia
        </div>
        <ul className="flex space-x-6  text-white-700">
          <li className="hover:text-orange-600 cursor-pointer tracking-tight">Find work</li>

          <li className="hover:text-orange-600 cursor-pointer">Deliver work</li>
          <li className="hover:text-orange-600 cursor-pointer">Manage finances</li>
          <li className="hover:text-orange-600 cursor-pointer">Messages</li>
        </ul>
      </div>

      {/* Right section with search, dropdown, and icons */}
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400  text-black" />
        <select className="border p-2 rounded-lg focus:outline-none text-black">
          <option value="Jobs">Jobs</option>
          <option value="Freelancers">Freelancers</option>
        </select>
        <div className="flex items-center space-x-4">
          <span className="text-xl cursor-pointer">🔔</span>
          <span className="text-xl cursor-pointer">🔲</span>
          <img
            src={image}
            alt="User profile"
            className="w-10 h-10 rounded-full cursor-pointer" onClick={gotoProfile}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
