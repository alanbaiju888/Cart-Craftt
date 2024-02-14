import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavHead() {

  const [input,setInput] = useState('')



  const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
  //registred user data

  const StoredLoggedData =  JSON.parse(localStorage.getItem("loggedData")) || [];

  //logged user data 

  const { email: currentEmail, pass: currentPass } = StoredLoggedData[0] || {};
  //destructuring

  
  const loggedUserName =  storedUserData.find(
    (data) => data.email === currentEmail && data.pass === currentPass
  );

      let userName = "";

  if (loggedUserName) {
    userName = loggedUserName.name;
    
  }
 


  const out = useNavigate();

  function logOut() {
    
    localStorage.setItem("loggedData", JSON.stringify({}));

    out("../LogIn");
  }


  return (
    <div className="navBar py-3 text-white">

      <ul className="d-flex align-items-center mt-2 fs-5">
        <li>
          <Link to="/Home" className="text-decoration-none text-white" title="Home">
            <span style={{fontSize:"28px"}} className="bi bi-house-fill text-dark"></span>
          </Link>
        </li>

        <li id="car">
          <Link to="/Cart" className="mx-3 text-decoration-none text-white " titlev = "Cart">
           <span style={{fontSize:"28px"}} className="bi bi-cart-fill text-dark"></span>
          </Link>
        </li>

      </ul>


    <div>
      <h3><i>CARTCRAFT</i></h3>
    </div>

        <div className=" user  d-flex me-4">

          <div className="border border-dark rounded-1 me-4 py-1 px-3 ">
            <img src="/Images/transparent.png" alt="Logged user" />
            <span className="text-capitalize"> {userName}</span>
          
           
          
          </div>

          <button onClick={logOut} className="btn btn-dark">
          <i class="bi bi-box-arrow-right"></i>
          </button>

        </div>

    

    </div>
  );
}

export default NavHead;
