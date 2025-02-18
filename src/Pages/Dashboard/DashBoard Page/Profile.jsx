import useAuth from "../../../hook/useAuth";
import useRole from "../../../hook/useRole";

const Profile = () => {
    const {user} = useAuth()
    const [role] = useRole()

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Banner */}
        <div className="relative w-full h-48 bg-gradient-to-r from-[#047857] to-[#059669]">
          <div className="absolute inset-0 flex justify-center items-end">
            {/* Centered Rounded Picture */}
            <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-gray-100 -mb-12">
              <img
                src={user.photoURL} 
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
  
        {/* User Info */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-sm inline-block text-white bg-mainColor px-5 py-1 rounded-full">{role}</p>
          <h1 className="text-2xl font-bold text-gray-800">{user?.displayName}</h1>
          <p className="text-sm text-gray-600"> {user?.email}</p>
        </div>
      </div>
    );
};

export default Profile;