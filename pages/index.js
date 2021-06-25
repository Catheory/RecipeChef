import Head from "next/head";
import App from "../components/App";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Chow Meow Now!</title>
        <link rel="icon" href="/noodles.png" />
        <meta
          name="image"
          property="og:image"
          content="https://chowmeownow.com/meta-image.png"
        />
        <meta
          name="description"
          property="og:description"
          content="Cook what's in your fridge!"
        />
      </Head>
      <main className="flex flex-col w-full overflow-hidden">
        <h1 className="absolute w-full flex justify-center bg-opacity-25 bg-white">
          <img src="chowMeow.png" className="my-3 w-64 h-18" />
        </h1>
        <div>
          <App
            spoonacularKey={props.spoonacularKey}
            youtubeKey={props.youtubeKey}
          />
        </div>
      </main>
    </>
  );
}

const { SPOONACULAR_KEY2, YOUTUBE_KEY } = process.env;

export async function getServerSideProps(context) {
  return {
    props: {
      spoonacularKey: SPOONACULAR_KEY2,
      youtubeKey: YOUTUBE_KEY,
    },
  };
}
