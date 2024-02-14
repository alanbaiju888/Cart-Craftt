import React, { useContext, useState } from "react";
import { Link, json } from "react-router-dom";
import dataContext from "./Context";

function Admin() {
  const { products, setProducts } = useContext(dataContext);

  const { updatedProducts,setUpdatedProducts } = useContext(dataContext);

  const [showUsers, setShowUser] = useState([]);

  const [editedPrice, setEditedPrice] = useState("");
  const [editedRating, setEditedRating] = useState("");

  const [editIndex, setEditIndex] = useState(null);



  function handleSave(index){
    const updatedOnes = [...products];
    updatedOnes[index] = {
      ...updatedOnes[index],
      price: editedPrice,
      rating: editedRating,
    };

    alert("Saved Successfully")

    setProducts(updatedOnes);
    
    setEditIndex(null);

setUpdatedProducts(updatedOnes)
   
  }

  function handleEdit(index){
    setEditIndex(index);
    setEditedPrice(products[index].price)
    setEditedRating(products[index].rating)
  }

  function handleDelete(index) {
    const updatedOnes = [...products];
    updatedOnes.splice(index, 1); // Remove the product at the specified index
  
    alert("Product Deleted Successfully");
  
    setProducts(updatedOnes);
    setUpdatedProducts(updatedOnes);
  
    // Reset editIndex to null if the deleted item is the one being edited
    if (editIndex === index) {
      setEditIndex(null);
    }
  }

  return (
    <div>
      
      <h1 className="text-center mt-3 ">Admin Page</h1>
        <Link to="/Home" className="fs-4 d-flex justify-content-end my-3 me-3">
        <span style={{fontSize:"28px"}} className="bi bi-house-fill text-dark"></span>
        </Link>
       <br />

     

      <div className="cards">
        {products.map((item, index) => (
          <div key={index} className="Productcard">
            {
              editIndex === index ?(
                <div className="edit_window">

                  <label>
                  Price : 
                  <input type="text" 
                  placeholder="Enter Amount"
                  value={editedPrice}
                  onChange={(e)=>setEditedPrice(e.target.value)}/>
                  </label>

                  <label>
                  Rating : 
                  <input type="text" 
                  id="secondInp"
                  placeholder="New Rating"
                  value={editedRating}
                  onChange={(e)=>setEditedRating(e.target.value)}/>
                  </label>

                <div className="saveCancel">

                <button onClick={()=>handleSave(index)} className="btn btn-success "> Save</button>

                <button onClick={()=>handleSave(null)} className="btn btn-danger "> Cancel</button>

                </div>
                </div>
              ) : (
                <>
                <div className="cardImg">
              <img src={item.img} alt={item.name} />
            </div>
            <p id="name">{item.name}</p>

            <div className="details">
              <div className="priceRating">
                <p>₹ {item.price}</p>
                <p>
                  <span className="bi bi-star-fill text-warning"></span>
                  {item.rating}
                </p>
              </div>

              <div className="extraOption text-center">
                <button onClick={()=>handleEdit(index)} className="btn btn-secondary me-3 mb-3"> Edit</button>

                 <button  onClick={() => handleDelete(index)} className="btn btn-info me-3 mb-3">
    Delete
  </button>

              </div>
            </div>
          </>
              )
            } 
          </div>
        ))}
      </div>


    </div>
  );
}

export default Admin;
