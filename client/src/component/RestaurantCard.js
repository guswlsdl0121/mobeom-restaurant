import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { useStyles } from "../Styles";

function RestaurantCard({
  restaurant, // 식당 정보 객체
  isLoggedIn, // 사용자 로그인 상태
  isRestaurantScraped, // 식당 스크랩 여부 확인 함수
  userRating, // 사용자 평점
  handleRatingFormOpen, // 평점 폼 열기 이벤트 핸들러
  handleScrap, // 스크랩 이벤트 핸들러
}) {
  const classes = useStyles();
  const [currentRating, setCurrentRating] = useState(userRating);

  useEffect(() => {
    setCurrentRating(userRating);
  }, [userRating]);

  const renderImage = (image) => {
    if (image) {
      return `data:image/jpeg;base64,${image}`;
    }
    return null;
  };

  const renderRating = () => {
    if (!isLoggedIn) {
      return "평점 없음";
    }
    if (currentRating) {
      return `내 평점: ${currentRating}`;
    }
    return "평점 주기";
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={renderImage(restaurant.image)}
        title="Restaurant"
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="subtitle1" component="h2">
          {restaurant.name} {/* 식당 이름 */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {restaurant.category} {/* 식당 카테고리 */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {restaurant.city} {/* 식당 도시 */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {restaurant.mainmenu} {/* 식당 주요 메뉴 */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {restaurant.address} {/* 식당 주소 */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {restaurant.phonenumber} {/* 식당 전화번호 */}
        </Typography>
      </CardContent>
      <Box className={classes.Icon}>
        <IconButton
          className={classes.button}
          onClick={() => handleScrap(restaurant.id)} // 스크랩 버튼 클릭 시 이벤트 핸들러 호출
        >
          {isLoggedIn && isRestaurantScraped(restaurant.id) ? (
            <Bookmark color="secondary" /> // 스크랩된 식당이면 채워진 북마크 아이콘
          ) : (
            <BookmarkBorder /> // 스크랩되지 않은 식당이면 빈 북마크 아이콘
          )}
        </IconButton>
        <Button
          className={classes.ratingButton}
          onClick={() => handleRatingFormOpen(restaurant.id)} // 평점 버튼 클릭 시 이벤트 핸들러 호출
        >
          {renderRating()} {/*평점 표시*/}
        </Button>
      </Box>
    </Card>
  );
}

export default RestaurantCard;
