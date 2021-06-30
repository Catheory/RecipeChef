import axios from "axios";

// GET `api/recipeDetial`

export default async function recipeDetailHandler(req, res) {
  const { id } = req.query;
  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_KEY2}&includeNutrition=true`
  );
  res.json(data);
}
