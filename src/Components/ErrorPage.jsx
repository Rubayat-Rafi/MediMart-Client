

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-secondBgColor text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-2">Oops! Page not found.</p>
            <button
                onClick={() => window.history.back()}
                className="mt-6 px-6 py-2 bg-mainColor text-white rounded-lg hover:bg-opacity-80 transition"
            >
                Go Back
            </button>
        </div>
    );
};

export default ErrorPage;