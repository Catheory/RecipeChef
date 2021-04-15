import Head from "next/head";
import TagBar from "../components/TagBar";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Recipe Chef</title>
        <link rel="icon" href="/olive.png" />
      </Head>
      <main className="w-full flex flex-col">
        <h1 className="my-title">Recipe Chef </h1>
        <div className="flex flex-col mt-10">
          <TagBar spoonacularKey={props.spoonacularKey} />
        </div>
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
  return {
    props: {
      spoonacularKey: SPOONACULAR_KEY,
    },
  };
}
