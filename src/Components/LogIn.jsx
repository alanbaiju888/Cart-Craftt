import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {


  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
 const newLocation = useNavigate();  //navigation

//  email and pass for admin

  const admin = {
    email : "alan@gmail.com",
    pass : "Admin777"
  }

 
  const login = async (reload) => {
    reload.preventDefault();


    try {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
      const loggedUser = storedUserData.find(
        (data) => data.email === email && data.pass === pass
      );

      if (loggedUser) {
        newLocation("/Home");

        const logValue = {
          email,
          pass,
        };
      
        localStorage.setItem("loggedData", JSON.stringify([logValue]));
      } 
      
      else if(admin.email === email && admin.pass === pass) {
        newLocation('/Admin')
      }
      else {
        alert("Wrong Email Or Password");
        setEmail("");
        setPass("");
      }
    }

    catch (error) {
      console.error("Error parsing JSON from local storage:", error);
      // Handle the error gracefully, maybe show a user-friendly error message
      alert("An unexpected error occurred. Please try again.");
    }

  };

  //  password show and hide 

  function passworsVisibility(){
    setPasswordVisible((prevVisibility) => !prevVisibility);
  }

  return (
    <div className="loginContainer">

   
      <div className="logIn">
        <h2 id="hl">Log In</h2>
        <form onSubmit={login} autoComplete="off">
          <label htmlFor="loginEmail" id="em">Email </label>
          <input className="input-2"
            type="email"
            id="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="loginPass" id="lo">Password </label>
          <input className="input-2"
            type={passwordVisible ?  'text' : 'password'}
            id="loginPass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          {
            pass ? (
              <span 
              className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"} loginShowPass`} 
              onClick={passworsVisibility}></span>
            ) : null
          }
          <br />
         
          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
        </form>
        <p className="mt-3" id="ac">
          Dont Have An Account? <Link to="/" id="toSignUp">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
