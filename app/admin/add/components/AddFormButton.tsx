export default function AddFormButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn my-3 bg-base-content text-xl text-base-100 hover:bg-primary hover:animate-pulse duration-300 w-1/2 self-center"
    >
      {isLoading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        "Criar"
      )}
    </button>
  );
}
