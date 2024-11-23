import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between items-center">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <img
                src={logo}
                alt="Hiring Booth Logo"
                className="h-20 cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* Menu Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Menu
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/about-us" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/career" className="hover:underline">
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="#"
                    className="hover:underline"
                    aria-label="Visit our LinkedIn"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline"
                    aria-label="Join us on Discord"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="https://hiringbooth.in/" className="hover:underline">
              Hiring-Booth
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Visit our Facebook page"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Follow us on Twitter"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" />
              </svg>
            </a>
            {/* Add more icons here as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
