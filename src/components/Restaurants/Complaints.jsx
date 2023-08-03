import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";


export default function Complaints() {
  const [complaintList, setComplaintList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant/complaints/`
      );
      console.log(response.data);
      setComplaintList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (complaintId) => {
    try {
      await axios.delete(
        `${BASE_URL}/restaurant/delete/${complaintId}/`
      );
      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    try {
      console.log(complaintId, "........");
      const response = await axios.put(
        `${BASE_URL}/restaurant/updateCompltStatus/${complaintId}/`,
        {
          status: newStatus,
        }
      );
      console.log(response.data, "updateStatus......................");

      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
            Complaint List
          </div>
        </div>
        <div className="p-3">
          <table className="table-responsive w-full rounded">
            <thead>
              <tr>
                <th className="border w-1/4 px-4 py-2">Name</th>
                <th className="border w-1/6 px-4 py-2">Email</th>
                <th className="border w-1/6 px-4 py-2">Mobile Number</th>
                <th className="border w-1/6 px-4 py-2">Complaint</th>
                <th className="border w-1/5 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaintList.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="border px-4 py-2">{complaint.name}</td>
                  <td className="border px-4 py-2">{complaint.email}</td>

                  <td className="border px-4 py-2">{complaint.phone}</td>
                  <td className="border px-4 py-2">{complaint.complaint}</td>
                  <td className="border px-4 py-2">
                    {complaint.status === "Resolved" ? (
                      <span
                        className={`status-resolved ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        Resolved
                      </span>
                    ) : (
                      <select
                        value={selectedStatus[complaint.id] || complaint.status}
                        onChange={(event) => {
                          setSelectedStatus((prevStatus) => ({
                            ...prevStatus,
                            [complaint.id]: event.target.value, // Update the selected status for the specific complaint ID
                          }));

                          updateStatus(complaint.id, event.target.value);
                        }}
                        className={`status-select ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {/* <button
                      className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-red-500"
                      onClick={() => handleReject(restaurant.id)}
                    >
                      Reject
                    </button> */}
                    <>
                      {/* <Link
                        to={`/edit/${complaint.id}`}
                        className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"
                      >
                        <i className="fas fa-edit"></i>
                      </Link> */}
                      {/* <button
                        className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-black"
                         onClick={() => handleDelete(complaint.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button> */}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
