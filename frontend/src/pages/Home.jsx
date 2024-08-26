import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import hero from "../assets/01.webp";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center flex-col">
            <div
              className="relative w-[99%] h-[70vh] "
              style={{ backgroundImage: `url(${hero})` }}
            >
              <div className="absolute inset-0  flex-col flex mt-56 items-center">
                <h3 className="text-black uppercase text-[28px] font-bold">
                  Summer 2024
                </h3>
                <h3 className="text-black uppercase text-[45px] font-bold">
                  Discover Our Latest Frock
                </h3>
                <h3 className="text-black uppercase text-[45px] font-bold">
                  Collection
                </h3>
                <Link
                  to="/shop"
                  className="bg-transparent font-bold text-red-600 uppercase  py-1 px-4 mt-3 border border-[3px] border-red-600 hover:text-white hover:bg-red-600 transition-colors "
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <h1 className="text-[35px] font-semibold mt-3 capitalize">
              New Arrivals Section
            </h1>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
