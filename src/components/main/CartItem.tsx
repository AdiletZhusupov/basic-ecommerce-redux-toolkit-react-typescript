import { ICartFurniture, IFurnitureItem } from "../../types/types";
import { removeFurnitureItem } from "../../store/reducers/cartSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

type CartItemProps = {
  cartItem: ICartFurniture;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClickRemove = (furnitureItem: IFurnitureItem) => {
    dispatch(removeFurnitureItem(furnitureItem));
  };

  return (
    <li key={cartItem.productInfo.id} className="cart-item-wrapper">
      <div className="cart-item-imageBox">
        <img
          className="cart-item-image"
          src={cartItem.productInfo.fields.image[0].url}
          alt={cartItem.productInfo.fields.name}
        />
      </div>
      <div className="cart-item-infoBox">
        <div className="cart-item-info-top">
          <h6>{cartItem.productInfo.fields.name}</h6>
          <h6>${cartItem.productInfo.fields.price}</h6>
        </div>
        <div className="cart-item-info-bottom">
          <h6 className="cartItem-quantity">{cartItem.quantity}</h6>
          <button
            className="btn"
            onClick={() => handleClickRemove(cartItem.productInfo)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
