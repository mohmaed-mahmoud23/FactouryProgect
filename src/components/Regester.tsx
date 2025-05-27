import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Rgester } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  firstName: string;
  email: string;
  password: string;
}

const Regester = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(Rgester),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] max-w-[400px] mx-auto grid gap-5 mt-30 px-2"
    >
      <div>
        <input
          placeholder="Your First Name"
          {...register("firstName", { required: true, minLength: 5 })}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent   "
        />
        {errors?.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Your Email"
          {...register("email", { required: true, minLength: 5 })}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent xl:w-lg "
        />
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Your Password"
          {...register("password", { required: true, minLength: 5 })}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent xl:w-lg "
        />
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button className="w-full border-2 px-2 py-2 border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-gray-800 dark:text-gray-800 dark:hover:text-white xl:w-lg ">
        Register
      </button>
    </form>
  );
};

export default Regester;
