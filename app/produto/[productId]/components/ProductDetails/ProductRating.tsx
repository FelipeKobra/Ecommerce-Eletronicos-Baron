import { Rating } from "@mui/material"

interface ProductRating {
    notaFinal:number,
    notas:number[],
}


export default function ProductRating({notaFinal, notas}:ProductRating) {
  return (
    <div className="flex items-center">
    <Rating className="mr-4" readOnly value={notaFinal} />
    <p>
      {notas.length}{" "}
      {notas.length > 1 ? "reviews" : "review"}{" "}
    </p>
    </div>
  )
}
