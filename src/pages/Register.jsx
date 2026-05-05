import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { LuEyeClosed, LuEye } from "react-icons/lu";

// Import local JSON files
import districtsData from "../assets/districts.json";
import upazilasData from "../assets/upazilas.json";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Extract actual data from the JSON structure
  const districts = districtsData[2]?.data || [];
  const upazilas = upazilasData[2]?.data || [];

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter((u) => u.district_id === selectedDistrict);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const name = form.name.value;
    const email = form.email.value;
    const bloodGroup = form.bloodGroup.value;
    const districtId = form.district.value;
    const upazilaId = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photoURL = form.avatar.value;

    // Validation
    if (name.length < 5) {
      return setNameError("Name should be more than 5 characters");
    } else {
      setNameError("");
    }

    if (password.length < 6) {
      return setPassError("Password should be more than 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return setPassError("Password must contain at least an uppercase letter");
    } else if (!/[a-z]/.test(password)) {
      return setPassError("Password must contain at least a lowercase letter");
    } else if (password !== confirmPassword) {
      return setPassError("Passwords do not match!");
    } else {
      setPassError("");
    }

    try {
      setLoading(true);

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({
        displayName: name,
        photoURL: photoURL,
      });
      setUser({ ...user, displayName: name, photoURL: photoURL });

      const districtName = districts.find(d => d.id === districtId)?.name || "";
      const upazilaName = upazilas.find(u => u.id === upazilaId)?.name || "";

      const newUserData = {
        name,
        email,
        avatar: photoURL,
        bloodGroup,
        district: districtName,
        upazila: upazilaName,
        status: "active",
      };

      console.log("Ready to submit to backend:", newUserData);
      
      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const googleUser = result.user;
        setUser(googleUser);
        toast.success("Successfully signed in with Google");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google sign in failed");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <h2 className="font-semibold text-2xl text-center pt-8 pb-2">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset gap-3">
            
            <div className="form-control">
              <label className="label font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Your Name"
                required
              />
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>

            <div className="form-control">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Avatar Photo URL</label>
              <input
                type="url"
                name="avatar"
                className="input input-bordered w-full"
                placeholder="https://example.com/your-image.jpg"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Blood Group</label>
              <select name="bloodGroup" className="select select-bordered w-full" required defaultValue="">
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-medium">District</label>
                <select 
                  name="district" 
                  className="select select-bordered w-full" 
                  required
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="" disabled>Select District</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label font-medium">Upazila</label>
                <select 
                  name="upazila" 
                  className="select select-bordered w-full" 
                  required
                  disabled={!selectedDistrict}
                  defaultValue=""
                >
                  <option value="" disabled>Select Upazila</option>
                  {filteredUpazilas.map(upazila => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control relative">
                <label className="label font-medium">Password</label>
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-[44px] cursor-pointer text-gray-500"
                >
                  {show ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
                </span>
              </div>

              <div className="form-control relative">
                <label className="label font-medium">Confirm</label>
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className="input input-bordered w-full pr-10"
                  placeholder="Confirm"
                  required
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-[44px] cursor-pointer text-gray-500"
                >
                  {showConfirm ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
                </span>
              </div>
            </div>
            {passError && <p className="text-red-500 text-xs text-center">{passError}</p>}

            <button 
              type="submit" 
              className={`btn btn-neutral mt-6 w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="divider my-2">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline flex items-center justify-center gap-2 w-full"
              disabled={loading}
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <p className="font-semibold pt-3 text-center">
              Already have an account?{" "}
              <Link className="text-secondary hover:underline" to={"/auth/login"}>
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
