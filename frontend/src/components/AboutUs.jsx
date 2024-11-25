const AboutUs = () => (
  <div className="min-h-screen bg-white text-gray-800 p-6 flex flex-col items-center">
    <Header />
    <Services />
    <News />
    <Contact />
    <Location />
  </div>
);

const Header = () => (
  <header className="text-center mb-12">
    <h1 className="text-4xl sm:text-5xl font-bold text-[#003b8d] select-none">
      Welcome to HiringBooth
    </h1>
    <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-2xl mx-auto select-none">
      At Hiring-Booth, we are committed to bridging the gap between talent and
      opportunity. Our innovative solutions empower individuals and
      organizations to achieve their goals through recruitment, training, and
      strategic consulting services.
    </p>
  </header>
);

const Section = ({ title, children }) => (
  <section className="w-full max-w-5xl mb-12">
    <h2 className="text-3xl sm:text-4xl font-semibold text-blue-500 mb-6 select-none">
      {title}
    </h2>
    {children}
  </section>
);

const Services = () => {
  const services = [
    {
      title: "End-to-End Recruitment",
      description:
        "From identifying top talent to onboarding, we provide comprehensive recruitment solutions tailored to your business needs.",
      icon: "🔍",
    },
    {
      title: "Professional Training Programs",
      description:
        "Empower your workforce with our customized training programs designed to enhance skills and boost productivity.",
      icon: "🎓",
    },
    {
      title: "Career Development Services",
      description:
        "Personalized career counseling, resume optimization, and interview preparation to help job seekers shine.",
      icon: "🌟",
    },
    {
      title: "Industry Insights and Analytics",
      description:
        "Stay ahead with detailed industry reports and analytics to guide strategic decision-making.",
      icon: "📊",
    },
    {
      title: "Employee Retention Strategies",
      description:
        "Innovative solutions to improve employee satisfaction and retention rates for sustainable growth.",
      icon: "💼",
    },
  ];

  return (
    <Section title="Our Services">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
        {services.map(({ title, description, icon }, i) => (
          <div
            key={i}
            className="bg-blue-50 p-6 rounded-lg shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4 text-blue-500">{icon}</div>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 select-none">
              {title}
            </h3>
            <p className="text-gray-600 mt-2 select-none">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const News = () => {
  const news = [
    {
      title: "Introducing Advanced Training Programs",
      content:
        "We are excited to launch new training modules focused on emerging industries and technologies.",
    },
    {
      title: "Expansion into Global Markets",
      content:
        "Hiring-Booth is now offering services in multiple new regions to support a diverse client base.",
    },
  ];

  return (
    <Section title="Latest News">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
        {news.map(({ title, content }, i) => (
          <article key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl sm:text-2xl font-medium text-blue-600 select-none">
              {title}
            </h3>
            <p className="text-gray-600 mt-2 select-none">{content}</p>
          </article>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => (
  <Section title="Contact Us">
    <div className="flex flex-col sm:flex-row justify-between items-start">
      {/* Contact Details */}
      <div className="mb-8 sm:mb-0 sm:w-1/2">
        <h3 className="text-xl sm:text-2xl font-medium text-blue-600 mb-4">
          Get in Touch
        </h3>
        <p className="text-gray-600 mb-4">
          We are here to help! Reach out to us for inquiries, support, or
          collaboration opportunities.
        </p>
        <ul className="space-y-3">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@hiringbooth.com" className="text-blue-500">
              contact@hiringbooth.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 (234) 567-890
            </a>
          </li>
          <li>
            <strong>Address:</strong>{" "}
            <span className="text-gray-700">
              123 Recruitment Lane, Job City
            </span>
          </li>
        </ul>
      </div>
      {/* Contact Form */}
      <ContactForm />
    </div>
  </Section>
);

const ContactForm = () => (
  <form className="bg-blue-50 p-6 rounded-lg shadow-lg sm:w-1/2">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
      {["Name", "Email"].map((label, i) => (
        <div key={i}>
          <label
            htmlFor={label.toLowerCase()}
            className="block text-gray-600 mb-2"
          >
            {label}
          </label>
          <input
            id={label.toLowerCase()}
            type={label.toLowerCase()}
            placeholder={`Your ${label}`}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
          />
        </div>
      ))}
    </div>
    <div className="mb-4">
      <label htmlFor="message" className="block text-gray-600 mb-2">
        Message
      </label>
      <textarea
        id="message"
        rows="4"
        placeholder="Your Message"
        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
      ></textarea>
    </div>
    <button
      type="submit"
      className="bg-[#003b8d] text-white p-3 rounded w-full hover:bg-blue-700 transition-colors"
    >
      Send Message
    </button>
  </form>
);

const Location = () => (
  <Section title="Our Location">
    <iframe
      title="Our Location"
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14660.01033764592!2d77.345632!3d23.2793558!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c670cd9fd51b9%3A0xee1884da131ec03c!2sHiringBooth!5e0!3m2!1sen!2sin!4v1732366159244!5m2!1sen!2sin"
      width="100%"
      height="300"
      className="border-0 rounded-lg shadow-lg"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </Section>
);

export default AboutUs;
