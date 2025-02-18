const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-primaryTextColor border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
