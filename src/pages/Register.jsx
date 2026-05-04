import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
;

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [show, setShow] = useState(false);
  const { createUser, setUser, updateUser, googleSignIn } =
    useContext(AuthContext); // useContext !!
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      setPassError("Password should be more than 8 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPassError("Password must contain at least a uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPassError("Password must contain at least a Lowercase letter");
      return;
    } else {
      setPassError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Registration Successful");
          })
          .catch((error) => {
            // console.log("updateUser error:", error);
            toast.error("Profile update failed");
          });
      })
      .catch((error) => {
        // console.log("createUser error:", error);
        toast.error(error.message || "Registration failed");
      });
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
        // console.error("Google sign in error:", error);
        toast.error("Google sign in failed");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <h2 className="font-semibold text-2xl text-center py-5">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
              required
            />
            {nameError && <p className="text-red-500 text-xs">{nameError}</p>}

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo URL"
            />

            <div className="relative">
              <label className="label">Password</label>
              <input
                name="password"
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-[25px] top-[36px] cursor-pointer z-50"
              >
                {show ? <LuEye></LuEye> : <LuEyeClosed></LuEyeClosed>}
              </span>
            </div>
            {passError && <p className="text-red-500 text-xs">{passError}</p>}

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <p className="font-semibold pt-5 text-center">
              Already have an account?{" "}
              <Link className="text-secondary" to={"/auth/login"}>
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
