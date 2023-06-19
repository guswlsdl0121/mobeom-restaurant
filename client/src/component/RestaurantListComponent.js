import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { useStyles } from "../Styles";
import { baseUrl } from "../config";
import { useLoginStatus } from "./useLoginStatus";
import LoginAlert from "./LoginAlert";
import RatingForm from "./RatingForm";
import RestaurantCard from "./RestaurantCard";
import PaginationButtons from "./PaginationButtons";
import NavBarComponent from "./NavBarComponent";

const ITEMS_PER_PAGE = 12;

// 이미지 데이터를 Base64 문자열로 변환하는 함수
function convertImageToBase64(imageData) {
  const byteCharacters = imageData.data.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const base64String = btoa(byteCharacters);
  return base64String;
}

function RestaurantsListComponent() {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedIn = useLoginStatus();
  const [scrapedRestaurants, setScrapedRestaurants] = useState([]);
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [ratingFormOpen, setRatingFormOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const prevPageRef = useRef();
  const [totalPage, setTotalPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 페이지가 변경되거나 검색어, 위치, 카테고리가 변경될 때마다 식당 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchRestaurants = async () => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const res = await axios.get(
        `${baseUrl}/restaurants?startIndex=${startIndex}&endIndex=${endIndex}&name=${searchQuery}&city=${selectedLocation}&category=${selectedCategory}`
      );
      const totalCount = res.headers["x-total-count"];

      setTotalPage(Math.ceil(totalCount / ITEMS_PER_PAGE));
      console.log("원본 데이터:", res.data);
      setRestaurants(res.data);
    };

    const fetchScrapedRestaurants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/scrap`, {
          withCredentials: true,
        });
        setScrapedRestaurants(response.data.scraps);
        console.log("스크랩 : ", response.data.scraps);
      } catch (error) {
        console.error("로그인 안됨!!", error);
      }
    };

    const fetchUserRatings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/rating`, {
          withCredentials: true,
        });

        const ratings = response.data.ratings.reduce((acc, rating) => {
          acc[rating.restaurant_id] = rating.rating;
          return acc;
        }, {});

        console.log("평점 : ", ratings);
        setUserRatings(ratings);
      } catch (error) {
        console.error("로그인 안됨!!", error);
      }
    };

    fetchRestaurants();
    fetchScrapedRestaurants();
    fetchUserRatings();
  }, [currentPage, searchQuery, selectedLocation, selectedCategory]);

  // 현재 페이지가 변경될 때마다 이전 페이지를 저장하는 useEffect
  useEffect(() => {
    return () => {
      prevPageRef.current = currentPage;
    };
  }, [currentPage]);

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색 이벤트 핸들러
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  // 식당이 스크랩되었는지 확인하는 함수
  const isRestaurantScraped = (restaurantId) => {
    return scrapedRestaurants.some(
      (scrapedRestaurant) => scrapedRestaurant.restaurant_id === restaurantId
    );
  };

  // 스크랩 추가 또는 취소 이벤트 핸들러
  const handleScrap = async (restaurantId) => {
    if (!isLoggedIn) {
      setLoginAlertOpen(true);
      return;
    }

    try {
      if (isRestaurantScraped(restaurantId)) {
        await axios.delete(`${baseUrl}/scrap/${restaurantId}`, {
          withCredentials: true,
        });
        console.log("Scrap canceled successfully");
        setScrapedRestaurants(
          scrapedRestaurants.filter(
            (scrapedRestaurant) =>
              scrapedRestaurant.restaurant_id !== restaurantId
          )
        );
      } else {
        await axios.post(`${baseUrl}/scrap/${restaurantId}`, null, {
          withCredentials: true,
        });
        console.log("Scrap added successfully");
        setScrapedRestaurants([
          ...scrapedRestaurants,
          { restaurant_id: restaurantId },
        ]);
      }
    } catch (error) {
      console.error("Error handling scrap: ", error);
    }
  };

  // 평점 작성 폼 열기 이벤트 핸들러
  const handleRatingFormOpen = (restaurantId) => {
    if (!isLoggedIn) {
      setLoginAlertOpen(true);
      return;
    }

    setSelectedRestaurantId(restaurantId);
    setRatingFormOpen(true);
  };

  // 평점 작성 폼 닫기 이벤트 핸들러
  const handleRatingFormClose = () => {
    setSelectedRestaurantId(null);
    setRatingFormOpen(false);
  };

  // 평점 제출 이벤트 핸들러
  const handleRatingSubmit = async (rating) => {
    try {
      if (userRatings[selectedRestaurantId]) {
        await axios.put(
          `${baseUrl}/rating/${selectedRestaurantId}`,
          { rating },
          {
            withCredentials: true,
          }
        );
        console.log("Rating updated successfully");
      } else {
        await axios.post(
          `${baseUrl}/rating/${selectedRestaurantId}`,
          { rating },
          {
            withCredentials: true,
          }
        );
        console.log("Rating submitted successfully");
      }

      handleRatingFormClose();
      setCurrentPage(prevPageRef.current);
      setUserRatings((prevUserRatings) => ({
        ...prevUserRatings,
        [selectedRestaurantId]: rating,
      }));
    } catch (error) {
      console.error("Error submitting rating: ", error);
    }
  };

  // 필터링 이벤트 핸들러
  const handleFilter = (location, category) => {
    setSelectedLocation(location);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 스크랩된 식당 데이터 가져오는 이벤트 핸들러
  const handleScrapedRestaurants = async () => {
    try {
      if (!isLoggedIn) {
        setLoginAlertOpen(true);
        return;
      }

      const response = await axios.get(`${baseUrl}/scrap`, {
        withCredentials: true,
      });
      const totalCount = response.headers["x-total-count"];
      console.log("totalCount : ", totalCount);
      setTotalPage(Math.ceil(totalCount / ITEMS_PER_PAGE));

      const scrapedRestaurants = response.data.scraps.map((restaurant) => {
        if (restaurant.image && restaurant.image.data) {
          const base64Image = convertImageToBase64(restaurant.image);
          return {
            ...restaurant,
            image: base64Image,
          };
        }
        return restaurant;
      });

      setRestaurants(scrapedRestaurants);
      console.log(scrapedRestaurants);
    } catch (error) {
      console.error("Error retrieving scraped restaurants: ", error);
    }
  };

  // 평가한 식당 데이터 가져오는 이벤트 핸들러
  const handleRatedRestaurants = async () => {
    try {
      if (!isLoggedIn) {
        setLoginAlertOpen(true);
        return;
      }

      const response = await axios.get(`${baseUrl}/rating`, {
        withCredentials: true,
      });

      const totalCount = response.headers["x-total-count"];
      console.log("totalCount : ", totalCount);
      setTotalPage(Math.ceil(totalCount / ITEMS_PER_PAGE));

      console.log(response.data.ratings);

      const ratedRestaurants = response.data.ratings.map((restaurant) => {
        if (restaurant.image && restaurant.image.data) {
          const base64Image = convertImageToBase64(restaurant.image);
          return {
            ...restaurant,
            image: base64Image,
          };
        }
        return ratedRestaurants;
      });

      setRestaurants(ratedRestaurants);
      console.log(ratedRestaurants);
    } catch (error) {
      console.error("Error retrieving scraped restaurants: ", error);
    }
  };

  // 취소 이벤트 핸들러
  const handleCanceled = () => {
    window.location.reload();
  };

  // JSX 코드
  return (
    <div>
      <NavBarComponent
        onSearch={handleSearch}
        onFilter={handleFilter}
        onScrapedRestaurants={handleScrapedRestaurants}
        onRatedRestaurants={handleRatedRestaurants}
        onCanceled={handleCanceled}
      />
      <Grid container spacing={2} className={classes.grid}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
            <RestaurantCard
              restaurant={restaurant}
              isLoggedIn={isLoggedIn}
              isRestaurantScraped={isRestaurantScraped}
              userRating={userRatings[restaurant.id]}
              handleRatingFormOpen={handleRatingFormOpen}
              handleScrap={handleScrap}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.pagination}>
        <PaginationButtons
          currentPage={currentPage}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
        />
      </div>
      <LoginAlert
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}
      />
      <RatingForm
        isOpen={ratingFormOpen}
        onSubmit={handleRatingSubmit}
        handleClose={handleRatingFormClose}
      />
    </div>
  );
}

export default RestaurantsListComponent;
