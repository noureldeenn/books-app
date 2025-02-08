import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/Shop";
import AuthorsPage from "./pages/Authors";
import StoresPage from "./pages/Stores";
import BooksPage from "./pages/Books";
import StoreInventoryPage from "./pages/StoreInventory";
import SideMenu from "./components/SideMenu";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideMenu />
        <div className="ml-60  w-full">
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/store/:id" element={<StoreInventoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
