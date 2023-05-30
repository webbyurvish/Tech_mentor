
import axios from "axios";
import { API_URL } from "../../config";


// Fetch all mentor requests

export async function fetchRequests() {

    const response = await axios.get(`${API_URL}/admin/requests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response
};

// Approve mentor Request

export async function approveRequest(value) {
    const response = await axios.put(
        `${API_URL}/admin/approve`,
        value,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response;
}

// Reject mentor request

export async function rejectRequest(data) {
    const response = await axios({
        method: "DELETE",
        url: `${API_URL}/admin/reject`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return response;
}