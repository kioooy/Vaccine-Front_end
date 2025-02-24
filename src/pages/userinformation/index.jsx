import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { format } from "date-fns";

const UserInformation = () => {
  const [formData, setFormData] = useState({
    id: "USER123",
    username: "john_doe",
    password: "",
    confirmPassword: "",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St, City",
    gender: "male",
    dateOfBirth: "1990-01-01",
    registeredDate: "2023-01-01"
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
    
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "username":
        if (value.length < 4 || value.length > 20) {
          newErrors.username = "Username must be between 4 and 20 characters";
        } else {
          delete newErrors.username;
        }
        break;

      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
          newErrors.password = "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.name = "Name can only contain letters and spaces";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (!/^\d{10,11}$/.test(value.replace(/\D/g, ""))) {
          newErrors.phone = "Phone number must be 10-11 digits";
        } else {
          delete newErrors.phone;
        }
        break;

      case "address":
        if (value.length > 200) {
          newErrors.address = "Address cannot exceed 200 characters";
        } else {
          delete newErrors.address;
        }
        break;

      case "gender":
        if (!value) {
          newErrors.gender = "Please select a gender";
        } else {
          delete newErrors.gender;
        }
        break;

      case "dateOfBirth":
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          newErrors.dateOfBirth = "You must be at least 18 years old";
        } else {
          delete newErrors.dateOfBirth;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log("User information updated:", formData);
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every(value => value !== "")
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update User Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} max={format(new Date(), "yyyy-MM-dd")} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;
