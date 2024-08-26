import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create fail. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="  flex justify-center pl-[4rem]">
      <div className="p-4 bg-slate-800 rounded-md">
        <AdminMenu />
        <div className=" flex w-full flex-col justify-center items-center">
          <div className="text-4xl text-center mb-5">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] "
              />
            </div>
          )}

          <div className="mb-3 mt-10">
            <label className="border text-white justify-center px-48 py-3 rounded-md hover:bg-slate-700">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3 flex flex-col justify-center items-center">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="text"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="text"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor=""  className="mt-3 -mb-2">
              Description
            </label>
            <br/>
            <textarea
              type="text"
              className="p-2  mb-3 w-full h-[80px] border rounded-md bg-[#101011] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="ml-10">
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-2  my-3 w-[30rem] border rounded-md bg-[#101011] text-white"
                  onChange={(e) => {console.log(e.target.value);}}
                  required
                >
                  <option>---</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="p-3 mt-8 w-60 rounded-lg text-lg font-bold bg-pink-600 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
