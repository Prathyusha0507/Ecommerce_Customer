// referenced from: https://www.youtube.com/watch?v=VVhnuOKVHRs&t=6210s

import "./Dashboard.css";
import Filters from "./Filters";
import ProductContainer from "./Products/ProductContainer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { products, getProdListAsync } from "../../redux/item/itemSlice";
import { useLocation } from "react-router-dom";

export default function ContentContainer() {
  const list = useSelector(products);
  const dispatch = useDispatch();
  const searchText = window.location.hash.split('/')[2]

  let location = useLocation();

  const [categories, setCategories] = useState([
    { id: 1, checked: false, label: "Home" },
    { id: 2, checked: false, label: "Electronics" },
    { id: 3, checked: false, label: "Books" },
    { id: 4, checked: false, label: "Outdoor" },
    { id: 5, checked: false, label: "Food" },
    { id: 6, checked: false, label: "Fashion" },
    { id: 7, checked: false, label: "Toys" },
    { id: 8, checked: false, label: "Pets" },
    { id: 9, checked: false, label: "Health" },
  ]);

  const [prices, setPrices] = useState([
    { id: 1, checked: false, label: "Under $25" },
    { id: 2, checked: false, label: "$25 ~ $50" },
    { id: 3, checked: false, label: "$50 ~ $100" },
    { id: 4, checked: false, label: "$100 ~ $200" },
    { id: 5, checked: false, label: "Above $200" },
  ]);

  const [ratings, setRatings] = useState([
    { id: 1, checked: false, label: "Above 4" },
    { id: 2, checked: false, label: "3 ~ 4" },
    { id: 3, checked: false, label: "2 ~ 3" },
    { id: 4, checked: false, label: "1 ~ 2" },
    { id: 5, checked: false, label: "Below 1" },
  ]);

    const getFilterURL = () => {
      let modifiedURL = ``

      modifiedURL = getUrlByCategory(modifiedURL);
      modifiedURL = getUrlByPrice(modifiedURL);
      modifiedURL = getUrlByRating(modifiedURL);
      modifiedURL = getUrlBySearch(modifiedURL);

      return modifiedURL
    };

    const handleCategoryChecked = (id) => {
        const categoriesStateList = categories;
        const changeCheckedCategories = categoriesStateList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
        );
        setCategories(changeCheckedCategories);
    };

  const handlePriceChecked = (id) => {
    const pricesStateList = prices;
    const changeCheckedPrices = pricesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPrices(changeCheckedPrices);
  };

  const handleRatingChecked = (id) => {
    const ratingsStateList = ratings;
    const changeCheckedRatings = ratingsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setRatings(changeCheckedRatings);
  };

    useEffect(() => {
        const filterURL = getFilterURL()
        dispatch(getProdListAsync(filterURL));
    }, [categories, prices, ratings, location]);

    return (
        <div className="horizontal-container">
            <div className="filter-container">
                <Filters 
                    categories={categories}
                    changeCategory={handleCategoryChecked}
                    prices={prices}
                    changePrice={handlePriceChecked}
                    ratings={ratings}
                    changeRating={handleRatingChecked}
                />
            </div>
            <div style={{width: '85%', left: '15%', position: 'relative'}}>
              <ProductContainer list={list}/>
            </div>
        </div>   
    )

  function getUrlBySearch(modifiedURL) {
    if (searchText !== '') {
      const searchParam = `search=${searchText}`;
      if (modifiedURL.includes('?')) {
        modifiedURL = `${modifiedURL}&${searchParam}`;
      } else {
        modifiedURL = `?${searchParam}`;
      }
    }
    return modifiedURL;
  }

  function getUrlByRating(modifiedURL) {
    const ratingsStateList = ratings;
    const checkedRatings = ratingsStateList.filter(item => item.checked).map(item => { return item.label; });
    const ratingParams = checkedRatings.map(i => `rating=${i}`.replace(/\s/g, '')).join('&');
    if (checkedRatings.length > 0) {
      if (modifiedURL.includes('?')) {
        modifiedURL = `${modifiedURL}&${ratingParams}`;
      } else {
        modifiedURL = `?${ratingParams}`;
      }
    }
    return modifiedURL;
  }

  function getUrlByPrice(modifiedURL) {
    const pricesStateList = prices;
    const checkedPrices = pricesStateList.filter(item => item.checked).map(item => { return item.label; });
    const priceParams = checkedPrices.map(i => `price=${i}`.replace(/\s/g, '')).join('&');
    if (checkedPrices.length > 0) {
      if (modifiedURL.includes('?')) {
        modifiedURL = `${modifiedURL}&${priceParams}`;
      } else {
        modifiedURL = `?${priceParams}`;
      }
    }
    return modifiedURL;
  }

  function getUrlByCategory(modifiedURL) {
    const categoriesStateList = categories;
    const checkedCategories = categoriesStateList.filter(item => item.checked).map(item => { return item.label; });
    const categoryParams = checkedCategories.map(i => `category=${i}`).join('&');
    if (checkedCategories.length > 0) {
      modifiedURL = `?${categoryParams}`;
    }
    return modifiedURL;
  }
}
