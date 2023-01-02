import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cartItems } = useSelector((state: RootState) => state.cartItems);

  const totalNumItems = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity!;
  }, 0);

  const totalPrice = cartItems
    .map((cartItem) => {
      return cartItem.productInfo.fields.price * cartItem.quantity!;
    })
    .reduce((acc, price) => {
      return acc + price;
    }, 0);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-cart">
        <FaShoppingCart />
        <span className="items-length">Items: {totalNumItems}</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end" name="cart">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length > 0 ? (
            <div className="cart-items-info">
              <ul>
                {cartItems.map((cartItem) => {
                  return (
                    <CartItem
                      key={cartItem.productInfo.id}
                      cartItem={cartItem}
                    />
                  );
                })}
              </ul>
              <div className="total-info">
                <h6>Total</h6>
                <h6>${totalPrice}</h6>
              </div>
            </div>
          ) : (
            <h6>Nothing in your cart!</h6>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
