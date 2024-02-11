import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface SubmitButton {
  text: string | any;
  isLoading: boolean;
}

export const SubmitButton = ({ text, isLoading }: SubmitButton) => (
  <button
    type="submit"
    className="mt-4 bg-base-content hover:bg-primary duration-300 text-base-100  text-lg shadow font-bold py-3 px-4 rounded flex justify-center items-center cursor-pointer w-full max-w-[30rem]"
  >
    {!isLoading ? (
      text
    ) : (
      <span className="loading loading-spinner loading-lg"></span>
    )}
  </button>
);

export const GoogleSignupButton = () => (
  <div
    onClick={() => signIn("google")}
    className="bg-base-100 hover:bg-base-content hover:text-base-100 hover:border-base-100 duration-300 border-base-content border-2 border-solid text-base-content text-sm sm:text-lg shadow font-bold py-3 px-4 rounded flex justify-center items-center cursor-pointer w-11/12 sm:w-full max-w-[30rem]"
  >
    <FaGoogle />
    <span className="pl-4">Registre-se com Google</span>
  </div>
);
