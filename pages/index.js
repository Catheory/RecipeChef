import Head from "next/head";
import axios from "axios";

export default function Index(props) {
  let recipes = props.spoonData.recipes;

  return (
    <>
      <Head>
        <title>Recipe Chef</title>
        <link rel="icon" href="/olive.png" />
      </Head>
      <main className="w-full flex flex-col">
        <h1 className="my-title">Recipe Chef </h1>
        <div className="my-title text-sm">my subheader </div>
        <ul>
          {recipes.map((recipe) => {
            return <li key={recipe.title}>{recipe.title}</li>;
          })}
        </ul>
      </main>
    </>
  );
}

// connect to mongodb here
// import { connectToDatabase } from '../util/mongodb';
// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase()

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected },
//   }
// }

const { SPOONACULAR_KEY } = process.env;

export async function getServerSideProps(context) {
  let numToFetch = 3;

  let result = await axios.get(
    `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_KEY}&number=${numToFetch}`
  );

  return {
    props: {
      spoonData: result.data,
    },
  };
}
