import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { add, search } from "../Redux/slices/CartSlice";
import { IoMdClose } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { addproduct } from "../Redux/slices/CartSlice";

function Navbar() {
  const { cartItems, searchItem } = useSelector((state) => state.cart);
  const [showClose, setShowClose] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartDiv, setShowCartDiv] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [TotalAmount, setTotalAmount] = useState(0);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowCartDiv(false);
      setShowSearch(false);
      setShowClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotalAmount(cartItems.reduce((acc, curr) => acc + curr.price, 0));
    dispatch(addproduct(products));
  }, [dispatch, cartItems]);

  function Searchbar() {
    return (
      <label htmlFor="search" className="flex place-content-center">
        <input
          type="text"
          id="search"
          name="search"
          value={searchItem}
          required
          onChange={(e) => {
            dispatch(search(e.target.value));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          placeholder="Search Product"
          className="w-[16rem] sm:w-[24rem] py-1 px-3 rounded-md text-black  border-gray-100"
        />
        <Link
          to={`/Category/${searchItem}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex justify-end"
        >
          <IoSearch className="relative top-2 right-6 text-black font-semibold" />
        </Link>
      </label>
    )
  }

  return (
    <div className="w-full bg-zinc-900 text-white shadow-lg px-6 py-4">
      <div className="md:px-0 mx-auto flex justify-between items-center relative">
        {/* logo  */}
        <NavLink
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <p className="font-bold text-2xl md:text-3xl">Kharedi</p>
        </NavLink>
        {/* search bar  */}
        <div className="hidden md:flex items-center">
          {Searchbar()}
        </div>
        <div className="flex space-x-4">
          <div
            className={`md:px-0 md:w-full md:block hidden mx-auto justify-between gap-14 items-center py-2 md:top-0 text-white`}
          >
            <NavLink
              to="/Products"
              onClick={() => {
                dispatch(addproduct(products));
              }}
            >
              <p className="font-medium">Products</p>
            </NavLink>
          </div>
          <div className="flex gap-5 md:gap-5 items-center">
            <div className="relative flex gap-3 items-center">
              <div>
                <div ref={ref}>
                  <IoSearch
                    className="md:hidden block font-semibold text-xl"
                    onClick={() => {
                      setShowSearch(!showSearch);
                    }}
                  />
                </div>
              </div>

              <div className="group relative">
                <abbr title=" Cart ">
                  <NavLink
                    to={"/Cart"}
                  >
                    <div
                      className="w-[2rem] p-1 rounded-full transition-all duration-200"
                    >
                      <GiShoppingCart className="font-extrabold text-2xl" />
                      <div className="absolute bg-white text-black font-bold px-1.5 py-0.5 rounded-full text-[9px] md:text-xs md:-right-[10px] -right-[2px] md:-top-[4px] top-[0px] animate-bounce group-hover:bg-white group-hover:text-black">
                        {cartItems.length}
                      </div>
                    </div></NavLink>
                </abbr>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center md:hidden mt-4">
        {Searchbar()}
      </div>
    </div>
  );
}

export default Navbar;