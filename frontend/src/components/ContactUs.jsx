import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Let's <span className="text-blue-600">Talk!</span>
        </h1>
        <p className="text-lg text-gray-600">
          Have a question? A great idea? Or just want to say hi? We're here for
          you! 🎉
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How You Can Reach Us
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you prefer emails, calls, or visiting us in person, we’d
              love to connect! 🚀
            </p>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <i className="fas fa-map-marker-alt text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Our Address
                  </h3>
                  <p className="text-gray-600">
                    C23, Kailash Nagar, CTO Road, Bairagarh, Bhopal - 462030
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <i className="fas fa-phone-alt text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Call Us</h3>
                  <p className="text-gray-600">
                    +91 6264 6138 66 / 82699 41391
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                  <i className="fas fa-envelope text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Email Us
                  </h3>
                  <p className="text-gray-600">info@hiringbooth.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Drop Us a Line
            </h2>
            <p className="text-gray-600 mb-6">
              We usually respond within 24 hours. Let’s make magic happen! ✨
            </p>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="yourname@example.com"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Tell us something exciting..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-gray-200"></div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Us Here
          </h2>
          <p className="text-center text-gray-600 mb-6">
            We’re right here, waiting to welcome you! 💙
          </p>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2377.123457123!2d77.4451412!3d23.2600425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x123456789abcdefg%3A0xabcdef123456789!2sC23%2C%20Kailash%20Nagar%2C%20CTO%20Road%2C%20Bairagarh%2C%20Bhopal%20-%20462030!5e0!3m2!1sen!2sin!4v123456789"
              width="100%"
              height="400"
              allowFullScreen
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
