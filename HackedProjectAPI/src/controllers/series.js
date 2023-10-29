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
 *                      "0101-Pilot": "https://1fichier.com/?of69ujj3cjq0z90xkr9f&af=3797078",
 *                      "0102-Teach Your Children Well": "https://1fichier.com/?d45hkvg7zhnuszxfe1p5&af=3797078",
 *                      "0103-You're Lost Little Girl": "https://1fichier.com/?s0tdw8ti51xwsjtcovwb&af=3797078",
 *                      "0104-Masters of War": "https://1fichier.com/?24nu6ac0r1ili84459qk&af=4814702"
 *                  }
 *              ]
 *              "year": 2023
 *          },
 *          {
 *              "id": 1,
 *              "title": "Our Flag Means Death",
 *              "poster_path": {
 *                  "01": "9jgmWIdK0kjjtBqEZntfSDWTgr9.jpg",
 *                  "02": "mP9OYUoZWod61G8gnsZ5TX1qft.jpg"
 *              },
 *              links: [
 *                  {
 *                      "0101-Pilot": "https://1fichier.com/?yy3zj6r9r30jzt2yytg7&af=3797078",
 *                      "0102-A Damned Man": "https://1fichier.com/?1gk1t6nuzlwswnkd410z&af=3797078",
 *                      "0103-A Gentleman Pirate": "https://1fichier.com/?rplc1nun8xdreqm5n6pc&af=3797078",
 *                      "0104-Discomfort in a Married State": "https://1fichier.com/?t4pvs95y51wxv9dqthqo&af=3797078",
 *                      "0105-The Best Revenge Is Dressing Well": "https://1fichier.com/?fh4t5mav6bqhn5xvud5g&af=3797078",
 *                      "0106-The Art of Fuckery": "https://1fichier.com/?ktdbd0nxvy9t8u1956h1&af=3797078",
 *                      "0107-This Is Happening": "https://1fichier.com/?rynq3yaeq3iem742ypsp&af=3797078",
 *                      "0108-We Gull Way Back": "https://1fichier.com/?fy2maqpk1md1r19v3m1x&af=3797078",
 *                      "0109-Act of Grace": "https://1fichier.com/?9b517sny2g16wus7qk40&af=3797078",
 *                      "0110-Wherever You Go, There You Are": "https://1fichier.com/?9yzu3lo5iekw0vk14nc9&af=3797078"
 *                  },
 *                  {
 *                      "0201-Impossible Birds": "https://1fichier.com/?tz8jgpkr41y0mt7nvm6t&af=4814702",
 *                      "0202-Red Flags": "https://1fichier.com/?9myir3zawn1pk7m8mh3x&af=4814702",
 *                      "0203-The Innkeeper": "https://1fichier.com/?59exld3xullc3k361r8m&af=4814702",
 *                      "0204-Fun and Games": "https://1fichier.com/?dp5b8u5mh6f46ufsx6k8&af=4814702",
 *                      "0205-The Curse of the Seafaring Life": "https://1fichier.com/?thvvpi1j09a8x61w63v3&af=4814702",
 *                      "0206-Calypso's Birthday": "https://1fichier.com/?fq9axmqc0pkiccp7ouoo&af=4814702",
 *                      "0207-Man on Fire": "https://1fichier.com/?isylh3zxr7f6vnhtf12x&af=4814702",
 *                      "0208-Mermen": "https://1fichier.com/?n9qlxctkiqx4qtkvxtja&af=4814702"
 *                  }
 *              ]
 *              "year": 2022
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
 *                  "0101-Pilot": "https://1fichier.com/?of69ujj3cjq0z90xkr9f&af=3797078",
 *                  "0102-Teach Your Children Well": "https://1fichier.com/?d45hkvg7zhnuszxfe1p5&af=3797078",
 *                  "0103-You're Lost Little Girl": "https://1fichier.com/?s0tdw8ti51xwsjtcovwb&af=3797078",
 *                  "0104-Masters of War": "https://1fichier.com/?24nu6ac0r1ili84459qk&af=4814702"
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
