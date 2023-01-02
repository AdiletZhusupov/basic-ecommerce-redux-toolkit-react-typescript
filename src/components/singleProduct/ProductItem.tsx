import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../main/Loader";
import { fetchSingleFurnitureItem } from "../../store/reducers/furnitureSlice";
import { addFurnitureItem } from "../../store/reducers/cartSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Cart } from "../main/Cart";
import { IFurnitureItem } from "../../types/types";

export const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { singleFurniture, error, isLoading } = useSelector(
    (state: RootState) => state.furnitureItems
  );

  const handleClickAdd = (furnitureItem: IFurnitureItem) => {
    dispatch(addFurnitureItem(furnitureItem));
  };

  useEffect(() => {
    dispatch(fetchSingleFurnitureItem(id!));
  }, []);

  if (error) {
    return (
      <div className="title">
        <h2>{error}</h2>
        <div className="title-underline"></div>
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Link to="/" className="btn home-link">
        back home
      </Link>
      <section className="productItem">
        <div className="productItem-wrapper">
          <img
            src={singleFurniture?.fields.image[0].url}
            className="img"
            alt={singleFurniture?.fields.name}
          />
          <div className="productItem-info">
            <h3>{singleFurniture?.fields.name}</h3>
            <h5>{singleFurniture?.fields.company}</h5>
            <span>${singleFurniture?.fields.price}</span>
            <div className="colors">
              <span
                className="productItem-color"
                style={{ background: "#f15025" }}
              ></span>
              <span
                className="productItem-color"
                style={{ background: "#222" }}
              ></span>
            </div>
            <p>{singleFurniture?.fields.description}</p>
            <button
              className="btn"
              style={{ marginRight: "5px" }}
              onClick={() => handleClickAdd(singleFurniture!)}
            >
              add to cart
            </button>
            <Cart />
          </div>
        </div>
      </section>
    </>
  );
};
