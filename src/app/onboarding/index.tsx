import { Navigate, RouteObject } from "react-router-dom"

import Intro from "./intro"

export default [
  {
    index: true,
    element: <Navigate to="intro" replace />,
  },
  { path: "intro", element: <Intro /> },
] satisfies RouteObject[]
