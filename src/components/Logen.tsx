import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Loginscema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  email: string;
  password: string;
}

const Logen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(Loginscema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" justify-center items-center h-[220px]  gap- my-auto grid mt-30 "
    >
      <div>
        <input
          placeholder="Your Email"
          {...register("email", { required: true, minLength: 5 })}
          className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-md bg-transparent"
        />
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          placeholder="Your Password"
          {...register("password", { required: true, minLength: 5 })}
          className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-md bg-transparent"
        />
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button className="border-2 outline-none w-md px-2 py-2    border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-gray-800 dark:text-gray-800 dark:hover:text-white">
        Register
      </button>
    </form>
  );
};

export default Logen;
