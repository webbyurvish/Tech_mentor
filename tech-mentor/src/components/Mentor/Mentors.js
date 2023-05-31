import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "../Layout/Pagination";
import { setCurrentPage } from "../../redux/slices/dataSlice";

export default function Mentors() {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.result.mentors);
  const currentPage = useSelector((state) => state.data.currentPage);
  const result = useSelector((state) => state.result);

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) {
      dispatch(setCurrentPage(1)); // Set the current page to null or a default value
    } else {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  return (
    <Layout>
      {mentors && mentors.length === 0 && (
        <h3 className="nomentors">There are no mentors to show.</h3>
      )}
      {mentors && mentors.length > 0 && (
        <div>
          <div className="row justify-content-center">
            {mentors.map((mentor, index) => (
              <Mentor mentor={mentor} key={index} />
            ))}
          </div>
        </div>
      )}
      <div>
        <CustomPagination
          totalPages={result.totalPages}
          currentPage={currentPage}
          handlePageChange={(page) => handlePageChange(page)}
        />
      </div>
    </Layout>
  );
}
