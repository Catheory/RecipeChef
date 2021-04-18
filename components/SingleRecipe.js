export default function SingleRecipe(props) {
  const { recipeDetail } = props;
  return (
    <div className="h-80">
      <div className="flex flex-row mx-10 left-0 absolute w-screen">
        <img src={recipeDetail.image} className="my-5" />
        <h2>{recipeDetail.title}</h2>
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: recipeDetail.summary,
            }}
          ></div>
        </p>
      </div>
    </div>
  );
}
