import { setAllStudents } from "@/redux/studentSlice";
import { STUDENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllStudents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get(`${STUDENT_API_END_POINT}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllStudents(res.data.students));
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchAllStudents();
  }, [dispatch]);
};

export default useGetAllStudents;
