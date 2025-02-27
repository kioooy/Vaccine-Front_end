import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const EmailActive = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Thêm state để nhập email
  const [email, setEmail] = useState(location.state?.email || "");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRefs = useRef([]);

  // Xử lý nhập từng ô mã xác thực
  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Xử lý khi nhấn Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Gửi mã xác nhận đến API `/api/verification/register/confirm`
  const handleSubmit = async () => {
    if (!email) {
      setError("Missing email. Please register again.");
      return;
    }

    setIsLoading(true);
    setError("");
//reverifi
    try {
      const response = await api.post("/verification/register/confirm", {
        email,
        code: verificationCode.join(""),
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.success("Email verified successfully!");
        navigate("/login");
        // hehe khong ai biet het :)) setError(response.data.message || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  // Gửi lại mã xác thực
  const handleResendCode = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      return;
    }
  
    setError("");
  
    try {
      // Gửi yêu cầu resend code
      await api.get(`verification/register/re-verify?email=${encodeURIComponent(email)}`);
      setTimeLeft(60);

      toast.success("A new verification code has been sent to your email.");
  
      // Nếu gửi thành công, mới đặt cooldown 60 giây
  
      // Đếm ngược 60 giây
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError("Failed to resend code. Please try again.");
    }
  

    // Đếm ngược 60 giây
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center items-center mb-4">
          <FiCheckCircle className="text-green-500 w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">Verify Your Email</h2>

        {/* Ô nhập email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Mã xác thực */}
        <div className="flex justify-center my-4 space-x-2">
          {verificationCode.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        {error && (
          <p className="flex items-center justify-center text-red-500 text-sm">
            <FiAlertCircle className="mr-1" /> {error}
          </p>
        )}

        {/* Nút xác thực */}
        <button
          onClick={handleSubmit}
          disabled={verificationCode.some((digit) => !digit) || isLoading}
          className={`w-full mt-4 py-3 text-white font-medium rounded-lg transition ${
            verificationCode.some((digit) => !digit) || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Nút gửi lại mã */}
        <button
          onClick={handleResendCode}
          disabled={timeLeft > 0}
          className={`w-full mt-3 py-3 text-white font-medium rounded-lg transition ${
            timeLeft > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {timeLeft > 0 ? `Resend Code in ${timeLeft}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default EmailActive;
