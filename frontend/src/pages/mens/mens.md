  <button
                  className="px-5 p-2 bg-green-800 text-white hover:bg-green-700 transition-all font-semibold"
                  onClick={() => 
                  { dispatch(addToCart(item)) ; navigate(`/product/${item._id}`)}
                   
                   
                  }
                >
                  Add To Cart
                </button>