import errorImg from "../assets/images/error.svg";

export const ErrorUI = () => {
  return (
    <div className="max-w-screen-lg flex flex-col w-full items-center text-center bg-[var(--neutral-100)] pb-5 rounded-lg mt-4">
      <figure className="w-full px-2 bg-[var(--red-100)] flex justify-center rounded-t-lg">
        <img src={errorImg} alt="" />
      </figure>
      <h1 className="text-xl sm:text-3xl font-bold text-[var(--neutral-900)] mt-4">
        Error: Failed to fetch data
      </h1>
      <p className="text-base text-[var(--neutral-800)]">
        Please check your IP Adress or domain and try again!
      </p>
    </div>
  );
};
