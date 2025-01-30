// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// const Details = () => {
//   const [profileData, setProfileData] = useState(null);
//   useEffect(() => {
//     (async () => {
//       const response = await axios.get("/api/profile");
//       const profile_data = response.data.profile;
//       setProfileData(profile_data);
//     })();
//   }, []);

//   return (
//     <>
//       {profileData !== null ? (
//         <>
//           <div className="text-white">
//             <h2>Username: {profileData.username}</h2>
//           </div>
//           <div className="text-white">
//             <h2>Name: {profileData.name}</h2>
//           </div>

//           {profileData.bio ? (
//             <div className="text-white">
//               <h2>Bio: {profileData.bio}</h2>
//             </div>
//           ) : (
//             <p>Bio: Not set</p>
//           )}

//           {profileData.availability ? (
//             <div className="text-white">
//               <h2>Availability: {profileData.availability}</h2>
//             </div>
//           ) : (
//             <p>Availability: Not set</p>
//           )}

//           {profileData.hourlyRate ? (
//             <div className="text-white">
//               <h2>HourlyRate: {profileData.hourlyRate}</h2>
//             </div>
//           ) : (
//             <p>HourlyRate: Not set</p>
//           )}

//         { profileData.skills?.length != 0 ? (
//             <div className="text-white">
//               <h2>
//                 Skills:
//                 {profileData.skills.map((skill, index) => (
//                   <h2 className="text-white" key={index}>
//                     {skill}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Skills: Not set</p>
//           )}

//           {profileData.languages?.length != 0 ? (
//             <div className="text-white">
//               <h2>
//               Languages:
//                 {profileData.languages.map((language, index) => (
//                   <h2 className="text-white" key={index}>
//                     {language}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Languages: Not set</p>
//           )}

//           {profileData.jobsApplied?.length != 0 ? (
//             <div className="text-white">
//               <h2>
//               Jobs Applied:
//                 {profileData.jobsApplied.map((job, index) => (
//                   <h2 className="text-white" key={index}>
//                     {job.title}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Jobs Applied: 0</p>
//           )}

//           {profileData.jobsUndertaken?.length != 0 ? (
//             <div className="text-white">
//               <h2>
//               Jobs Undertaken:
//                 {profileData.jobsUndertaken.map((job, index) => (
//                   <h2 className="text-white" key={index}>
//                     {job}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Jobs Undertaken: 0</p>
//           )}

//           {(profileData.certifications && profileData.certifications.length != 0) ? (
//             <div className="text-white">
//               <h2>
//               Job Certifications:
//                 {profileData.certifications.map((certification, index) => (
//                   <h2 className="text-white" key={index}>
//                     {certification}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Job Certifications: 0</p>
//           )}

//           {(profileData.reviews && profileData.reviews.length != 0 )? (
//             <div className="text-white">
//               <h2>
//               Reviews:
//                 {profileData.reviews.map((review, index) => (
//                   <h2 className="text-white" key={index}>
//                     {review}
//                   </h2>
//                 ))}
//               </h2>
//             </div>
//           ) : (
//             <p>Reviews: 0</p>
//           )}

//           <div className="text-white">Rating: {profileData.rating}</div>
//           <div className="text-white">Number of Rating: {profileData.ratingCount}</div>{" "}
//         </>
//       ) : (
//         <h2>No data</h2>
//       )}
//     </>
//   );
// };

// export default Details;

import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../Homepage/JobCard";

const Details = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setProfileData(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchData();
  }, []);

  const uploadImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", document.getElementById("profileImage").files[0]);
    axios
      .post("/api/uploadProfileImage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image Uploaded Successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  if (!profileData) {
    return <h2>No data</h2>;
  }

  const { name, bio, availability, hourlyRate, skills = [], languages = [], jobsApplied = [], jobsUndertaken = [], certifications = [], reviews = [], rating, ratingCount } = profileData;

  return (
    <div className="bg-black-100 p-10">
      <div className="bg-white rounded-lg text-black m-10 p-10 ">
        <form action="/uploadProfileImage" method="POST" encType="multipart/form-data">
          Update Profile Image: <input type="file" id="profileImage" name="profileImage" /><br />
          <button type="submit" className="btn btn-dark" onClick={uploadImage}>
            Upload
          </button>
        </form>
      </div>
      {/* Header Section */}
      <header className="bg-white shadow-md rounded-lg p-8 text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-lg text-gray-600">Freelancer & Developer</p>
        <div className="mt-4">
          <a href={profileData.linkedIn} target="_blank" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 mx-2  ">
            LinkedIn
          </a>
          <a href={profileData.github} target="_blank" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 mx-2  ">
            GitHub
          </a>
          <a href={profileData.twitter} target="_blank" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 mx-2  ">
            Twitter
          </a>
        </div>
      </header>

      {/* About Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-600">{bio || "Bio not provided yet."}</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
          {skills.length ? (
            <ul className="flex flex-wrap">
              {skills.map((skill, index) => (
                <li key={index} className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 m-2">
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No skills set yet.</p>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">Jobs Applied:</h3>
          {jobsApplied.length ? (
            <ul className="list-disc pl-6">
              {jobsApplied.map((job, index) => (
                <JobCard key={job._id} job={job} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No jobs applied for yet.</p>
          )}

          {/* <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Jobs Undertaken:</h3>
          {jobsUndertaken.length ? (
            <ul className="list-disc pl-6">
              {jobsUndertaken.map((job, index) => (
                <li key={index} className="text-gray-600">{job}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No jobs undertaken yet.</p>
          )} */}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Certifications</h2>
          {certifications.length ? (
            <ul className="list-disc pl-6">
              {certifications.map((certification, index) => (
                <li key={index} className="text-gray-600">
                  {certification}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No certifications yet.</p>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
          {reviews.length ? (
            reviews.map((review, index) => (
              <blockquote key={index} className="italic text-gray-600 mb-4">
                "{review}"
              </blockquote>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Me</h2>
          <p className="text-gray-600">Availability: {availability || "Not specified"}</p>
          <p className="text-gray-600 mb-4">Hourly Rate: {hourlyRate || "Not specified"}</p>
        </div>
      </section>

      {/* Footer Section */}
    </div>
  );
};

export default Details;
