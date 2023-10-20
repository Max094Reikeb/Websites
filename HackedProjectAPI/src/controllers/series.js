import {MongoClient} from "mongodb";

// We setup the MongoDB client for series database.
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("test");
const seriesDb = db.collection("series");

/**
 * @api {get} /series Get all series
 * @apiName GetSeries
 * @apiGroup Series
 *
 * @apiSuccess {Object[]} series List of all series.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "id": 0,
 *              "title": "The Winchesters",
 *              "poster_path": {
 *                  "01": "oyleYabGfn6c50bIo4M3c7ogrfL.jpg"
 *              },
 *              "links": [
 *                  {
 *                      "0101": "https://1fichier.com/?of69ujj3cjq0z90xkr9f&af=3797078",
 *                      "0102": "https://1fichier.com/?d45hkvg7zhnuszxfe1p5&af=3797078",
 *                      "0103": "https://1fichier.com/?s0tdw8ti51xwsjtcovwb&af=3797078",
 *                      "0104": "https://1fichier.com/?24nu6ac0r1ili84459qk&af=4814702"
 *                  }
 *              ]
 *              "year": 2023
 *          },
 *          {
 *              "id": 1,
 *              "title": "",
 *              "poster_path": {
 *                  "01": ""
 *              },
 *              links: [
 *                  {
 *                      "0101": "",
 *                      "0102": "",
 *                      "0103": "",
 *                      "0104": "",
 *                      "0105": ""
 *                  }
 *              ]
 *              "year": 2023
 *          }
 *      ]
 */
export const getSeries = async (req, res) => {
    const series = await seriesDb.find().toArray();
    res.json(series);
};

/**
 * @api {get} /series/:id Get show by ID
 * @apiName GetShow
 * @apiGroup Series
 *
 * @apiParam {Number} id Show's unique ID.
 *
 * @apiSuccess {Object} show Details of a show with given ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 0,
 *          "title": "The Winchesters",
 *          "poster_path": {
 *              "01": "oyleYabGfn6c50bIo4M3c7ogrfL.jpg"
 *          },
 *          "links": [
 *              {
 *                  "0101": "https://1fichier.com/?of69ujj3cjq0z90xkr9f&af=3797078",
 *                  "0102": "https://1fichier.com/?d45hkvg7zhnuszxfe1p5&af=3797078",
 *                  "0103": "https://1fichier.com/?s0tdw8ti51xwsjtcovwb&af=3797078",
 *                  "0104": "https://1fichier.com/?24nu6ac0r1ili84459qk&af=4814702"
 *              }
 *          ]
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
export const getShow = async (req, res) => {
    const show = await seriesDb.find({id: parseInt(req.params.id)}).toArray();
    if (show.length === 0) {
        // In case there is no show found with required ID, we send 404 not found status.
        res.sendStatus(404);
    }
    res.json(show);
}

/**
 * @api {post} /series Create a new show
 * @apiName CreateShow
 * @apiGroup Series
 *
 * @apiParam {Number} id Show's unique ID.
 * @apiParam {String} title Title of the show.
 * @apiParam {String} poster_path Path for the poster of the show.
 * @apiParam {String[]} links Links to the episodes of the show.
 * @apiParam {Number} year Release year of the show.
 *
 * @apiSuccess {Object} 200 Successful creation of show.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError {Object} 404 Error inserting show to the database.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Error inserting customer to the database
 *      {
 *          "error": "Error inserting customer to the database"
 *      }
 */
export const createShow = (req, res) => {
    const newShow = req.body;
    seriesDb.insertOne(newShow)
        .then(result => {
            if (result.insertedCount === 0) {
                return res.sendStatus(404);
            }
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(404).send('Error inserting show to the database.');
        });
}

/**
 * @api {put} /series/:id Update show by ID
 * @apiName UpdateShow
 * @apiGroup Series
 *
 * @apiParam {Number} id Show's unique ID.
 * @apiParam {String} title Title of the show.
 * @apiParam {String} poster_path Path for the poster of the show.
 * @apiParam {String[]} links Links to the episodes of the show.
 * @apiParam {Number} year Release year of the show.
 *
 * @apiSuccess {Object} 200 Successful update of show.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError {Object} 404 Error updating show or show not found.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Error updating show or show not found
 *      {
 *          "error": "Error updating show or show not found"
 *      }
 */
export const updateShow = (req, res) => {
    seriesDb.updateOne({id: parseInt(req.params.id)},
        {
            $set: {
                title: req.body.title,
                poster_path: req.body.poster_path,
                links: req.body.links,
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
            res.status(404).send('Error updating show or show not found.');
        });
}

/**
 * @api {delete} /series/:id Delete show by ID
 * @apiName DeleteShow
 * @apiGroup Series
 *
 * @apiParam {Number} id Show's unique ID.
 *
 * @apiSuccess {Object} 200 Successful deletion of show.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 */
export const deleteShow = async (req, res) => {
    await seriesDb.deleteOne({"id": parseInt(req.params.id)});
    res.sendStatus(200);
}
