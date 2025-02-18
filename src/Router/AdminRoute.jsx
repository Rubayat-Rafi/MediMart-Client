import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../hook/useRole";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {

    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    if (role === 'admin') return children

    return <Navigate to='/dashboard' replace='true' />
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
}


export default AdminRoute;