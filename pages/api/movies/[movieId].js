import mongo from 'mongodb';
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { movieId } = req.query;

  const movie = await db
    .collection("movies")
    .findOne({ _id: mongo.ObjectID(movieId)});

  res.json(movie);
};