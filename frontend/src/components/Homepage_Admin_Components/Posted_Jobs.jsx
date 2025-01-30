import axios from "axios";
import React, { useState } from "react";

const Posted_Jobs = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const viewApplications = async () => {
    const url = `/api/getJobApplications/${job._id}`;
    try {
      const response = await axios.get(url);
      setApplications(response.data.applications); // Assuming response data contains applications
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching job Applications:", error);
    }
  };

  const assignJob = async (applicant_id) => {
    const url = `/api/assignJob/${job._id}/${applicant_id}`;
    try {
      const response = await axios.post(url);
      // Assuming response data contains applications
      setMessage(response.data.message);
      setMessageType("success");
      setShowModal(false); // Show the modal
    } catch (error) {
      console.error("Error fetching job Applications:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setApplications([]);
  };

  return (
    <>
      {message && <div className={`message ${messageType === "success" ? "success" : "error"}`}>{message}</div>}

      <div className="flex space-x-4">
        <div className="flex-1 bg-gray-900 text-white hover:bg-gray-600 p-4 mt-4 rounded-lg shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <span className="text-sm bg-orange-500 px-3 py-1 rounded-full">{job.location}</span>
          </div>

          <p className="text-white-300">{job.description}</p>

          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Working Hours:</h3>
              <p>{job.working_hours}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Experience:</h3>
              <p>{job.preferred_experience}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Wage:</h3>
            <p>{job.wage}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Skills:</h3>
            <ul className="list-disc list-inside">
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Qualifications:</h3>
            <ul className="list-disc list-inside">
              {job.qualification.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Proposals: {job.proposals}</span>
            <span className="text-sm">Posted By: {job.postedBy.name}</span>
          </div>

          <button onClick={viewApplications} className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
            View Applications
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-3/4 text-black">
            <h2 className="text-xl font-bold mb-4">Job Applications</h2>
            {(applications?.applicants).length > 0 ? (
              <ul>
                {applications.applicants.map((applicant, index) => (
                  <li key={index} className="mb-2">
                    <strong>Applicant Name:</strong> {applicant.name}
                    <br />
                    <strong>Rating:</strong> {applicant.rating}
                    <br />
                    <strong>Skills:</strong> {applicant.skills.join(", ")} <br></br>
                    <button className="bg-orange-600 mt-4 text-white py-2 px-4 rounded-md mb-6 hover:bg-orange-700 mr-0" onClick={() => assignJob(applicant._id)}>
                      Assign Job
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications yet.</p>
            )}
            <button onClick={closeModal} className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Posted_Jobs;
