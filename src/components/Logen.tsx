import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Loginscema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  email: string;
  password: string;
  userType: "عميل" | "تاجر" | "صاحب مصنع";
}

const Logen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(Loginscema),
  });
  console.log(errors);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] max-w-[400px] mx-auto grid gap-5 mt-30 px-2"
    >
      <div>
        <input
          placeholder="Your Email"
          {...register("email")}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent xl:w-lg "
        />
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Your Password"
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent xl:w-lg "
        />
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">اختر نوع المستخدم:</label>
        <div className="flex flex-col sm:flex-row gap-4  xl:w-lg ">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="عميل"
              {...register("userType", {
                required: "من فضلك اختر نوع المستخدم",
              })}
            />
            عميل
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="تاجر"
              {...register("userType", {
                required: "من فضلك اختر نوع المستخدم",
              })}
            />
            تاجر
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="صاحب مصنع"
              {...register("userType", {
                required: "من فضلك اختر نوع المستخدم",
              })}
            />
            صاحب مصنع
          </label>
        </div>
        {errors.userType && (
          <p className="text-red-500">{errors.userType.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full border-2 px-2 py-2 border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-gray-800 dark:text-gray-800 dark:hover:text-white"
      >
        Register
      </button>
    </form>
  );
};

export default Logen;
