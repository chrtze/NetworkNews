import { Link } from "@remix-run/react";


export default function Header() {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div className="flex-grow items-center">
                <Link className="text-xl text-white pr-2 font-semibold" to="/">Network News</Link>
                <Link className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0" to="/Taxonomy">News Graph</Link>
            </div>
        </div>
    </nav>
  );
}