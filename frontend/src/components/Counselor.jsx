import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MailIcon, PhoneIcon } from "lucide-react";

const Counselor = () => {
  const counselor = {
    name: "Aman Verma",
    phoneNumber: "6264613866",
    email: "amanverma.hr10@gmail.com",
    photo: "https://example.com/aman.jpg", // Replace with actual image link
    bio: "Aman Verma is a certified HR professional with expertise in counseling and career development. He has helped numerous individuals achieve their professional goals and navigate their career paths effectively.",
  };

  const handleCall = () => {
    window.location.href = `tel:${counselor.phoneNumber}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${counselor.email}`;
  };

  //   const handleWhatsApp = () => {
  //     window.location.href = `https://wa.me/${counselor.phoneNumber}`;
  //   };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-16 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Counselor Profile */}
        <div className="flex items-center space-x-6">
          <Avatar>
            <AvatarImage src={counselor.photo} alt={counselor.name} />
            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {counselor.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Certified HR Professional & Counselor
            </p>
          </div>
        </div>

        {/* Counselor Bio */}
        <div className="text-gray-700 mt-6">
          <p className="text-lg">{counselor.bio}</p>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Contact Information
          </h3>

          {/* Contact Methods */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button
              onClick={handleCall}
              className="flex items-center justify-center w-full sm:w-auto bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <PhoneIcon className="mr-2 h-5 w-5" />
              Call
            </Button>

            <Button
              onClick={handleEmail}
              className="flex items-center justify-center w-full sm:w-auto bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <MailIcon className="mr-2 h-5 w-5" />
              Email
            </Button>

            {/* <Button
              onClick={handleWhatsApp}
              className="flex items-center justify-center w-full sm:w-auto bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              WhatsApp
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counselor;
