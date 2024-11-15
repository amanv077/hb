import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ position: "", company: "", duration: "", description: "" }],
    skills: [""],
    customSections: [{ title: "Location", content: "" }],
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

  const addSectionItem = (section) => {
    setFormData({
      ...formData,
      [section]: [
        ...formData[section],
        section === "skills" ? "" : { degree: "", school: "", year: "" },
      ],
    });
  };

  const addCustomSection = () => {
    setFormData({
      ...formData,
      customSections: [...formData.customSections, { title: "", content: "" }],
    });
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.setFont("Helvetica", "normal");

    // Name and Position
    pdf.setFontSize(20);
    pdf.text(formData.name || "Your Name", 40, 50);
    pdf.setFontSize(14);
    pdf.text(formData.position || "Position Title", 40, 70);
    pdf.setLineWidth(0.5);
    pdf.line(40, 80, 550, 80);

    // Professional Summary
    pdf.setFontSize(16);
    pdf.text("Professional Summary", 40, 110);
    pdf.setFontSize(12);
    pdf.text(
      formData.summary || "A brief summary of your professional background.",
      40,
      130
    );
    pdf.line(40, 140, 550, 140);

    // Education
    pdf.setFontSize(16);
    pdf.text("Education", 40, 170);
    formData.education.forEach((edu, index) => {
      const y = 190 + index * 30;
      pdf.setFontSize(12);
      pdf.text(`${edu.degree || "Degree"} - ${edu.school || "School"}`, 40, y);
      pdf.text(edu.year || "Year", 450, y, { align: "right" });
    });
    pdf.line(
      40,
      210 + formData.education.length * 30,
      550,
      210 + formData.education.length * 30
    );

    // Experience
    const experienceStartY = 220 + formData.education.length * 30;
    pdf.setFontSize(16);
    pdf.text("Experience", 40, experienceStartY);
    formData.experience.forEach((exp, index) => {
      const y = experienceStartY + 20 + index * 60;
      pdf.setFontSize(12);
      pdf.text(
        `${exp.position || "Position"} at ${exp.company || "Company"}`,
        40,
        y
      );
      pdf.text(exp.duration || "Duration", 450, y, { align: "right" });
      pdf.text(
        exp.description || "Description of responsibilities and achievements.",
        40,
        y + 20,
        { maxWidth: 450 }
      );
    });
    pdf.line(
      40,
      experienceStartY + formData.experience.length * 60 + 20,
      550,
      experienceStartY + formData.experience.length * 60 + 20
    );

    // Skills
    const skillsStartY =
      experienceStartY + formData.experience.length * 60 + 40;
    pdf.setFontSize(16);
    pdf.text("Skills", 40, skillsStartY);
    formData.skills.forEach((skill, index) => {
      pdf.text(`- ${skill || "Skill"}`, 40, skillsStartY + 20 + index * 20);
    });

    // Custom Sections
    const customSectionStartY = skillsStartY + 40 + formData.skills.length * 20;
    formData.customSections.forEach((section, index) => {
      const y = customSectionStartY + index * 40;
      pdf.setFontSize(16);
      pdf.text(section.title || "Section Title", 40, y);
      pdf.setFontSize(12);
      pdf.text(section.content || "Section content...", 40, y + 20, {
        maxWidth: 450,
      });
    });

    pdf.save("resume.pdf");
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Premium Resume Builder
      </h1>

      <div className="flex gap-10">
        {/* Left Section (Form Inputs) */}
        <form className="w-1/2 space-y-6 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold">Enter Your Details</h2>

          {/* Basic Info */}
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            name="position"
            placeholder="Position Title"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />

          {/* Summary */}
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            rows="3"
          />

          {/* Dynamic Sections */}
          {["Education", "Experience", "Skills"].map((section) => (
            <div key={section}>
              <h3 className="text-xl font-semibold">{section}</h3>
              {formData[section.toLowerCase()].map((item, index) => (
                <div key={index} className="space-y-2">
                  {section !== "Skills" ? (
                    <>
                      <input
                        placeholder={`${
                          section === "Education" ? "Degree" : "Position"
                        }`}
                        value={item.degree || item.position || ""}
                        onChange={(e) => {
                          const updatedSection = [
                            ...formData[section.toLowerCase()],
                          ];
                          updatedSection[index][
                            section === "Education" ? "degree" : "position"
                          ] = e.target.value;
                          setFormData({
                            ...formData,
                            [section.toLowerCase()]: updatedSection,
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        placeholder={
                          section === "Education" ? "School" : "Company"
                        }
                        value={item.school || item.company || ""}
                        onChange={(e) => {
                          const updatedSection = [
                            ...formData[section.toLowerCase()],
                          ];
                          updatedSection[index][
                            section === "Education" ? "school" : "company"
                          ] = e.target.value;
                          setFormData({
                            ...formData,
                            [section.toLowerCase()]: updatedSection,
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        placeholder={
                          section === "Education" ? "Year" : "Duration"
                        }
                        value={item.year || item.duration || ""}
                        onChange={(e) => {
                          const updatedSection = [
                            ...formData[section.toLowerCase()],
                          ];
                          updatedSection[index][
                            section === "Education" ? "year" : "duration"
                          ] = e.target.value;
                          setFormData({
                            ...formData,
                            [section.toLowerCase()]: updatedSection,
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </>
                  ) : (
                    <input
                      placeholder="Skill"
                      value={item || ""}
                      onChange={(e) => {
                        const updatedSkills = [...formData.skills];
                        updatedSkills[index] = e.target.value;
                        setFormData({ ...formData, skills: updatedSkills });
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSectionItem(section.toLowerCase())}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              >
                Add {section}
              </button>
            </div>
          ))}

          {/* Custom Section */}
          {formData.customSections.map((section, index) => (
            <div key={index} className="space-y-2 mt-4">
              <input
                name="title"
                placeholder="Custom Section Title"
                value={section.title}
                onChange={(e) => {
                  const updatedSections = [...formData.customSections];
                  updatedSections[index].title = e.target.value;
                  setFormData({ ...formData, customSections: updatedSections });
                }}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <textarea
                name="content"
                placeholder="Content"
                value={section.content}
                onChange={(e) => {
                  const updatedSections = [...formData.customSections];
                  updatedSections[index].content = e.target.value;
                  setFormData({ ...formData, customSections: updatedSections });
                }}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomSection}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add Custom Section
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={downloadPDF}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
          >
            Download Resume as PDF
          </button>
        </form>

        {/* Right Section (Live Preview) */}
        <div className="w-1/2 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
          <div className="text-lg">
            <p className="font-bold">{formData.name}</p>
            <p className="text-sm">{formData.position}</p>
            <p>{formData.summary}</p>
            <hr className="my-4" />
            <h3 className="font-bold">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <p>
                  {edu.degree} - {edu.school}
                </p>
                <p>{edu.year}</p>
              </div>
            ))}
            <hr className="my-4" />
            <h3 className="font-bold">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <p>
                  {exp.position} at {exp.company}
                </p>
                <p>{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
            <hr className="my-4" />
            <h3 className="font-bold">Skills</h3>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <hr className="my-4" />
            {formData.customSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold">{section.title}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
