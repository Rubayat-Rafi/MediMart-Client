import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-users");
      return data;
    },
  });

  if(isLoading) return <LoadingSpinner/>
  if(users.length < 0) return <div>No User Found...</div>

  const updateUserRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/user/role/${email}`, { role });
      toast.success(`Role updated to ${role} successfully!`);
      refetch(); 
    } catch (err) {
      toast.error("Failed to update role.", err);
    }
  };

  return (
    <table className="table  border border-gray-300">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <select
                value={user.role}
                onChange={(e) => updateUserRole(user.email, e.target.value)}
                className="border px-2 py-1 rounded bg-white focus:outline-none"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageUsers;
