export default function StarRating({rating}:any) {
  return (
    <div className={"rating w-full flex justify-center items-center my-4"}>
      {[...Array(5)].map((_, i) => (
        <input
          type="radio"
          value={i + 1}
          name="rating-1"
          className={`mask mask-star-2 ${isNaN(rating) ? "bg-orange-200" : "bg-orange-400"}`}
          aria-label={`Rate ${i + 1} out of 5`}
          key={i}
          {...(Math.floor(rating) === (i + 1) && { checked: true })}
        />
      ))}
    </div>
  );
}