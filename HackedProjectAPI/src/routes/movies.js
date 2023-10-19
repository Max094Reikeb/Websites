import express from "express";
import multer from "multer";
import * as moviesController from "../controllers/movies.js";

// We start the router and the multer
const router = express.Router();
const upload = multer();

/**
 * First GET router to get all movies.
 */
router.get("/", moviesController.getMovies);

/**
 * Second GET router to get a movie based on its ID.
 */
router.get("/:id", moviesController.getMovie);

/**
 * POST router to create a new movie.
 */
router.post("/", upload.array(), moviesController.createMovie);

/**
 * UPDATE router to update a movie's information based on its ID.
 */
router.put("/:id", moviesController.updateMovie);

/**
 * DELETE router to delete a movie based on its ID.
 */
router.delete("/:id", moviesController.deleteMovie);

export default router;
