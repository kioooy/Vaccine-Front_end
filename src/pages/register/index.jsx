import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaGoogle,
} from "react-icons/fa";
import { auth } from "../../config/firebase";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    password: "",
    gender: "",
    terms: false,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const fieldRefs = useRef({});


  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      if (errors[key] && fieldRefs.current[key]) {
        fieldRefs.current[key].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }, [errors]);

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }

    validateField(name, type === "checkbox" ? checked : value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value) newErrors.name = "Full name is required";
        else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(value))
          newErrors.name = "Only alphabets and spaces allowed";
        else delete newErrors.name;
        break;

      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;

      case "phone":
        if (!value) newErrors.phone = "Phone number is required";
        else if (!/^[0-9]{10,15}$/.test(value))
          newErrors.phone = "Invalid phone number format";
        else delete newErrors.phone;
        break;

      case "address":
        if (!value) newErrors.address = "Address is required";
        else if (value.length < 5)
          newErrors.address = "Address must be at least 5 characters";
        else delete newErrors.address;
        break;

      case "dob":
        if (!value) newErrors.dob = "Date of birth is required";
        else if (new Date(value) > new Date())
          newErrors.dob = "Invalid date of birth";
        else delete newErrors.dob;
        break;

      case "username":
        if (!value) newErrors.username = "Username is required";
        else if (value.length < 6)
          newErrors.username = "Username must be at least 6 characters";
        else if (value.length > 16)
          newErrors.username = "Username must not exceed 16 characters";
        else if (!/^[a-zA-Z0-9]+$/.test(value))
          newErrors.username = "Only alphanumeric characters allowed";
        else delete newErrors.username;
        break;

      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8)
          newErrors.password = "Password must be at least 8 characters";
        else if (!/(?=.*[A-Z])/.test(value))
          newErrors.password = "Include at least one uppercase letter";
        else if (!/(?=.*[a-z])/.test(value))
          newErrors.password = "Include at least one lowercase letter";
        else if (!/(?=.*[0-9])/.test(value))
          newErrors.password = "Include at least one number";
        else if (!/(?=.*[!@#$%^&*])/.test(value))
          newErrors.password = "Include at least one special character";
        else delete newErrors.password;
        break;

      case "gender":
        if (!value) newErrors.gender = "Gender is required";
        else delete newErrors.gender;
        break;

      case "terms":
        if (!value)
          newErrors.terms = "You must accept the terms and conditions";
        else delete newErrors.terms;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});



    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key] === false) {
        newErrors[key] = "Information is missing";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("authentication/register", formData);
      toast.success("Successfully created a new account! Please verify your email.");
      navigate("/verify-email?email=" + encodeURIComponent(formData.email));
    } catch (err) {
      setIsLoading(false);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        toast.error("Registration failed! Please try again.");
      }
    }
  };



  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-red-400";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-green-500";
      case 5:
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };

  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = result.user.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {isSuccess ? (
          <div className="text-center">
            <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Registration Successful!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you for registering with us.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Another Account
            </button>

          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join us today to ensure your family medical health!
              </p>
            </div>


            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.username ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="username123"
                  />

                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={(e) => {
                      e.preventDefault(); // Ngăn sự kiện không mong muốn
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500 cursor-pointer" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                {formData.password && ( // Chỉ hiển thị khi có giá trị trong trường mật khẩu
                  <div className="mt-2">
                    <div className="text-sm text-gray-600 mb-1">
                      Password strength:
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="John Doe"
                    />

                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.email ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="you@example.com"
                    />

                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.phone ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="123-456-7890"
                    />

                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.address ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="123 Main St, City, Country"
                    />

                  </div>
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="gender-male"
                        name="gender"
                        type="radio"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="gender-male"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="gender-female"
                        name="gender"
                        type="radio"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="gender-female"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.dob ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />

                  </div>
                  {errors.dob && (
                    <p className="mt-2 text-sm text-red-600">{errors.dob}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Register"
                  )}
                </button>


              </div>

              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div
                onClick={handleLoginGoogle}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="text-red-500 mr-2" />
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
