import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErroAlert from "../ErroAlert";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await apiClient.post("/auth/users/activation/", { uid, token });

        setMessage("Account activated successfully. Redirecting to login...");
        setLoading(false);

        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Please check your activation link.");
        setLoading(false);
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Account Activation</h2>

        {loading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-2">Activating your account...</p>
          </div>
        )}

        {message && (
          <div role="alert" className="alert alert-success">
            <span>{message}</span>
          </div>
        )}

        {error && <ErroAlert error={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;
