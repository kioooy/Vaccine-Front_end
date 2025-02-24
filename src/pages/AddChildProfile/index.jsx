import React, { useState } from "react";
import { FaChild, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ChildProfileCreation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    weight: "",
    height: "",
    vaccinations: "",
    parentName: "",
    parentPhone: "",
    address: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-child-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to create profile");
      
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Medical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <textarea
              name="vaccinations"
              placeholder="Previous vaccination history (if any)"
              value={formData.vaccinations}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md h-32"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Parent/Guardian Information</h3>
            <input
              type="text"
              name="parentName"
              placeholder="Parent/Guardian Name"
              value={formData.parentName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="tel"
              name="parentPhone"
              placeholder="Phone Number"
              value={formData.parentPhone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md h-32"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 to-purple-500/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1576495199011-eb94736d05d6)`,
      backgroundSize: "cover",
      backgroundBlendMode: "overlay"
    }}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <FaChild className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create Child Profile</h2>
          <div className="mt-2 flex justify-center space-x-2">
            {[1, 2, 3].map(num => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full ${step === num ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-auto"
              >
                Create Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildProfileCreation;