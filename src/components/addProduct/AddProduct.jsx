import React, { useEffect, useState } from "react";
import "./AddProduct.scss";
import Specification from "../specification/Specification";
import AddImages from "../images/AddImages";
import axios from "axios";
import Size from "./../sizeAndColor/Size";
import Color from "./../sizeAndColor/Color";

export default function AddProduct() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryType, setSubCategoryType] = useState([]);
  const [brand, setBrand] = useState([]);

  const [productSave, setProductSave] = useState({
    productName: "",
    productDescription: "",
    purchasePrice: "",
    salePrice: "",
    discountValue: "",
    totalQuantity: "",
    vendorId: 1,
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    subCategoryTypeId: "",
    colorName: "",
    size: "",
    productSpecification: "",
    files: "",
  });

  const [imageList, setImageList] = useState();
  const [specList, setSpecList] = useState();
  const [sizeList, setSizeList] = useState();
  const [colorList, setColorList] = useState();

  const handleChange = (event) => {
    setProductSave({ ...productSave, [event.target.name]: event.target.value });
  };

  const [loadingClass, setLoadingClass] = useState("notLoading");
  const [error, setError] = useState();
  const [heading, setHeading] = useState("Loading");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingClass("loading");
    console.log("productData  ", productSave);
    var postdata = new FormData();
    postdata.append("productName", productSave.productName);
    postdata.append("productDescription", productSave.productDescription);
    postdata.append("purchasePrice", productSave.purchasePrice);
    postdata.append("salePrice", productSave.salePrice);
    postdata.append("discountValue", productSave.discountValue);
    postdata.append("totalQuantity", productSave.totalQuantity);
    postdata.append("vendorId", productSave.vendorId);
    postdata.append("brandId", productSave.brandId);
    postdata.append("categoryId", productSave.categoryId);
    postdata.append("subcategoryId", productSave.subcategoryId);
    postdata.append("subCategoryTypeId", productSave.subCategoryTypeId);
    // postdata.append("colorName", productSave.colorName);
    // postdata.append("size", productSave.size);

    imageList.forEach((files) => {
      postdata.append("files", files.value);
    });
    specList.forEach((spec) => {
      postdata.append("productSpecification", spec.value);
    });

    colorList.forEach((color) => {
      postdata.append("colorName", color.value);
    });

    sizeList.forEach((size) => {
      postdata.append("size", size.value);
    });

    try {
      const res = await axios.post(
        `https://saptasoch.herokuapp.com/product`,
        postdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              "progress ",
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100),
              "%"
            );
          },
        }
      );
      setLoadingClass("notLoading");
      console.log(res.data);

      alert("Product Saved Successfully");
    } catch (e) {
      setError(e.message);
      setHeading("Error");
      console.log(e);
    }
  }
  const handleImageCallBack = (image) => {
    setImageList(image);
  };

  const handleSpecCallBack = (spec) => {
    setSpecList(spec);
  };

  const handleColorCallBack = (color) => {
    setColorList(color);
  };
  const handleSizeCallBack = (size) => {
    setSizeList(size);
  };

  useEffect(() => {
    async function category() {
      const cat = await axios.get(`https://saptasoch.herokuapp.com/category`);
      setCategory(cat.data);
    }
    category();

    async function brand() {
      const brand = await axios.get(
        `https://saptasoch.herokuapp.com/productBrand`
      );
      setBrand(brand.data);
    }
    brand();
  }, []);

  function handleCategoryChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    const catId = event.target.options[selectedIndex].getAttribute("data-key");
    setProductSave({ ...productSave, [event.target.name]: catId });

    const magic = category.filter((x) => x.categoryId === parseInt(catId));
    setSubCategory(magic[0].subCategoryList);
  }

  function handleSubCategoryChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    let subCatId = event.target.options[selectedIndex].getAttribute("data-key");
    setProductSave({ ...productSave, [event.target.name]: subCatId });

    const magic = subCategory.filter((x) => x.subCategoryId === parseInt(subCatId));
    setSubCategoryType(magic[0].subCategoryTypeList);
  }

  function handleSubCategoryTypeChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    let subCatTypeId = event.target.options[selectedIndex].getAttribute(
      "data-key"
    );
    setProductSave({ ...productSave, [event.target.name]: subCatTypeId });
  }

  function handleBrandChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    let brandId = event.target.options[selectedIndex].getAttribute("data-key");
    setProductSave({ ...productSave, [event.target.name]: brandId });
  }

  return (
    <React.Fragment>
      <div className={loadingClass}>
        <h1>{heading}....</h1>
        <p>{error}</p>
      </div>
      <div className="addProduct">
        <span className="addProduct-heading">New Product</span>
        <div className="addProduct-grid">
          <div className="addProduct-grid-item i1">
            <span className="i1-heading">General Informations</span>
            <span className="i1-heading-border"></span>

            <label for="fname">Product Name</label>
            <input
              className="product-description"
              type="text"
              name="productName"
              value={productSave.productName}
              onChange={handleChange}
              required
              placeholder="Product Name.."
            />
            <span className="i1-heading-border"></span>

            <label for="lname">Product Description</label>
            <input
              className="product-description product-description-des"
              type="text"
              name="productDescription"
              value={productSave.productDescription}
              onChange={handleChange}
              required
              placeholder="Product Description.."
            />
            <span className="i1-heading-border"></span>

            <div className="i1-detail">
              <div>
                <label for="lname">Purchase Price :</label>
                <input
                  className="product-price"
                  type="text"
                  name="purchasePrice"
                  value={productSave.purchasePrice}
                  onChange={handleChange}
                  placeholder="RS.."
                  required
                />
                <span className="i1-heading-border"></span>
              </div>
              <div>
                <label for="lname">Sale Price :</label>
                <input
                  className="product-price"
                  type="text"
                  name="salePrice"
                  value={productSave.salePrice}
                  onChange={handleChange}
                  placeholder="Rs.."
                  required
                />
                <span className="i1-heading-border"></span>
              </div>
              <div>
                <label for="lname">Discound Price :</label>
                <input
                  className="product-price"
                  type="text"
                  name="discountValue"
                  value={productSave.discountValue}
                  onChange={handleChange}
                  placeholder="Rs.."
                  required
                />
                <span className="i1-heading-border"></span>
              </div>
              <div>
                <label for="lname">Total Quantity :</label>
                <input
                  className="product-price"
                  type="text"
                  name="totalQuantity"
                  value={productSave.totalQuantity}
                  onChange={handleChange}
                  placeholder="Total Quantity.."
                  required
                />
                <span className="i1-heading-border"></span>
              </div>
            </div>
          </div>
          <div className="addProduct-grid-item i2">
            <span className="i1-heading">Organize Product</span>
            <span className="i1-heading-border"></span>

            <span className="select-heading">Select Category</span>
            <select
              className="select-option"
              name="categoryId"
              onChange={(event) => handleCategoryChange(event)}
              required
            >
              <option value="0">Select category</option>
              {category.map((val) => {
                return (
                  <option key={val.categoryId} data-key={val.categoryId}>
                    {val.categoryName}
                  </option>
                );
              })}
            </select>
            <span className="i1-heading-border"></span>

            <span className="select-heading">Select SubCategory</span>
            <select
              className="select-option"
              name="subcategoryId"
              onChange={(event) => handleSubCategoryChange(event)}
              required
            >
              <option value="0">Select SubCategory</option>
              {subCategory.map((val) => {
                return (
                  <option key={val.subCategoryId} data-key={val.subCategoryId}>
                    {val.subCategoryName}
                  </option>
                );
              })}
            </select>
            <span className="i1-heading-border"></span>

            <span className="select-heading">Select SubCategory Type</span>
            <select
              className="select-option"
              name="subCategoryTypeId"
              onChange={(event) => handleSubCategoryTypeChange(event)}
              required
            >
              <option value="0">Select SubCategory Type</option>
              {subCategoryType.map((val) => {
                return (
                  <option
                    key={val.subCategoryTypeId}
                    data-key={val.subCategoryTypeId}
                  >
                    {val.subCategoryTypeName}
                  </option>
                );
              })}
            </select>
            <span className="i1-heading-border"></span>

            <span className="select-heading">Select Brand</span>
            <select
              className="select-option"
              name="brandId"
              onChange={(event) => handleBrandChange(event)}
              required
            >
              <option value="0">Select Brand</option>
              {brand.map((val) => {
                return (
                  <option key={val.brandId} data-key={val.brandId}>
                    {val.brandName}
                  </option>
                );
              })}
            </select>
            <span className="i1-heading-border"></span>
          </div>
          <div className="addProduct-grid-item i2 product-sizeAndColor">
            <div className="product-sizeAndColor-item">
              <Size sizeCallBack={handleSizeCallBack} />
            </div>
            <div className="product-sizeAndColor-item">
              <Color colorCallBack={handleColorCallBack} />
            </div>
          </div>

          <div className="addProduct-grid-item i4">
            <AddImages imageCallBack={handleImageCallBack} />
          </div>
          <div className="addProduct-grid-item i3">
            <Specification specCallBack={handleSpecCallBack} />
          </div>
        </div>
        <button type="submit" className="button" onClick={handleSubmit}>
          Save Product
        </button>
      </div>
    </React.Fragment>
  );
}
