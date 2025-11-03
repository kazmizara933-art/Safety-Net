import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Privacy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Terms
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </nav>
        <p className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
          &copy; {currentYear} SafetyNet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
