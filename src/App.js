import React,{useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import dataContext from './Components/Context'



import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Admin from './Components/Admin';


import Products from './Components/Products';  



function App() {

  const [addToCart,setAddToCart] = useState([])

  const [products,setProducts] = useState(Products)

  const [updatedProducts,setUpdatedProducts] = useState(products)

  const values = {
    products,
    setProducts,
    
    addToCart,
    setAddToCart,

    updatedProducts,
    setUpdatedProducts
  }


  return (
    <div >
     
     <BrowserRouter>


     <dataContext.Provider value={values}>
       <Routes>
       
          <Route path='/' element={<SignUp />}/>
          <Route path='/LogIn' element={<LogIn />}/>
          <Route path='/Home' element={<Home />}/>
          <Route path='/Cart' element={<Cart />}/>
          <Route path='/Admin' element={<Admin />}/>
       </Routes>
     </dataContext.Provider>

     </BrowserRouter>
    </div>
  );
}

export default App;
