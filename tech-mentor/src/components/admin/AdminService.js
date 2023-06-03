import createAxiosInstance from "../../Axios/axiosInstance";

// // Fetch all mentor requests
// export const fetchRequests = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/admin/requests`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error.response);
//     throw error;
//   }
// };

// Create an instance of axios with interceptor
const axiosInstance = createAxiosInstance();

// Fetch all mentor requests
export const fetchRequests = async () => {
  try {
    const response = await axiosInstance.get("/admin/requests");
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

// Approve mentor Request
export const approveRequest = async (email) => {
  try {
    const response = await axiosInstance.put(
      "/admin/approve",
      JSON.stringify(email),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reject mentor request
export const rejectRequest = async (email, rejectMessage) => {
  try {
    const data = { email, rejectmessage: rejectMessage };

    const response = await axiosInstance.delete("/admin/reject", {
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
