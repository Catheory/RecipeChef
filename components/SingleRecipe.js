export default function SingleRecipe(props) {
  const { recipeDetail } = props;
  const instructions = recipeDetail.analyzedInstructions;

  return (
    <div className="h-96 my-16">
      <div className="flex flex-col mx-10 left-0 absolute w-full">
        <h1 className="font-extrabold text-5xl my-5">{recipeDetail.title}</h1>
        <div className="flex flex-row mr-20">
          <div className="mr-40 my-5">
            <div
              dangerouslySetInnerHTML={{
                __html: recipeDetail.summary,
              }}
            ></div>
            <ol className="list-decimal mx-4 mt-5">
              {instructions[0].steps.map((stp) => (
                <li key={stp.number}>{stp.step}</li>
              ))}
            </ol>
          </div>
          <img src={recipeDetail.image} />
        </div>
      </div>
    </div>
  );
}
