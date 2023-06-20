import { createClient } from "@rspc/client"
import { createReactQueryHooks } from "@rspc/react"
import { TauriTransport } from "@rspc/tauri"
import { QueryClient } from "@tanstack/react-query"

import type { Procedures } from "./bindings" // These were the bindings exported from your Rust code!

export const rspc = createReactQueryHooks<Procedures>()

const client = createClient<Procedures>({
  transport: new TauriTransport(),
})

const queryClient = new QueryClient()

export function RspcProvider({ children }: any) {
  return (
    <rspc.Provider client={client as any} queryClient={queryClient}>
      {children}
    </rspc.Provider>
  )
}
