const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 rounded-tl-full rounded-tr-full">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        
        <h1 className="text-lg font-bold">BANK-APP</h1>

        <nav className="flex space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">FAQs</a>
          <a href="#" className="hover:underline">Login</a>
        </nav>

        <p className="text-sm">&copy; {new Date().getFullYear()} Bank-App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
