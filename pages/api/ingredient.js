import axios from "axios";

// GET `api/ingredient`

export default async function ingredientHandler(req, res) {
  debugger;
  const { query } = req.query;
  const { data } = await axios.get(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.SPOONACULAR_KEY2}&query=${query}`
  );

  res.json(data);
}
