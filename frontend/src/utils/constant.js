/* eslint-disable no-undef */
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://hiringbooth-backend.onrender.com"
    : "http://localhost:8000";

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
export const STUDENT_API_END_POINT = `${BASE_URL}/api/v1/students`;

// export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";
// export const JOB_API_END_POINT = "http://localhost:8000/api/v1/job";
// export const APPLICATION_API_END_POINT =
//   "http://localhost:8000/api/v1/application";
// export const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company";
// export const STUDENT_API_END_POINT = "http://localhost:8000/api/v1/students";
