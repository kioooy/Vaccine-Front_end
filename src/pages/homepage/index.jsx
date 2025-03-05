import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";


const Navigation = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
        <img
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
                alt="Logo"
                className="h-10 w-auto"
              />          <span className="text-xl text-gray-800">Vaccine City</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => scrollToSection("about")} className="text-gray-600 hover:text-blue-600">About Us</button>
          <button onClick={() => scrollToSection("services")} className="text-gray-600 hover:text-blue-600">Services</button>
          <button onClick={() => scrollToSection("packages")} className="text-gray-600 hover:text-blue-600">Vaccination Packages</button>
          <button onClick={() => scrollToSection("booking")} className="text-gray-600 hover:text-blue-600">Booking Schedule</button>
          <div className="relative">
            <FaSearch className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" placeholder="Search" className="pl-10 pr-4 py-1 border rounded-full focus:outline-none focus:border-blue-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Homepage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    package: "",
    date: "",
    time: ""
  });

  const [showModal, setShowModal] = useState(false);

  const packages = [
    {
      title: "0-12 Months Package",
      vaccines: ["BCG", "DPT", "Polio", "Hepatitis B"],
      price: "$299",
      description: "Essential vaccines for newborns and infants up to 12 months"
    },
    {
      title: "13-24 Months Package",
      vaccines: ["MMR", "Chickenpox", "Hepatitis A", "Booster Shots"],
      price: "$399",
      description: "Comprehensive vaccine package for toddlers"
    }
  ];

  const news = [
    {
      title: "New Vaccine Guidelines Released",
      date: "2024-01-15",
      description: "Updated vaccination schedules and recommendations for children."
    },
    {
      title: "Free Vaccination Camp",
      date: "2024-01-20",
      description: "Join our community vaccination drive this weekend."
    },
    {
      title: "COVID-19 Updates for Children",
      date: "2024-01-25",
      description: "Latest information about COVID-19 vaccination for kids."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-green-50">
  <div className="max-w-6xl mx-auto text-center">
    {/* Tiêu đề Vaccine City */}
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Vaccine City</h1>

    <div className="relative h-64 rounded-xl overflow-hidden">
      {/* Hình ảnh */}
      <img
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
        alt="Happy children"
        className="w-full h-full object-cover"
      />

      {/* Dòng chữ nằm trên hình */}
      <h1 className="absolute inset-0 flex items-center justify-center  text-3xl md:text-4xl font-bold text-white bg-black/40">
        Vaccine City For Better Health
      </h1>
    </div>
    
    {/* Đoạn mô tả */}
    <p className="text-lg text-gray-600 mt-8 max-w-3xl mx-auto">
    Chúng tôi là Vaccine City, cam kết mang đến những chương trình tiêm chủng an toàn, hiệu quả và dễ tiếp cận cho trẻ em. Với đội ngũ y tế tận tâm và quy trình chuẩn quốc tế, chúng tôi giúp các bậc phụ huynh an tâm bảo vệ sức khỏe con yêu ngay từ những năm tháng đầu đời.
    </p>
  </div>
</section>


      <section id="packages" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Vaccination Packages</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{pkg.title}</h3>
                <ul className="mb-4 space-y-2">
                  {pkg.vaccines.map((vaccine, idx) => (
                    <li key={idx} className="text-gray-600">✓ {vaccine}</li>
                  ))}
                </ul>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{pkg.price}</p>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest News & Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <p className="text-sm text-blue-600 mb-2">{item.date}</p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 hover:text-blue-700">Read More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <select
                className="w-full p-3 border rounded-lg"
                required
                onChange={(e) => setFormData({...formData, package: e.target.value})}
              >
                <option value="">Select Package</option>
                <option value="0-12">0-12 Months Package</option>
                <option value="13-24">13-24 Months Package</option>
              </select>
              <input
                type="time"
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaPhone className="text-4xl text-blue-600 mb-4" />
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-4xl text-blue-600 mb-4" />
              <p className="text-gray-600">contact@vaccinecity.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-4xl text-blue-600 mb-4" />
              <p className="text-gray-600">123 Health Street, Medical District</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <FaFacebook className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer" />
            <FaTwitter className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer" />
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Appointment Confirmed!</h3>
            <p className="text-gray-600 mb-6">We'll contact you shortly to confirm your appointment details.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;