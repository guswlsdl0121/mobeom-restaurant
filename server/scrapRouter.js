import express from "express";

const scrapRouter = (db) => {
  const router = express.Router();

  // 글 스크랩하기
  router.post("/:restaurantId", (req, res) => {
    console.log("스크랩 하기 측 : ", req.session.user);

    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.session.user.id;
    const { restaurantId } = req.params;

    db.query(
      "INSERT INTO Scraps (user_id, restaurant_id) VALUES (?, ?)",
      [userId, restaurantId],
      (error) => {
        if (error) {
          console.error("Error adding scrap: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Scrap added successfully" });
      }
    );
  });

  // 자신이 스크랩한 식당 조회하기
  router.get("/", (req, res) => {
    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.session.user.id;

    db.query(
      `SELECT *, COUNT(*) OVER() AS total_count
      FROM Restaurants
      INNER JOIN Scraps ON Restaurants.id = Scraps.restaurant_id
      WHERE Scraps.user_id = ?`,
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving scraps: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        const totalCount = results.length > 0 ? results[0].total_count : 0;
        res.set("x-total-count", totalCount);
        res.json({ scraps: results });
      }
    );
  });

  // 스크랩 취소하기
  router.delete("/:restaurantId", (req, res) => {
    console.log("스크랩 취소 측 : ", req.session.user);
    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.session.user.id;
    const { restaurantId } = req.params;

    db.query(
      "DELETE FROM Scraps WHERE user_id = ? AND restaurant_id = ?",
      [userId, restaurantId],
      (error) => {
        if (error) {
          console.error("Error canceling scrap: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Scrap canceled successfully" });
      }
    );
  });

  return router;
};

export default scrapRouter;
