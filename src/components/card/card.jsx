import React from "react";
import { Card, Spin, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "./card.module.css";
import { productAction } from "../../slices/state";

export const CardItems = () => {
  const items = useSelector((state) => state.state.items);
  const isLoading = useSelector((state) => state.state.isLoading);
  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <Spin style={{ margin: 20 }} />
      ) : (
        <div className={style.container}>
          {items.map((i) => {
            return (
              <Card
                key={i.id}
                title={!i.brand ? "Бренд: No Name" : `Бренд: ${i.brand}`}
                bordered={false}
                hoverable
                className={style.card}
              >
                <p>Индекс: {i.id}</p>
                <p>Цена: {i.price}</p>
                <p>Название: {i.product}</p>
                <div className={style.buttonContainer}>
                  <Button type="primary" onClick={() => dispatch(productAction.setBasket(i))}>В корзину</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};
