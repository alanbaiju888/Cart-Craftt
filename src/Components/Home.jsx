import React, { useContext, useState } from "react";
import NavHead from "./NavHead";
import Products from "./Products";
import dataContext from "./Context";
import { Footer } from "./Footer";


function Home() {
  const { addToCart, setAddToCart } = useContext(dataContext);

  const {updatedProducts, setUpdatedProducts} = useContext(dataContext)

 
  const [search, setSearch] = useState("");

  // categorizing and searching

  const filtering = (category) => {
    const filteredProducts = Products.filter((item) => {
      return item.category.toLowerCase() === category.toLowerCase();
    });

    setUpdatedProducts(filteredProducts);
  };

  function searchedProduct(e) {
    e.preventDefault();

    try {
      if (search) {
        const result = Products.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        });

        setUpdatedProducts(result);
        setSearch("");
      } else {
        alert("No Product Found");
        setSearch("");
      }
    } catch (error) {
      console.log("error occurred" + error);
    }
  }

  // Add to cart

  function toCart(index) {
    const cartProduct = updatedProducts.find((item) => {
      return item.id === index;
    });

    setAddToCart((prev) => [...prev, cartProduct]);
  }

  return (
    <>
    <div className="homeContainer">
      <NavHead />

      <p className="cartCount"> {addToCart.length}</p>

      <div className="intro">
        <img
          id="poh"
          className="w-25  "
          src="https://www.shutterstock.com/image-vector/cute-little-boy-push-shopping-600nw-2096482798.jpg "
        />

        <img
          id="hop"
          className="w-25  "
          src="https://media.istockphoto.com/id/1383919547/vector/gold-coins-were-lined-up-in-a-red-shopping-basket-and-the-receipt-paper-flow-out-and-all.jpg?s=612x612&w=0&k=20&c=2XC-QNGYrdZRzMO4aRmUyFSPqOMBrIznttx_J4VrHJY="
        />

        <img
          id="pho"
          className="w-25  "
          src="https://thumbs.dreamstime.com/b/shopping-cart-filled-christmas-gifts-isolated-white-background-60134333.jpg"
        />
      </div>

      <div className="secondNav">
        <div className="btnGroup">

          <button
            onClick={() => setUpdatedProducts(Products)}
            className="btn btn-outline-secondary"
          >
            All
          </button>

          <button
            onClick={() => filtering("Mobile")}
            className="btn btn-outline-dark"
          >
            Mobile
          </button>

          <button
            onClick={() => filtering("laptop")}
            className="btn btn-outline-dark"
          >
            Laptop
          </button>

          <button
            onClick={() => filtering("Headphone")}
            className="btn btn-outline-dark"
          >
            Headphone
          </button>

          <button
            onClick={() => filtering("Others")}
            className="btn btn-outline-dark"
          >
            Others
          </button>
        </div>

        <form
          className="SearchBar text-center"
          autoComplete="off"
          onSubmit={(e) => searchedProduct(e)}
        >
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="btn btn-dark">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>

      <div className="cards">
        {updatedProducts.map((item, index) => (
          <div key={index} className="Productcard">
            <div className="cardImg">
              <img src={item.img} alt={item.name} />
            </div>
            <p id="name">{item.name}</p>



            <div className="details">
              <div className="priceRating">
                <p>₹ {item.price}</p>
                <p>
                  <span className="bi bi-star-fill text-warning me-1"></span>
                  {item.rating}
                </p>
              </div>
              <div className="btn-options">
                <button
                  className="btn btn-outline-dark fs-5"
                  onClick={() => toCart(item.id)}
                >
                  Add To <span className="bi bi-cart-plus-fill"></span>
                </button>


                <button
                  className=" fs-5 buy"
                >
                  Buy Now <span className="bi bi-bag-fill"></span>
                </button>
              </div>
            </div>



          </div>
        ))}
      </div>
   
    </div>
     <Footer/>
     </>
    
  );
}


export default Home;

