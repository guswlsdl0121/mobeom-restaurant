import express from "express";

const ratingRouter = (db) => {
  const router = express.Router();

  // 음식점 평점주기
  router.post("/:restaurantId", (req, res) => {
    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    console.log("음식점 평점 주기");
    const userId = req.session.user.id;
    const { restaurantId } = req.params;
    const { rating } = req.body;

    // rating 값이 0과 5 사이의 범위인지 확인
    if (rating < 0 || rating > 5) {
      res.status(400).json({
        error: "Invalid rating value. Rating must be between 0 and 5.",
      });
      return;
    }

    db.query(
      "INSERT INTO Ratings (user_id, restaurant_id, rating) VALUES (?, ?, ?)",
      [userId, restaurantId, rating],
      (error) => {
        if (error) {
          console.error("Error adding rating: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Rating added successfully" });
      }
    );
  });

  // 자신이 평점준 음식점 조회하기
  router.get("/", (req, res) => {
    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.session.user.id;

    db.query(
      `SELECT *, COUNT(*) OVER() AS total_count
      FROM Restaurants
      INNER JOIN Ratings ON Restaurants.id = Ratings.restaurant_id
      WHERE Ratings.user_id = ?`,
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving ratings: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        const totalCount = results.length > 0 ? results[0].total_count : 0;
        res.set("x-total-count", totalCount);
        res.json({ ratings: results });
      }
    );
  });

  // 음식점 평점 조회하기
  router.get("/:restaurantId/average", (req, res) => {
    console.log("평균 평점 조회");
    const { restaurantId } = req.params;

    db.query(
      "SELECT AVG(rating) AS averageRating FROM Ratings WHERE restaurant_id = ?",
      [restaurantId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving average rating: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        const averageRating = results[0].averageRating;
        res.json({ averageRating });
      }
    );
  });

  // 음식점 평점 수정하기
  router.put("/:restaurantId", (req, res) => {
    console.log("음식점 평점 수정");
    const userId = req.session.user.id;
    const { restaurantId } = req.params;
    const { rating } = req.body;

    db.query(
      "UPDATE Ratings SET rating = ? WHERE user_id = ? AND restaurant_id = ?",
      [rating, userId, restaurantId],
      (error, results) => {
        if (error) {
          console.error("Error updating rating: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        if (results.affectedRows === 0) {
          // 업데이트된 행이 없으면 사용자가 평점을 주지 않은 식당이므로 오류 응답
          res.status(400).json({ error: "Rating not found" });
          return;
        }

        res.json({ message: "Rating updated successfully" });
      }
    );
  });

  return router;
};

export default ratingRouter;
