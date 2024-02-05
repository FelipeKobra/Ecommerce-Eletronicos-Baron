import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import moment from "moment";
import Image from "next/image";
import "moment/locale/pt-br";
import { Rating } from "@mui/material";

import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

var product: ProductType;
product = product!;

interface UsersRatingProps {
  reviews: typeof product.ProductReview | undefined;
}

export default function UsersRating({ reviews }: UsersRatingProps) {
  if (reviews && reviews.length > 0)
    return (
      <div className="w-full flex flex-col gap-4 my-5">
        <hr className="w-1/3" />
        <h2 className="text-3xl font-medium mb-6">Análises dos Consumidores</h2>
        {reviews.map((review) => {
          return (
            <div key={review.id} className="flex flex-col gap-2">
              <div className="flex gap-5  items-center">
                {review.user.image && review.user.image.length > 2 ? (
                  <Image
                    className="rounded-full"
                    src={review.user.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                ) : (
                  <AccountCircleRoundedIcon
                    className="w-[40px] h-[40px]"
                    fontSize="large"
                  />
                )}

                <p className="font-bold text-lg">{review.user.name}</p>
                <p>{moment(review.createdDate).locale("pt-br").fromNow()}</p>
              </div>
              <div>
                <Rating readOnly value={review.rating} />
              </div>

              <div className="w-1/2">
                <p>{review.comment}</p>
              </div>
              <hr className="w-1/3 mt-4" />
            </div>
          );
        })}
      </div>
    );
}
