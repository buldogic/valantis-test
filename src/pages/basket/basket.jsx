import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./basket.module.css";
import { productAction } from "../../slices/state";
import { Spin } from "antd";
import { useState } from "react";

export const BasketPage = () => {
  const basket = useSelector((state) => state.state.basket);
  const isLoadingBasket = useSelector((state) => state.state.isLoadingBasket);
  const [valueBasket, setValueBasket] = useState(
    "в корзине отсутствуют товары"
  );
  const dispatch = useDispatch();

  const handleCklick = () => {
    dispatch(productAction.setBasketClear());
    dispatch(productAction.setLoading());
    setValueBasket("заказ оформлен");
    setTimeout(() => {
      dispatch(productAction.setLoading());
    }, 1000);
  };

  const totalCost = basket.reduce((total, item) => total + item.price, 0);

  return (
    <div className={style.container}>
      {isLoadingBasket ? (
        <Spin style={{ margin: 20 }} />
      ) : (
        <div>
          {basket.length === 0 ? (
            <div className={style.basketСontainerNull}>
              <h1>Ваша корзина</h1>

              <h5>{valueBasket}</h5>
              <div className={style.buttonContainerNull}>
                <Link to="/">
                  <Button variant="primary">Продолжить покупки</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className={style.basketСontainer}>
              <h1>Ваша корзина</h1>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Название:</th>
                    <th>Цена:</th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className={style.total}>Общая стоимость:</td>
                    <td className={style.total}>{totalCost} руб.</td>
                  </tr>
                </tbody>
              </Table>
              <div className={style.buttonContainer}>
                <Link to="/">
                  <Button variant="primary">Продолжить покупки</Button>
                </Link>
                <Button variant="primary" onClick={() => handleCklick()}>
                  Оформить заказ
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
