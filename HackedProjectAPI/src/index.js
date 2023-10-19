import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import OAuth2Server from "oauth2-server";
import {authenticateRequest, oauth} from "./oauth.js";
import moviesRouter from "./routes/movies.js";
import seriesRouter from "./routes/series.js";

/**
 * Setup the apps
 */
const app = express();

/**
 * Setup the bodyParser (URL parser)
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/**
 * POST router to create a new OAuth token
 */
app.post('/oauth/token', (req, res, next) => {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);
    oauth.token(request, response)
        .then((token) => {
            res.json(token);
        }).catch(next);
});

/**
 * Setup the Series router.
 */
app.use("/api/series", authenticateRequest, seriesRouter);

/**
 * Setup the Movies router.
 */
app.use("/api/movies", authenticateRequest, moviesRouter);

/**
 * Launching the API on port 5001.
 */
app.listen(5001, () => {
    console.log("API launched. Port 5001 used. Listening...");
});
