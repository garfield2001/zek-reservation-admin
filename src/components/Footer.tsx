export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Support
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center md:text-left text-sm text-gray-400">
              &copy; {currentYear} Zek Catering Systems. All rights reserved.
            </p>
            <p className="text-center md:text-left text-xs text-gray-300 mt-1">
              Version 1.0.0 &bull; Admin Portal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
