import express from "express";
import multer from "multer";
import * as seriesController from "../controllers/series.js";

// We start the router and the multer
const router = express.Router();
const upload = multer();

/**
 * First GET router to get all series.
 */
router.get("/", seriesController.getSeries);

/**
 * Second GET router to get a show based on its ID.
 */
router.get("/:id", seriesController.getShow);

/**
 * POST router to create a new show.
 */
router.post("/", upload.array(), seriesController.createShow);

/**
 * UPDATE router to update a show's information based on its ID.
 */
router.put("/:id", seriesController.updateShow);

/**
 * DELETE router to delete a show based on its ID.
 */
router.delete("/:id", seriesController.deleteShow);

export default router;
