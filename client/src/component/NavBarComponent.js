import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./NavBarStyle";

const NavBarComponent = ({
  onSearch,
  onFilter,
  onScrapedRestaurants,
  onRatedRestaurants,
  onCanceled,
}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrapedActive, setIsScrapedActive] = useState(false);
  const [isRatedActive, setIsRatedActive] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    onFilter(event.target.value, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilter(selectedLocation, event.target.value);
  };

  const handleScrapedRestaurants = () => {
    setIsScrapedActive((prevActive) => !prevActive);
    if (isScrapedActive) {
      onCanceled();
    } else {
      onScrapedRestaurants();
    }
  };

  const handleRatedRestaurants = () => {
    setIsRatedActive((prevActive) => !prevActive);
    if (isRatedActive) {
      onCanceled();
    } else {
      onRatedRestaurants();
    }
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar className={classes.toolbar} />
      <div className={classes.toolbar}>
        <Typography variant="subtitle1" className={classes.title}>
          검색 및 필터링
        </Typography>
      </div>
      <div className={classes.search}>
        <InputBase
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          className={classes.searchIcon}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <div className={classes.filters}>
        <div className={classes.filter}>
          <Typography
            style={{ marginLeft: "32px" }}
            variant="subtitle1"
            className={classes.filterTitle}
          >
            지역
          </Typography>
          <FormControl variant="outlined" className={classes.filterSelect}>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="포항시">포항시</MenuItem>
              <MenuItem value="경주시">경주시</MenuItem>
              <MenuItem value="김천시">김천시</MenuItem>
              <MenuItem value="안동시">안동시</MenuItem>
              <MenuItem value="구미시">구미시</MenuItem>
              <MenuItem value="영주시">영주시</MenuItem>
              <MenuItem value="영천시">영천시</MenuItem>
              <MenuItem value="상주시">상주시</MenuItem>
              <MenuItem value="문경시">문경시</MenuItem>
              <MenuItem value="경산시">경산시</MenuItem>
              <MenuItem value="군위군">군위군</MenuItem>
              <MenuItem value="의성군">의성군</MenuItem>
              <MenuItem value="청송군">청송군</MenuItem>
              <MenuItem value="영양군">영양군</MenuItem>
              <MenuItem value="영덕군">영덕군</MenuItem>
              <MenuItem value="청도군">청도군</MenuItem>
              <MenuItem value="고령군">고령군</MenuItem>
              <MenuItem value="성주군">성주군</MenuItem>
              <MenuItem value="칠곡군">칠곡군</MenuItem>
              <MenuItem value="예천군">예천군</MenuItem>
              <MenuItem value="봉화군">봉화군</MenuItem>
              <MenuItem value="울진군">울진군</MenuItem>
              <MenuItem value="울릉군">울릉군</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.filter}>
          <Typography variant="subtitle1" className={classes.filterTitle}>
            카테고리
          </Typography>
          <FormControl variant="outlined" className={classes.filterSelect}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="한식">한식</MenuItem>
              <MenuItem value="일식">일식</MenuItem>
              <MenuItem value="중식">중식</MenuItem>
              <MenuItem value="뷔페">뷔페</MenuItem>
              <MenuItem value="양식">양식</MenuItem>
              <MenuItem value="외국음식전문점(인도 태국등)">
                외국음식전문점(인도 태국등)
              </MenuItem>
              <MenuItem value="탕류">탕류</MenuItem>
              <MenuItem value="분식">분식</MenuItem>
              <MenuItem value="육류">육류</MenuItem>
              <MenuItem value="회">회</MenuItem>
              <MenuItem value="해물">해물</MenuItem>
              <MenuItem value="패스트푸드">패스트푸드</MenuItem>
              <MenuItem value="치킨">치킨</MenuItem>
              <MenuItem value="복어요리">복어요리</MenuItem>
              <MenuItem value="보신">보신</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          onClick={handleScrapedRestaurants}
          className={`${classes.button} ${
            isScrapedActive ? classes.activeButton : ""
          }`}
        >
          스크랩 목록
        </Button>
        <Button
          variant="outlined"
          onClick={handleRatedRestaurants}
          className={`${classes.button} ${
            isRatedActive ? classes.activeButton : ""
          }`}
        >
          평점 목록
        </Button>
      </div>
    </Drawer>
  );
};

export default NavBarComponent;
