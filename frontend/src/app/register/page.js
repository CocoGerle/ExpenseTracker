"use client";

import { GeldIcon } from "@/assets/icons/GeldIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/utils/AuthProvider";
import { useFormik } from "formik";
import * as yup from "yup";

const Register = () => {
  const { register } = useAuth();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
  };
  const onSubmit = async (values) => {
    await register(values.name, values.email, values.password);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Хэрэглэгчийн нэр оруулна уу!")
      .min(3, "Хамгийн багадаа 3 урттай байх ёстой."),
    email: yup
      .string()
      .email("Алдаатай email байна.")
      .required("Хэрэглэгчийн email оруулна уу!"),
    password: yup
      .string()
      .required("Хэрэглэгчийн нууц үг оруулна уу!")
      .min(8, "Хамгийн багадаа 8 урттай байх ёстой.")
      .matches(/[0-9]/, "Нууц үг тоо агуулсан байх ёстой.")
      .matches(/[a-z]/, "Нууц үг жижиг үсэг агуулсан байх ёстой.")
      .matches(/[A-Z]/, "Нууц үг том үсэг агуулсан байх ёстой."),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Нууц үг таарахгүй байна.")
      .required("Та нууц үгээ ахин оруулна уу"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="flex h-screen w-screen ">
      <div
        className="flex flex-1 flex-col items-center mt-[276px] ml-[222px] gap-[40px]"
        // onSubmit={formik.handleSubmit}
      >
        <GeldIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-[#0F172A] text-[24px] font-semibold ">
            Create Geld account
          </h1>
          <p className="text-[#334155]">
            Sign up below to create your Wallet account
          </p>
        </div>
        <div className="flex flex-col gap-[16px]">
          <Input
            placeholder="Name"
            className="bg-[#F3F4F6] h-[48px] w-[384px]"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <p className="text-red-600 text-[12px]">{formik.errors.name}</p>
          ) : null}
          <Input
            placeholder="Email"
            className="bg-[#F3F4F6] h-[48px]"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <p className="text-red-600 text-[12px]">{formik.errors.email}</p>
          ) : null}
          <Input
            placeholder="Password"
            className="bg-[#F3F4F6] h-[48px]"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <p className="text-red-600 text-[12px]">{formik.errors.password}</p>
          ) : null}
          <Input
            placeholder="Re-Password"
            className="bg-[#F3F4F6] h-[48px]"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />
          {formik.errors.rePassword ? (
            <p className="text-red-600 text-[12px]">
              {formik.errors.rePassword}
            </p>
          ) : null}
        </div>

        <button
          className="bg-[#0166FF] rounded-3xl w-[384px] h-[48px] text-white"
          type="submit"
          onClick={formik.submitForm}
        >
          {" "}
          Sign Up
        </button>
        <div className="flex gap-4">
          <p>Already have account?</p>
          <p className="text-[#0166FF] ">Log in</p>
        </div>
      </div>
      <div className="bg-[#0166FF] flex-1 "></div>
    </div>
  );
};
export default Register;
