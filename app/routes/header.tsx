import { Link } from "@remix-run/react";


export default function Header() {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-zinc-600 text-zinc-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div className="flex-grow items-center">
                <Link className="text-xl pr-2 font-semibold" to="/">Network News</Link>
                <Link className="nav-link opacity-60 hover:opacity-80 focus:opacity-80 p-0" to="graph/topics">Topics</Link>
                <Link className="nav-link opacity-60 hover:opacity-80 focus:opacity-80 p-0" to="graph/entities">Entities</Link>
            </div>
        </div>
    </nav>
  );
}