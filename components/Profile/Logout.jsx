export default function Logout({ logout }) {
    return (
      <button
        onClick={logout}
        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition ease-in-out duration-200"
      >
        Logout
      </button>
    );
  }
  