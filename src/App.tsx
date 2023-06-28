import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { Menu } from "@/components/menu"

import { ThemeProvider } from "./components/theme-provider"
import { appReady } from "./lib/commands"

function Wrapper() {
  useEffect(() => {
    // This tells Tauri to show the current window because it's finished loading
    appReady()
  }, [])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="bg-background">
          <Menu />
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  )
}

export default Wrapper
