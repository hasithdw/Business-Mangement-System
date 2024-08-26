import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-[20px] capitalize">{product.name}</div>
            <span className="bg-pink-600 text-white text-sm font-bold  mr-2 px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
