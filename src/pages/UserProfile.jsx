import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";


const UserProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ displayName: name, photoURL: photoURL });

      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      
      <h2 className="text-2xl font-bold mb-6 text-center">Donner Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 text-center">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt={name || "User Photo"}
            className="w-36 h-36 rounded-full object-cover border-2 border-gray-300 mb-3"
          />
        </div>

        <form onSubmit={handleUpdate} className="flex-1 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL:
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <p className="text-gray-600">{user?.email || "No Email"}</p>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
