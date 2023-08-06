import React from "react"
import ReactDOM from "react-dom/client"

import Wrapper from "./App"

import "./styles/globals.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import onboardingRoutes from "./app/onboarding"
import { RspcProvider } from "./lib/rspc"
import DashboardPage from "./dashboard/page"

const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      {
        path: "/",
        lazy: () => import("./app/onboarding/Layout"),
        children: onboardingRoutes,
      },
      {
        path: "/dashboard",
        element: <DashboardPage/>,
      }
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
