import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { confirmPasswordReset, errorMsg } = useAuthContext();

  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await confirmPasswordReset({
      uid,
      token,
      new_password: data.password,
    });

    if (response?.success) {
      setSuccessMsg(response.message);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          {errorMsg && <ErroAlert error={errorMsg} />}

          {successMsg && (
            <div role="alert" className="alert alert-success">
              <span>{successMsg}</span>
            </div>
          )}

          <h2 className="text-2xl font-bold">Set New Password</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

            {/* New Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.confirm_password ? "input-error" : ""
                }`}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />

              {errors.confirm_password && (
                <span className="label-text-alt text-error">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>

            <button className="btn btn-primary w-full">
              Reset Password
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
