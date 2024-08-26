import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative bg-slate-800 rounded-lg mb-10 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2">
       
          <h2 className="flex justify-between items-center">
            <div className="text-[20px] capitalize">{product.name}</div>
            <span className="bg-red-500 text-white text-sm font-bold  mr-2 px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
      </div>
      <div className="flex justify-center mt-2">
       <Link to={`/product/${product._id}`}>
       <h1 className="bg-pink-600 text-center w-full py-1 px-2 rounded-md hover:bg-pink-800 transition-colors ">Show Product</h1>
        </Link>
        </div>
    </div>
  );
};

export default Product;
