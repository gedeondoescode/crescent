import React from "react"
import ReactDOM from "react-dom/client"

import Wrapper from "./App"

import "./styles/globals.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import onboardingRoutes from "./app/onboarding"
import { RspcProvider } from "./lib/rspc"

const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      {
        path: "/",
        lazy: () => import("./app/onboarding/Layout"),
        children: onboardingRoutes,
      },
      // {
      //   path: "onboarding",
      //   children: onboardingRoutes,
      // },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RspcProvider>
      <RouterProvider router={router} />
    </RspcProvider>
  </React.StrictMode>
)
