const express = require("express");
const reviews = express.Router({mergeParams: true});

const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews");

// INDEX
reviews.get("/", async (req, res) => {
  const { songId } = req.params
  try {
    const allReviews = await getAllReviews(songId)
    res.status(200).json(allReviews)
  } catch(error) {
    res.status(500).json({ error: "internal server error"})
  }
});

// SHOW
reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (!review.message) {
    res.status(200).json(review);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
reviews.post("/", async (req, res) => {
  try {
    const review = await createReview(req.body);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE
reviews.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(404).json({ error: "id not found" });
  }
});

// UPDATE
reviews.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await updateReview(id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(404).json({ error: "id not found" });
  }
});

module.exports = reviews;
