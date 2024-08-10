import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteUserApi, getAllUsers } from "../../apis/api";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data && Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        } else {
          toast.error("Failed to fetch users.");
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch users.");
      });
  }, []);

  console.log("Users state:", users);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    deleteUserApi(id)
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        }
      })
      .catch((error) => {
        toast.error("Failed to delete user.");
      });
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between">
        <h1>View Users</h1>
      </div>
      <table className="table mt-4">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Failed Login Attempts</th>
            <th>Email Verified</th>
            <th>Password Last Changed</th>
            <th>Email Verification Expires</th>
            <th>Email Verification Token</th>
            <th>Account Locked Until</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => {
              console.log("Rendering row for user:", user);
              return (
                <tr key={user._id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.failedLoginAttempts}</td>
                  <td>{user.emailVerified ? "Yes" : "No"}</td>
                  <td>{new Date(user.passwordLastChanged).toLocaleString()}</td>
                  <td>{new Date(user.emailVerificationExpires).toLocaleString()}</td>
                  <td>{user.emailVerificationToken}</td>
                  <td>{user.accountLockedUntil ? new Date(user.accountLockedUntil).toLocaleString() : "N/A"}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/edit-user/${user._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
