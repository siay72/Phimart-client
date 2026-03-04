import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Fetch user Profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

  // Update User Profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // After login set user
      await fetchUserProfile();
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

// Request Password Reset
const requestPasswordReset = async (email) => {
  setErrorMsg("");
  try {
    await apiClient.post("/auth/users/reset_password/", {
      email,
    });

    return {
      success: true,
      message: "Password reset email sent. Check your inbox.",
    };
  } catch (error) {
    return handleAPIError(error, "Failed to send reset email");
  }
};

// Confirm Reset Password
const confirmPasswordReset = async (data) => {
  setErrorMsg("");
  try {
    await apiClient.post(
      "/auth/users/reset_password_confirm/",
      data
    );

    return {
      success: true,
      message: "Password reset successful. You can login now.",
    };
  } catch (error) {
    return handleAPIError(error, "Password reset failed");
  }
};

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration Failed! Try Again");
    }
  };
  // Resend Activation Email
const resendActivationEmail = async (email) => {
  setErrorMsg("");

  try {
    await apiClient.post("/auth/users/resend_activation/", {
      email,
    });

    return {
      success: true,
      message: "Activation email resent successfully.",
    };
  } catch (error) {
    return handleAPIError(error, "Failed to resend activation email");
  }
};

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset,
    resendActivationEmail,
  };
};

export default useAuth;