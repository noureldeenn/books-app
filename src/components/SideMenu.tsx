import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="w-60 h-screen bg-blue-600 text-white p-4 fixed">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link to="/" className="block p-2 hover:bg-blue-700 rounded">Shop</Link></li>
        <li><Link to="/authors" className="block p-2 hover:bg-blue-700 rounded">Authors</Link></li>
        <li><Link to="/books" className="block p-2 hover:bg-blue-700 rounded">Books</Link></li>
        <li><Link to="/stores" className="block p-2 hover:bg-blue-700 rounded">Stores</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;
