const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4 drop-shadow">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
