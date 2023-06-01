import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

export const login = async (credentials) => {
  const response = await axiosInstance.post("/account/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  const { data } = response;
  const { token } = data;

  return {
    token,
  };
};

export const signup = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("imagefile", userData.image);

  const response = await axiosInstance.post("/account/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const { data } = response;
  const { token } = data;

  return {
    token,
  };
};
