import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Rgester } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
// import axiosinstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  userType: "عميل" | "تاجر" | "صاحب مصنع";
}

const Regester = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(Rgester),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const role =
        data.userType === "عميل"
          ? "user"
          : data.userType === "تاجر"
          ? "merchant"
          : "industry"; // "صاحب مصنع"

      const newData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: role,
      };
      console.log(data);

      await axios.post("http://localhost:3000/api/auth/signup", newData);

      toast.success("تم التسجيل بنجاح!");
      // navigate("/Logen");
    } catch (error) {
      const errorObj = error as AxiosError;
      console.log(errorObj);
      toast.error("فشل في التسجيل");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] max-w-[400px] mx-auto grid gap-5 mt-1 px-2"
    >
      <div>
        <input
          placeholder="Your First Name"
          {...register("name", { required: true, minLength: 5 })}
          className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent   "
        />
        {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
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
      <input
        placeholder="Your Password"
        {...register("password", { required: true, minLength: 5 })}
        className="w-full border border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md bg-transparent xl:w-lg "
      />
      {errors?.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">اختر نوع المستخدم:</label>
        <div className="flex flex-col  sm:flex-col gap-4 ">
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

      <button className="w-full border-2 px-2 py-2 border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-gray-800 dark:text-gray-800 dark:hover:text-white xl:w-lg ">
        Register
      </button>
    </form>
  );
};

export default Regester;
