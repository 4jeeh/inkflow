import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { InkflowMark, WavyUnderline } from "@/components/doodles/DoodleElements";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] text-[#1E1E24] p-6">
      <div className="ink-card bg-[#FFFDF9] p-8 max-w-md w-full text-center space-y-4">
        <div className="flex justify-center">
          <InkflowMark className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-extrabold">404 — Halaman Kosong</h1>
        <WavyUnderline className="w-40 mx-auto" color="#FB923C" />
        <p className="font-hand text-2xl font-bold text-[#5C5A66]">
          "Lembar buku kas yang kamu cari belum ditulis..."
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="ink-button inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#FB923C] text-[#1E1E24] text-sm font-extrabold"
          >
            Kembali ke Dashboard Inkflow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
