import { useDispatch, useSelector } from "react-redux";
import { getProductByItems, productAction } from "../../slices/state";
import { Button, ButtonGroup } from "react-bootstrap";
import { useEffect } from "react";

export const ButtonPagination = () => {
  const offset = useSelector((state) => state.state.pages.offset);
  const limit = useSelector((state) => state.state.pages.limit);
  const isLoading = useSelector((state) => state.state.isLoading);
  const isFilter = useSelector((state) => state.state.isFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByItems());
  }, [offset]);
  return (
    <div>
      {!isLoading && !isFilter && (
        <ButtonGroup>
          <Button
            onClick={() =>
              dispatch(
                productAction.setOffset(offset - limit < 0 ? 0 : offset - limit)
              )
            }
            variant="secondary"
          >
            &lt;
          </Button>
          <Button
            onClick={() => dispatch(productAction.setOffset(offset + limit))}
            variant="secondary"
          >
            &gt;
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};
