import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ResumeForm from "./components/ResumeForm";
import StudentList from "./components/students/StudentList";
import StudentDetails from "./components/students/StudentDetails";
import Footer from "./components/shared/Footer";
import Counselor from "./components/Counselor";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

// Layout Component for Navbar and Header
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar /> {/* Fixed Navbar */}
      </header>
      <main className="flex-grow px-4 sm:px-6 md:px-8">
        <Outlet /> {/* Dynamic content goes here */}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

const appRouter = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Layout />, // Wrap all routes in Layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/resumeBuilder",
        element: <ResumeForm />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/description/:id",
        element: <JobDescription />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/counselor",
        element: <Counselor />,
      },
      // Admin routes
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute>
            <CompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoute>
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        ),
      },
      // Student directory routes
      {
        path: "/admin/students",
        element: (
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/students/:id",
        element: (
          <ProtectedRoute>
            <StudentDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
