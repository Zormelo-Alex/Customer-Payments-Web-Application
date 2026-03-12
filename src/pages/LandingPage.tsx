import React from "react";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const LandingPage: React.FC = () => {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-xl animate-bounce">
            <img
              src="https://niceillustrations.com/wp-content/uploads/2021/03/Successful-Payment-color-800px.png"
              alt=""
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Payment Dashboard
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            View and manage customer payments effortlessly. Track transaction
            history, access detailed payment records, and stay on top of your
            shop's finances with ease.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 text-black font-medium hover:bg-gray-300 transition">
              View All Payments
              <MdOutlinePayments className="w-4 h-4" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition"
              title="View github repository"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
