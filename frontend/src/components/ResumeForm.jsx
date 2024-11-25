import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ position: "", company: "", duration: "", description: "" }],
    skills: [""],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addSectionItem = (section) => {
    const emptyItem =
      section === "skills" ? "" : { degree: "", school: "", year: "" };
    setFormData({ ...formData, [section]: [...formData[section], emptyItem] });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");

    // Title and Contact Info
    doc.setFontSize(18);
    doc.text(formData.name || "Your Name", 20, 20);
    doc.setFontSize(14);
    doc.text(formData.position || "Position Title", 20, 30);
    doc.setFontSize(10);
    doc.text(`Email: ${formData.email || "example@mail.com"}`, 20, 40);
    doc.text(`Phone: ${formData.phone || "+1234567890"}`, 20, 50);

    // Professional Summary
    if (formData.summary) {
      doc.setFontSize(12);
      doc.text("Professional Summary", 20, 60);
      doc.setFontSize(10);
      const summaryText = doc.splitTextToSize(formData.summary, 180);
      doc.text(summaryText, 20, 70);
    }

    // Education Section
    if (formData.education.length) {
      doc.setFontSize(12);
      doc.text("Education", 20, 90);
      formData.education.forEach((edu, index) => {
        doc.setFontSize(10);
        const eduText = `${edu.degree || "Degree"} - ${
          edu.school || "School"
        } (${edu.year || "Year"})`;
        doc.text(eduText, 20, 100 + index * 10);
      });
    }

    // Experience Section using autoTable
    if (formData.experience.length) {
      const experienceData = formData.experience.map((exp) => ({
        position: exp.position || "Position",
        company: exp.company || "Company",
        duration: exp.duration || "Duration",
        description: exp.description || "Description",
      }));

      doc.setFontSize(12);
      doc.text("Experience", 20, 120);
      autoTable(doc, {
        startY: 130,
        head: [["Position", "Company", "Duration", "Description"]],
        body: experienceData.map((exp) => [
          exp.position,
          exp.company,
          exp.duration,
          exp.description,
        ]),
        styles: {
          fontSize: 10,
          cellPadding: 4,
        },
      });
    }

    // Skills Section
    if (formData.skills.length) {
      doc.setFontSize(12);
      doc.text("Skills", 20, 180);
      formData.skills.forEach((skill, index) => {
        doc.setFontSize(10);
        doc.text(`${index + 1}. ${skill}`, 20, 190 + index * 10);
      });
    }

    doc.save("resume.pdf");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Modern Resume Builder
        </h1>

        <form className="bg-white shadow rounded-lg p-6 space-y-8">
          {/* Personal Info */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                name="position"
                placeholder="Position Title"
                value={formData.position}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
            </div>
          </section>

          {/* Sections */}
          {["education", "experience"].map((section) => (
            <section key={section}>
              <h2 className="text-2xl font-semibold capitalize">{section}</h2>
              <button
                type="button"
                onClick={() => addSectionItem(section)}
                className="text-blue-500 mt-2"
              >
                Add {section}
              </button>
              <div className="space-y-4 mt-4">
                {formData[section].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg"
                  >
                    {Object.keys(item).map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field}
                        value={item[field]}
                        onChange={(e) =>
                          handleSectionChange(
                            section,
                            index,
                            field,
                            e.target.value
                          )
                        }
                        className="border rounded-lg p-3"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold">Skills</h2>
            <button
              type="button"
              onClick={() => addSectionItem("skills")}
              className="text-blue-500 mt-2"
            >
              Add Skill
            </button>
            <div className="space-y-4 mt-4">
              {formData.skills.map((skill, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="border rounded-lg p-3"
                />
              ))}
            </div>
          </section>

          {/* Download Button */}
          <button
            type="button"
            onClick={downloadPDF}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Download Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilder;
