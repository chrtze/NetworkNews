import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Header from '~/routes/header'
import Footer from '~/routes/footer'

import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalUrl from '~/styles/global.css'
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}
