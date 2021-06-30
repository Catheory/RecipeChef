import axios from "axios";

// GET `api/recipesList`
export default async function recipeListHandler(req, res) {
  const { dietsStr, ingredients } = req.query;
  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_KEY2}&diet=${dietsStr}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&ignorePantry=false&number=200`
  );
  res.json(data);
}
