import { FaGoogle, FaFacebook } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utilities/utils";
import toast from "react-hot-toast";


const SignIn = () => {
  const { signInUser ,   handleGoogle, handleFacebook} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignIn = async data => {
    const email = data.email;
    const password = data.password;

     await signInUser(email, password);
     toast.success('Successfully Signin')
     navigate('/')
  }

  // handle Google SignIn 
  const handleGoogleSignIn = async () => {
    const data = await handleGoogle();  
    await saveUser(data?.user);  
    navigate('/');
  }
  // handle facebook SignIn 
  const handleFacebookSignIn = async () => {
    try {
      const data =  await handleFacebook();
      await saveUser(data?.user)
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-1">Welcome Back</h2>
      <p className="text-center text-gray-600 mb-6 text-sm">
        Sign in to access your account
      </p>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          className="w-full bg-mainColor text-white py-2 rounded-lg
           hover:bg-secondBgColor"
        >
          Sign In
        </button>
      </form>
      <div className="my-4 flex items-center justify-center">
        <div className="border-t w-full"></div>
        <div className="text-center  text-gray-500 w-full">
          Or continue with
        </div>
        <div className="border-t w-full"></div>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={handleGoogleSignIn} className="flex items-center px-4 py-2 border rounded-lg">
          <FaGoogle className="mr-2" />
          Google
        </button>
        <button onClick={handleFacebookSignIn} className="flex items-center px-4 py-2 border rounded-lg">
          <FaFacebook className="mr-2" />
          Facebook
        </button>
      </div>
    </div>
  );
};

export default SignIn;
