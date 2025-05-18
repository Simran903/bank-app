export function Features() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <h1 className="text-5xl md:text-7xl vast-shadow-regular font-extrabold text-center mb-16">
        Features
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl bg-gradient-to-tr from-gray-100 to-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 hover:border-zinc-900"
          >
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-black/80 transition-colors duration-200 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const features = [
  {
    title: "Account Overview Dashboard",
    description:
      "Get a comprehensive view of your account, including balance details, recent transactions, and more.",
  },
  {
    title: "Secure Fund Transfers",
    description:
      "Transfer money easily and securely to other accounts, both within and outside the bank.",
  },
  {
    title: "Transaction History",
    description:
      "View, search, and filter your entire transaction history at a glance.",
  },
  {
    title: "Link Multiple Accounts",
    description:
      "Link multiple bank accounts seamlessly for unified management and convenience.",
  },
  {
    title: "Update Linked Account Details",
    description:
      "Easily update your linked bank account details anytime to keep your information accurate and up-to-date.",
  },
  {
    title: "Real-Time Transaction Tracking",
    description:
      "Monitor your transactions in real-time with detailed insights for better financial control.",
  },
  {
    title: "Secure Password Management",
    description:
      "Update your password anytime to ensure your account stays protected and secure.",
  },
  {
    title: "Security",
    description:
      "Ensure your account is protected with the latest security features.",
  },
];