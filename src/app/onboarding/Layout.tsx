import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

type ChildProps = {
  children: ReactNode
}

export const OnboardingContainer = (props: ChildProps) => {
  return <div className="flex flex-col items-center">{props.children}</div>
}

export const Component = () => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="-mt-5 flex grow flex-col gap-8 p-10">
          <div className="flex grow flex-col items-center justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
