import express from "express";

const restaurantRouter = (db) => {
  const router = express.Router();

  //식당 리스트 조회
  router.get("/", (req, res) => {
    const {
      startIndex = 0,
      endIndex = 10,
      city = "전체",
      category = "전체",
      name = "",
    } = req.query;
    let query = "SELECT * FROM Restaurants";
    let countQuery = "SELECT COUNT(*) AS totalCount FROM Restaurants"; // 추가된 쿼리
    let params = [];

    // 지역별(city) 필터링
    if (city !== "") {
      query += " WHERE city = ?";
      countQuery += " WHERE city = ?"; // 추가된 조건
      params.push(city);
    }

    // 종류별(category) 필터링
    if (category !== "") {
      if (params.length === 0) {
        query += " WHERE category = ?";
        countQuery += " WHERE category = ?"; // 추가된 조건
      } else {
        query += " AND category = ?";
        countQuery += " AND category = ?"; // 추가된 조건
      }
      params.push(category);
    }

    // 이름(name) 검색
    if (name) {
      if (params.length === 0) {
        query += " WHERE name LIKE ?";
        countQuery += " WHERE name LIKE ?"; // 추가된 조건
      } else {
        query += " AND name LIKE ?";
        countQuery += " AND name LIKE ?"; // 추가된 조건
      }
      params.push(`%${name}%`);
    }

    query += " LIMIT ?, ?";
    params.push(Number(startIndex));
    params.push(Number(endIndex) - Number(startIndex));

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Failed to fetch restaurants" });
      } else {
        // 데이터의 총 개수 조회
        db.query(countQuery, params.slice(0, -2), (err, countResult) => {
          if (err) {
            console.error("Error executing count query:", err);
            res.status(500).json({ error: "Failed to fetch restaurants" });
          } else {
            const totalCount = countResult[0].totalCount;
            const restaurantsWithImages = results.map((restaurant) => {
              if (restaurant.image) {
                const base64Image = Buffer.from(restaurant.image).toString(
                  "base64"
                );
                return { ...restaurant, image: base64Image };
              }
              return restaurant;
            });
            res.set("X-Total-Count", totalCount); // 응답 헤더에 데이터의 총 개수를 추가
            res.json(restaurantsWithImages);
          }
        });
      }
    });
  });

  return router;
};

export default restaurantRouter;
