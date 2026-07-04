export const cardStyle = (darkMode) =>
    darkMode
        ? "bg-gray-800 text-white border border-gray-700"
        : "bg-white text-gray-900 border border-gray-200";

export const inputStyle = (darkMode) =>
    darkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        : "bg-white border-gray-300 text-gray-900";

export const pageStyle = (darkMode) =>
    darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-gray-900";

export const navbarStyle = (darkMode) =>
    darkMode
        ? "bg-gray-400/10 border-b border-gray-700"
        : "bg-sky-600/20 border-b border-gray-200";

export const buttonPrimary =
    "bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition";

export const buttonDanger =
    "bg-red-600 hover:bg-red-700 text-white rounded-lg transition";

export const buttonSuccess =
    "bg-green-600 hover:bg-green-700 text-white rounded-lg transition";