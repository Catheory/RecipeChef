import Head from "next/head";
import App from "../components/App";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Chow Meow Now!</title>
        <link rel="icon" href="/noodles.png" />
      </Head>
      <main className="flex flex-col w-full">
        <h1 className="absolute w-full flex justify-center bg-opacity-25 bg-white">
          <img src="chowmeow.png" className="my-3 w-64 h-18" />
        </h1>
        <div className="">
          <App
            spoonacularKey={props.spoonacularKey}
            youtubeKey={props.youtubeKey}
          />
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

const { SPOONACULAR_KEY, YOUTUBE_KEY } = process.env;

export async function getServerSideProps(context) {
  return {
    props: {
      spoonacularKey: SPOONACULAR_KEY,
      youtubeKey: YOUTUBE_KEY,
    },
  };
}
