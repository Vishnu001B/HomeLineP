import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const location = useLocation();

  // Add the paths where Navbar and Header should not be shown
  const hideOnPaths = ["/", "/signup"]; // Replace with actual paths

  const shouldHideNavbarAndHeader = hideOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbarAndHeader && <Header />}
      <div className='flex w-full h-full'>
        {!shouldHideNavbarAndHeader && (
          <div className="fixed top-0 left-0 h-full w-[300px] border-r bg-background z-50 overflow-y-auto">
            <Navbar />
          </div>
        )}
        {/* Add padding-left to offset the fixed Navbar */}
        <div className={`flex-1 ${!shouldHideNavbarAndHeader ? 'pl-[300px]' : ''}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
