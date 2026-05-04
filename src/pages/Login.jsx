import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import Loading from "./Loading";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const { signIn, forgetPass, loading, setLoading, googleSignIn, setUser } =
    use(AuthContext);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully Login");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        toast.error(errorMessage);
      });

    if (loading) {
      return <Loading></Loading>;
    }
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const googleUser = result.user;
        // googleUser already has displayName, photoURL, email etc.
        setUser(googleUser);
        toast.success("Successfully signed in with Google");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign in error:", error);
        toast.error("Google sign in failed");
      });
  };
  const handleForgetPass = (e) => {
    const email = emailRef.current.value;
    forgetPass(email)
      .then(() => {
        toast.success("Password reset url sent to your mail");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        toast.error(errorMessage);
      });
    // sendPasswordResetEmail(auth, email);
    // console.log(emailRef.current.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
     
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
      ></ToastContainer>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="font-semibold text-2xl text-center py-5">
          Login your account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              ref={emailRef}
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

            <div>
              <a onClick={handleForgetPass} className="link link-hover">
                Forgot password?
              </a>
            </div>

            {error && <p className="text-secondary text-xs">{error}</p>}

            <button className="btn btn-neutral mt-4">Login</button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <p className="font-semibold pt-5 text-center">
              Don't Have An Account?{" "}
              <Link className="text-secondary" to={"/auth/register"}>
                Register
              </Link>{" "}
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
