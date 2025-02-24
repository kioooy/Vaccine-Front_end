import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`bg-blue-100 min-h-screen transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-yellow-400 py-4 px-8 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold text-blue-800">VACCINE CITY</h1>
        <div>
          <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-blue-700 transition duration-300">Đăng ký</button>
          <button onClick={() => navigate("/register")} className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900 transition duration-300">Đăng nhập</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-300 py-2 text-center shadow-md">
        <ul className="flex justify-center space-x-6 text-white font-semibold">
          {['Trang chủ', 'Giới thiệu', 'Vắc xin trẻ em', 'Thông tin tiêm chủng', 'Bảng giá', 'Dịch vụ', 'Bệnh học', 'Hotline'].map((item, index) => (
            <li key={index} className="hover:text-yellow-300 transition duration-300 cursor-pointer">{item}</li>
          ))}
        </ul>
      </nav>

      {/* Thông tin */}
      <section className="py-8">
        <h2 className="text-center text-yellow-500 font-bold text-2xl">THÔNG TIN</h2>
        <div className="flex justify-center mt-4 space-x-6">
          {["Dịch vụ y khoa", "Tìm bác sĩ", "Đặt lịch khám bệnh", "Hỏi đáp"].map((text, i) => (
            <div key={i} className="bg-white shadow-lg p-4 text-center rounded-lg w-40 hover:scale-105 transition duration-300 cursor-pointer">
              <p className="text-blue-700 font-semibold">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gói khám */}
      <section className="py-8 bg-yellow-200">
        <h2 className="text-center text-yellow-600 font-bold text-2xl">GÓI KHÁM</h2>
        <div className="max-w-4xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Gói tiêm chủng 0 - 12 tháng", price: "8.930.000 đ", img: "image1.png" },
            { title: "Gói tiêm chủng 1 - 2 tuổi", price: "6.500.000 đ", img: "image2.png" },
            { title: "Gói tiêm chủng 3 - 6 tuổi", price: "7.200.000 đ", img: "image3.png" }
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl hover:scale-105 transition duration-300">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-bold text-blue-700 mt-4">{item.title}</h3>
              <p className="text-red-500 font-bold text-xl">{item.price}</p>
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 transition duration-300">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>

      {/* Tin tức & Sự kiện */}
      <section className="py-8">
        <h2 className="text-center text-yellow-500 font-bold text-2xl">TIN TỨC & SỰ KIỆN</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {["news1.png", "news2.png"].map((img, i) => (
            <div key={i} className="bg-white shadow-lg p-4 rounded-lg hover:scale-105 transition duration-300 cursor-pointer">
              <img src={img} alt="Tin tức" className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-bold text-blue-700 mt-2">Bài viết {i + 1}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Đặt lịch hẹn */}
      <section className="py-8 bg-gray-100">
        <h2 className="text-center text-yellow-500 font-bold text-2xl">ĐẶT LỊCH HẸN</h2>
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-4">
          <input type="text" placeholder="Họ và tên" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4" />
          <input type="text" placeholder="Số điện thoại" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4" />
          <input type="date" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4" />
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Đặt lịch</button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
