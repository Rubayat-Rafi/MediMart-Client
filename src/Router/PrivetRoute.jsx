import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import useAuth from "../hook/useAuth"
import LoadingSpinner from "../Components/LoadingSpinner"

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation()
  
    if (loading) return <LoadingSpinner />
    if (user) return children
    return <Navigate to='/join-us' state={{ from: location.pathname }} replace />
  }

PrivetRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivetRoute;
