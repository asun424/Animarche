import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemsContainer from "./search/ItemsContainer";
import axios from "axios";

const SearchPage = () => {
  const [results, setResults] = useState({
    loadStatus: false,
    allItems: [],
    itemView: [
      // {
      //   href: "https://otakumode.com/shop/6406b71f82aed4001d2b6ce0/Naruto-Shippuden-Sasuke-Uchiha-Animation-20th-Anniversary-Costume-Non-Scale-Figure",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/327.18.550.550/shop/product/f7a595a63ef84f71bab6f4b96f056903.jpg.webp",
      //   name: "Naruto: Shippuden Sasuke Uchiha: Animation 20th Anniversary Costume Non-Scale Figure",
      //   price: "$25.64",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/6406b71f82aed4001d2b6cdf/Naruto-Shippuden-Naruto-Uzumaki-Animation-20th-Anniversary-Costume-Non-Scale-Figure",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/309.24.590.591/shop/product/32ed71c8a91e4929b62d4bafd3bd0ba7.jpg.webp",
      //   name: "Naruto: Shippuden Naruto Uzumaki: Animation 20th Anniversary Costume Non-Scale Figure",
      //   price: "$25.64",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/642a42dda006c10026bb44c2/Naruto-Shippuden-Vibration-Stars",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/shop/product/76a4e87310764371aee9255b15f07bb0.jpg.webp",
      //   name: "Naruto: Shippuden Vibration Stars",
      //   price: "$25.64",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/63c0dc521e959f28cb462ee9/Naruto-Gals-DX-Naruto-Shippuden-Temari-Ver-2",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/shop/product/d01dcc8a35d14989bcb65240eff988d8.jpg.webp",
      //   name: "Naruto Gals DX Naruto Shippuden Temari Ver. 2",
      //   price: "$341.99",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/627c576e659370001dcf87e3/Precious-G-E-M-Series-Naruto-Kakashi-Hatake-Susanoo-Ver-w-LED-Base",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/433.335.345.345/shop/product/a533ac45fe9f48128467d54b96bb5764.jpg.webp",
      //   name: "Precious G.E.M. Series Naruto Kakashi Hatake: Susanoo Ver. w/ LED Base",
      //   price: "$256.49",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/63083a196e297a001dcbd136/Naruto-Shippuden-Itachi-Uchiha-1-8-Scale-Figure",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/288.290.408.408/shop/product/8d9849fac23d48e68b709843129dbb60.jpg.webp",
      //   name: "Naruto Shippuden Itachi Uchiha 1/8 Scale Figure",
      //   price: "$213.75",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/6406b7c01d154200282161d8/Naruto-Vibration-Stars-Naruto-Uzumaki-Vol-2",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/224.29.677.676/shop/product/7b863343264048fe96da13e4b77af909.jpg.webp",
      //   name: "Naruto Vibration Stars Naruto Uzumaki Vol. 2",
      //   price: "$25.64",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/61c15d10f6b68e00152009ee/Naruto-Shippuden-Vibration-Stars-Naruto-Uzumaki-III",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/401.93.485.484/shop/product/fc4de45015644ad9bb87b0a409d62dbf.jpg.webp",
      //   name: "Naruto: Shippuden -Vibration Stars- Naruto Uzumaki III",
      //   price: "$16.80",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/62204ccc559fa700251b60c1/Naruto-Shippuden-Vibration-Stars-Itachi-Uchiha-II",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/429.53.425.425/shop/product/1880b9c15e734090b034c89f045b1458.jpg.webp",
      //   name: "Naruto: Shippuden -Vibration Stars- Itachi Uchiha II",
      //   price: "$16.80",
      //   vendor: "Tokyo Otaku Mode",
      // },
      // {
      //   href: "https://otakumode.com/shop/626766f52acb47002a002b48/Naruto-Shippuden-Grandista-Nero-Naruto-Uzumaki-2-Manga-Dimensions",
      //   img: "https://resize.cdn.otakumode.com/ex/300.300/292.48.426.426/shop/product/025827d841334ef6bb9f0ac634b930f7.jpg.webp",
      //   name: "Naruto Shippuden Grandista Nero Naruto Uzumaki 2: Manga Dimensions",
      //   price: "$49.40",
      //   vendor: "Tokyo Otaku Mode",
      // },
    ],
  });

  const location = useLocation();
  const query = location.search.slice(9);

  const itemRandomizer = (allItems) => {
    const itemsToShow = [];
    for (let i = 0; i < 30; i++) {
      if (allItems.length == 0) {
        return itemsToShow;
      }
      itemsToShow.push(
        allItems.pop(Math.floor(Math.random() * (allItems.length + 1)))
      );
    }
    return itemsToShow;
  };

  useEffect(() => {
    const getResults = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/scrape?keyword=${query}`
      );

      if (data.length === 0) {
        setResults((preV) => ({ loadStatus: false, ...preV }));
      } else {
        const randomItemView = itemRandomizer(data);
        const updateObj = {
          loadStatus: true,
          allItems: data,
          itemView: randomItemView,
        };
        setResults(updateObj);
      }
    };
    getResults();
  }, []);

  const showMoreItems = () => {
    const showMoreItems = itemRandomizer(results.allItems);
    setResults({
      allItems: results.allItems,
      itemView: [...results.itemView, ...showMoreItems],
    });
  };

  return (
    <div className="flex flex-center justify-center items-center bg-gray-50 dark:bg-gray-900">
      {results.loadStatus === false ? (
        <div className="text-center text-[50px]">Loading...</div>
      ) : results.loadStatus === null ? (
        <div className="text-center text-[50px]">
          No results found. Try Again!
        </div>
      ) : (
        <>
          <ItemsContainer results={results.itemView} />
          {results.allItems.length > 0 ? (
            <button onClick={showMoreItems}>More</button>
          ) : (
            ""
          )}{" "}
        </>
      )}
    </div>
  );
};

export default SearchPage;
