import { Button, InputGroup, Form, Image, ButtonGroup } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import svgRect from "../../assets/react.svg";
import userdef from "../../assets/userdef.svg";
import basket from "../../assets/basket.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByItems, getProductFilter, productAction } from "../../slices/state";
import { useState } from "react";
import style from "./header.module.css";

const nameParam = {
  Параметр: "Параметр",
  brand: "Бренд",
  product: "Название",
  price: "Цена",
};

export const Header = () => {
  const isFilter = useSelector((state) => state.state.isFilter)
  const [param, setParam] = useState("Параметр");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleClickSearch = () => {
    let payloadValue = param === "price" ? Number(value) : value;
    dispatch(getProductFilter({ [param]: payloadValue }));
    dispatch(productAction.setIsFilter())

  };
  const handleClickSearchClear = () => {
    dispatch(getProductByItems());
    dispatch(productAction.setIsFilter())
    setValue("");
    setParam("Параметр");
  };

  return (
    <div className={style.header}>
      <div className={style.header_logo}>
        <Image src={svgRect} />
      </div>
      <div className={style.header_search}>
        <InputGroup className="mb-3" size="lg">
          <DropdownButton
            as={ButtonGroup}
            title={nameParam[param]}
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1" onClick={() => setParam("brand")}>
              Бренд
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => setParam("product")}>
              Название
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => setParam("price")}>
              Цена
            </Dropdown.Item>
          </DropdownButton>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите параметр поиска"
            aria-label="Filter"
            aria-describedby="basic-addon2"
          />
          {!isFilter ? 
          <Button
            variant="primary"
            id="button-addon2"
            onClick={() => handleClickSearch()}
            disabled={value === ''}
          >
            Искать
          </Button>
          : 
          <Button
          variant="primary"
          id="button-addon2"
          onClick={() => handleClickSearchClear()}
        >
          Очистить
        </Button>

          }
        </InputGroup>
      </div>

      <div className={style.header_basket}>
        <Link to='/basket'>
          <Image src={basket} />
        </Link>
      </div>
      <div className={style.header_user}>
        <Link>
          <Image src={userdef} />
        </Link>
      </div>
    </div>
  );
};
