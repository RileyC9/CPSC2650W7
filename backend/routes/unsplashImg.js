import dotenv from "dotenv"
import express from 'express';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

dotenv.config(); // Load environment variables

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const unsplash = createApi({
  accessKey: process.env.UNSPLASHAPI,
  fetch: nodeFetch.default,
});

const key = process.env.UNSPLASHAPI;

router.get("/:id", async (req, res) => {
  const searchTerm = req.params.id;
  const result = (await unsplash.search.getPhotos({
      query: searchTerm,
      page: 1,
      perPage: 1,
    }));
  res.send(result);
})

export default router;