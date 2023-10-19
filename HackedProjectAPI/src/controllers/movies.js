import {MongoClient} from "mongodb";

// We setup the MongoDB client for movies database.
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("test");
const moviesDb = db.collection("movies");

/**
 * @api {get} /movies Get all movies
 * @apiName GetMovies
 * @apiGroup Movies
 *
 * @apiSuccess {Object[]} movies List of all movies.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "id": 0,
 *              "title": "Expand4bles",
 *              "poster_path": "iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg",
 *              "file_link": "https://1fichier.com/?su2rzrmgqxfi07yl7fvu&af=4814702",
 *              "year": 2023,
 *          },
 *          {
 *              "id": 1,
 *              "title": "Haunted Mansion",
 *              "poster_path": "8Im6DknDVxRiGXc5t8rVOJyzuNx.jpg",
 *              "file_link": "https://1fichier.com/?i9uorx7lpib4e8mcla85&af=3601079",
 *              "year": 2023
 *          }
 *      ]
 */
export const getMovies = async (req, res) => {
    const movies = await moviesDb.find().toArray();
    res.json(movies);
};

/**
 * @api {get} /movies/:id Get movie by ID
 * @apiName GetMovie
 * @apiGroup Movie
 *
 * @apiParam {Number} id Movie's unique ID.
 *
 * @apiSuccess {Object} movie Details of a movie with given ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 0,
 *          "title": "Expand4bles",
 *          "poster_path": "iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg",
 *          "file_link": "https://1fichier.com/?su2rzrmgqxfi07yl7fvu&af=4814702",
 *          "year": 2023
 *      }
 *
 * @apiError {Object} 404 Not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "error": "Not Found"
 *      }
 */
export const getMovie = async (req, res) => {
    const movie = await moviesDb.find({id: parseInt(req.params.id)}).toArray();
    if (movie.length === 0) {
        // In case there is no movie found with required ID, we send 404 not found status.
        res.sendStatus(404);
    }
    res.json(movie);
}

/**
 * @api {post} /movies Create a new movie
 * @apiName CreateMovie
 * @apiGroup Movies
 *
 * @apiParam {Number} id Movie's unique ID.
 * @apiParam {String} title Title of the movie.
 * @apiParam {String} poster_path Path for the poster of the movie.
 * @apiParam {String} file_link Link of the movie.
 * @apiParam {Number} year Release year of the movie.
 *
 * @apiSuccess {Object} 200 Successful creation of movie.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError {Object} 404 Error inserting movie to the database.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Error inserting movie to the database
 *      {
 *          "error": "Error inserting movie to the database"
 *      }
 */
export const createMovie = (req, res) => {
    const newMovie = req.body;
    moviesDb.insertOne(newMovie)
        .then(result => {
            if (result.insertedCount === 0) {
                return res.sendStatus(404);
            }
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(404).send('Error inserting movie to the database');
        });
}

/**
 * @api {put} /movies/:id Update movie by ID
 * @apiName UpdateMovie
 * @apiGroup Movies
 *
 * @apiParam {Number} id Movie's unique ID.
 * @apiParam {String} title Title of the movie.
 * @apiParam {String} poster_path Path for the poster of the movie.
 * @apiParam {String} file_link Link of the movie.
 * @apiParam {Number} year Release year of the movie.
 *
 * @apiSuccess {Object} 200 Successful update of movie.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError {Object} 404 Error updating movie or movie not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Error updating movie or movie not found
 *      {
 *          "error": "Error updating movie or movie not found"
 *      }
 */
export const updateMovie = (req, res) => {
    moviesDb.updateOne({id: parseInt(req.params.id)},
        {
            $set: {
                title: req.body.title,
                poster_path: req.body.poster_path,
                file_link: req.body.file_link,
                year: parseInt(req.body.year)
            }
        })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.sendStatus(404);
            }
            res.sendStatus(200);
        })
        .catch(() => {
            res.status(404).send('Error updating movie or movie not found.');
        });
}

/**
 * @api {delete} /movies/:id Delete movie by ID
 * @apiName DeleteMovie
 * @apiGroup Movies
 *
 * @apiParam {Number} id Movie's unique ID.
 *
 * @apiSuccess {Object} 200 Successful deletion of movie.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 */
export const deleteMovie = async (req, res) => {
    await moviesDb.deleteOne({"id": parseInt(req.params.id)});
    res.sendStatus(200);
}
