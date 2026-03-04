import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const { requestPasswordReset, errorMsg } = useAuthContext();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const response = await requestPasswordReset(data.email);
    if (response?.success) {
      setMessage(response.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold">Reset Password</h2>

          {errorMsg && <ErroAlert error={errorMsg} />}
          {message && (
            <div className="alert alert-success mt-2">{message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />

            <button className="btn btn-primary w-full">
              Send Reset Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;