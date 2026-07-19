import Ticker from "./Ticker.jsx";
import Sidebar from "./Sidebar.jsx";
import MobileHeader from "./MobileHeader.jsx";

export default function Layout({ children }) {
  return (
    <div className="antialiased min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Ticker />
      <div className="flex flex-col md:flex-row flex-1 w-full relative pt-8">
        <Sidebar />
        <MobileHeader />
        <main className="flex-1 md:ml-60 md:pb-12 md:px-8 flex flex-col gap-8 w-full max-w-3xl mr-auto pt-6 px-4 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
