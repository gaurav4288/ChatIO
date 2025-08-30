import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { 
  MessageCircle, 
  Settings, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!authUser) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ChatIO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Profile Link */}
            <Link
              to="/profile"
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-error/10 hover:bg-error/20 text-error transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-base-300">
            <div className="flex flex-col space-y-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <span>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
              </button>

              {/* Profile Link */}
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>

              {/* Settings Link */}
              <Link
                to="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-error/10 hover:bg-error/20 text-error transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;