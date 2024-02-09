import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "moment/locale/pt-br";
import { Rating } from "@mui/material";
import moment from "moment";
import Image from "next/image";

import { ProductType } from "@/utils/interfaces/getPrismaItems/getProductById";

var product: ProductType;
product = product!;

interface UsersRatingProps {
  reviews: typeof product.ProductReview | undefined;
}

export default function UsersRating({ reviews }: UsersRatingProps) {
  if (reviews && reviews.length > 0)
    return (
      <div className=" flex flex-col gap-4 w-11/12 md:w-9/12 lg:w-1/2 my-4 pl-4">
        <hr className="w-full"/>
        <h2 className="text-3xl font-medium mb-6 ">Análises dos Consumidores</h2>
        {reviews.map((review) => {
          return (
            <div key={review.id} className="flex flex-col gap-2 w-full">
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

              <div className="w-full">
                <p>{review.comment}</p>
              </div>
              <hr className="w-full mt-4" />
            </div>
          );
        })}
      </div>
    );
}
