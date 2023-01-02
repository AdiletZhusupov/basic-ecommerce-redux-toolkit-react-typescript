import { Link } from "react-router-dom";
import { IFurnitureItem } from "../../types/types";
interface FurnitureItemProps {
  furniture: IFurnitureItem;
}

export const FurnitureItem = ({ furniture }: FurnitureItemProps) => {
  return (
    <Link to={`/product/${furniture.id}`} className="product">
      <img
        src={furniture.fields.image[0].url}
        alt={furniture.fields.name}
        className="product-img img"
      />
      <footer>
        <h5 className="product-name">{furniture.fields.name}</h5>
        <span className="product-price">${furniture.fields.price}</span>
      </footer>
    </Link>
  );
};
