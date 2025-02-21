import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MdEmail, MdCheckCircle, MdError } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import api from "../../config/axios"; // Import API instance

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.post("/authentication/verify-email", { token });
        setVerificationStatus("success");
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown, canResend]);

  const handleResendVerification = async () => {
    if (canResend) {
      try {
        setCanResend(false);
        setCountdown(60);

        await api.post("/authentication/resend-verification", { token });

        console.log("Verification email resent");
      } catch (error) {
        console.error("Resend error:", error);
        setCanResend(true);
        setCountdown(0);
      }
    }
  };

  const handleProceed = () => {
    if (verificationStatus === "success") {
      navigate("/login");
    }
  };

  const renderStatusIcon = () => {
    switch (verificationStatus) {
      case "success":
        return <MdCheckCircle className="w-20 h-20 text-green-500" />;
      case "error":
        return <MdError className="w-20 h-20 text-red-500" />;
      default:
        return <BiLoaderAlt className="w-20 h-20 text-blue-500 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <MdEmail className="mx-auto h-12 w-12 text-blue-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {verificationStatus === "success"
            ? "Your email has been verified successfully!"
            : "We've sent a verification link to your email address."}
        </p>

        <div className="flex justify-center mt-4">{renderStatusIcon()}</div>

        {verificationStatus === "error" && (
          <p className="text-red-500 mt-4">
            Verification failed. Please try again or contact support.
          </p>
        )}

        {verificationStatus === "success" && (
          <button
            onClick={handleProceed}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed to Login
          </button>
        )}

        <button
          onClick={handleResendVerification}
          disabled={!canResend}
          className={`mt-4 px-4 py-2 rounded ${
            canResend ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"
          }`}
        >
          {canResend ? "Resend Verification Email" : `Resend available in ${countdown}s`}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
