import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/ProductSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto px-10">
      <div className="text-center" style={{ marginTop: "100px" }}>
        Cart
      </div>
      Cart length : {cart.length}

      {cart.map((item) => <div className="grid grid-col gap-4 mt-5 text-center">

           
           <div className="bg-white shadow-sm  p-4 transition border border-gray-400">
              <p>{item.name}</p>
        <p>{item.price}</p>
        <p>
          Quantity :{item.quantity}</p>

          <button className="px-2 mt-2 py-1 w-30 bg-red-400 font-semibold" onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
           </div>


      
      </div>)}
    </div>
  );
};

export default Cart;
