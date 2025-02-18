import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { imageUpload, saveUser } from "../utilities/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUser, handleGoogle, handleFacebook } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUpForm = async (data) => {
    const email = data.email;
    const username = data.username;
    const password = data.password;
    const role = data.role;
    const image = data.photo[0];

    try {
      // Send image data to imgbb with imageUpload hook
      const photoURL = await imageUpload(image);

      // Create user with email and password
      const result = await createUser(email, password);

      // Update user with username and photoURL
      await updateUser(username, photoURL);

      // Save user info in DB if the user is new
      if (result?.user?.email) {
        const user = {
          email: result.user.email,
          displayName: username,
          photoURL,
        };
        await saveUser(user, role);
      }
      toast.success("User created successfully!");
      navigate("/shop");
    } catch (error) {
      toast.error("Error during sign up:", error);
    }
  };

  //handle google signUp
  const handleGoogleSignUp = async () => {
    try {
      const data = await handleGoogle();
      await saveUser(data?.user);
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-In Error:", error);
    }
  };

  //handle facebook signUp
  const handleFacebookSignUp = async () => {
    try {
      const data = await handleFacebook();
      await saveUser(data?.user);
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit(handleSignUpForm)}>
        {/* user name  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>

        {/* email  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* photo  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="file"
            {...register("photo", { required: "Photo is requierd" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          {errors.photo && (
            <p className="text-red-500 text-xs">{errors.photo.message}</p>
          )}
        </div>

        {/* password  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* role  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs">{errors.role.message}</p>
          )}
        </div>

        {/*Submit button  */}
        <button
          type="submit"
          className="w-full bg-mainColor text-white py-2 rounded-lg hover:bg-secondBgColor"
        >
          Sign Up
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
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center px-4 py-2 border rounded-lg"
        >
          <FaGoogle className="mr-2" />
          Google
        </button>
        <button
          onClick={handleFacebookSignUp}
          className="flex items-center px-4 py-2 border rounded-lg"
        >
          <FaFacebook className="mr-2" />
          Facebook
        </button>
      </div>
    </div>
  );
};

export default SignUp;
