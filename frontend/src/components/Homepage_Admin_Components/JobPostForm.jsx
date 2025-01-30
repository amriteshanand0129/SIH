import React, { useState } from "react";
import axios from "axios";

const JobPostForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    working_hours: "",
    preferred_experience: "BEGINNER",
    wage: "",
    skills: [],
    qualification: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("/api/postJob", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        setMessageType("success");
        setFormData({
          title: "",
          location: "",
          description: "",
          working_hours: 0,
          preferred_experience: "BEGINNER",
          wage: 0,
          skills: [],
          qualification: [],
        });
        window.location.reload();
      })
      .catch((error) => {
        setMessage("Failed to post Job");
        setMessageType("error");
        console.log("Failed to Post Job: ", error);
      });
  };

  return (
    <div className="bg-white-800  rounded-lg shadow max-w-5xl mx-auto mt-10 py-2">
      {/* Notification message */}
      {message && (
        <div
          className={`text-center py-2 px-4 mb-4 ${
            messageType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } rounded-md`}
        >
          {message}
        </div>
      )}

      {/* Center the button */}
      <div className="flex justify-center items-center">
        <button
          className="bg-orange-600 mt-4 text-white py-2 px-4 rounded-md mb-6 hover:bg-orange-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Show Form"}
        </button>
      </div>

      {/* Form content */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Title:
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Location:
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Description:
            </label>
            <textarea
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Working Hours:
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="number"
              name="working_hours"
              value={formData.working_hours}
              onChange={handleChange}
              required
            />
          </div>

          {/* Preferred Experience */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Preferred Experience:
            </label>
            <select
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              name="preferred_experience"
              value={formData.preferred_experience}
              onChange={handleChange}
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="EXPERT">EXPERT</option>
            </select>
          </div>

          {/* Wage */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Wage:
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="number"
              name="wage"
              value={formData.wage}
              onChange={handleChange}
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Skills (comma separated):
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="text"
              name="skills"
              onChange={(e) => handleArrayChange(e, "skills")}
              placeholder="Backend,Frontend,AI"
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-orange-400 font-semibold mb-2">
              Qualification (comma separated):
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
              type="text"
              name="qualification"
              onChange={(e) => handleArrayChange(e, "qualification")}
              placeholder="College Graduate,2 yrs Exp"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default JobPostForm;
