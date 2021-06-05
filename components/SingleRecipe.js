export default function SingleRecipe(props) {
  const { recipeDetail, youtubeVideo } = props;
  const instructions = recipeDetail.analyzedInstructions;
  const id = youtubeVideo.id.videoId;

  return (
    <div className="h-screen my-16">
      <div className="flex flex-col mx-10 left-0 absolute w-full max-h-full overflow-y-scroll">
        <div className="flex items-center justify-center max-width-90-vw">
          <h1 className="font-extrabold text-5xl my-5 mr-5">
            {recipeDetail.title}
          </h1>
          <img className="h-72" src="eating-girl.png" />
        </div>
        <div className="flex flex-row mr-20">
          <div className="mr-40 my-5">
            <div className="mt-8">
              <h2 className="sub-title">Instructions</h2>
              {!instructions[0] ? (
                ""
              ) : (
                <ol className="list-decimal mx-6">
                  {instructions[0].steps.map((stp) => (
                    <li key={stp.number}>{stp.step}</li>
                  ))}
                </ol>
              )}
              <div className="font-bold text-lg my-10">
                <p>For more detailed instructions, click the button below.</p>
                <a target="_blank" href={recipeDetail.sourceUrl}>
                  <button className="my-2 py-2 px-2 rounded focus:ring font-bold text-white bg-teal-500  hover:bg-teal-700 ">
                    check it out
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="my-16">
            <iframe
              width="620"
              height="400"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
