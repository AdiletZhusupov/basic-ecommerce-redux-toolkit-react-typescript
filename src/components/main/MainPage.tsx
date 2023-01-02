import { ChangeEvent, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { CompanyBtn } from "./CompanyBtn";
import { Loader } from "./Loader";
import { FurnitureItem } from "./FurnitureItem";
import { Cart } from "./Cart";
import List from "./List";
import { IFurnitureItem } from "../../types/types";
import { debounce } from "lodash";
import {
  fetchFurnitureItems,
  filterByName
} from "../../store/reducers/furnitureSlice";

export const MainPage = () => {
  const { error, isLoading, furnitureItemsToDisplay, companies } = useSelector(
    (state: RootState) => state.furnitureItems
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByName(e.target.value));
  };

  // delaying the search for 1 sec
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  useEffect(() => {
    dispatch(fetchFurnitureItems());
  }, []);

  // cancelling debounce
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

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
      <div className="title">
        <h2>our products</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products">
        <div className="filters-container">
          <input
            type="text"
            className="search-input"
            placeholder="search..."
            onChange={debouncedResults}
          />
          <h5>Company</h5>
          <article className="companies">
            <List
              items={companies}
              renderItem={(item: string) => (
                <CompanyBtn company={item} key={item} />
              )}
            />
          </article>
          <h5>Cart</h5>
          <Cart />
        </div>
        <div className="products-container">
          {furnitureItemsToDisplay.length > 0 ? (
            <List
              items={furnitureItemsToDisplay}
              renderItem={(item: IFurnitureItem) => (
                <FurnitureItem furniture={item} key={item.id} />
              )}
            />
          ) : (
            <h6>Sorry, no products matched your search</h6>
          )}
        </div>
      </div>
    </>
  );
};
