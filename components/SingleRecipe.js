export default function SingleRecipe(props) {
  const { isLoading, onRecipe, recipeDetail, youtubeVideo } = props;
  const instructions = recipeDetail.analyzedInstructions
    ? recipeDetail.analyzedInstructions
    : "";
  const id = youtubeVideo.id ? youtubeVideo.id.videoId : "";

  return (
    <div className="singlerecipe-container  h-screen md:my-16 justify-center">
      <div className="singlerecipe  absolute flex flex-col h-screen overflow-y-auto box-border">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <img src="loader.svg" className="loader" />
          </div>
        ) : (
          <div>
            <div className="closebutton">
              <img
                src="x-mark.png"
                onClick={() => {
                  onRecipe(recipeDetail.id);
                }}
              />
            </div>
            <div className="max-w-full flex my-5 md:items-center justify-center max-width-90-vw">
              <h1 className="font-extrabold text-left text-3xl md:text-5xl">
                {recipeDetail.title}
              </h1>
              <img className="h-40 md:h-60" src="eating-girl.png" />
            </div>
            <div className="recipeContent flex flex-col-reverse md:flex-row">
              <div className="md:w-1/2 md:ml-6 md:my-5 md:pr-10">
                <div className="md:mt-8">
                  <h2 className="text-2xl font-bold my-6">Instructions</h2>
                  {!instructions[0] ? (
                    ""
                  ) : (
                    <ol className="list-decimal text-lg mx-4 md:mx-6">
                      {instructions[0].steps.map((stp) => (
                        <li key={stp.number} className="mb-6">
                          {stp.step}
                        </li>
                      ))}
                    </ol>
                  )}
                  <div className="font-bold text-lg my-10">
                    <p className="mb-8">
                      For more detailed instructions, click the button below.
                    </p>
                    <a
                      target="_blank"
                      href={recipeDetail.sourceUrl}
                      className="checkbutton focus:ring font-bold text-white"
                    >
                      <span>check it out</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mx-5 my-16 md:pl-10">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
