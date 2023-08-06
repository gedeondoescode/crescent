import { Button } from "@/components/ui/button"
import { OnboardingContainer } from "./Layout"
import { Link } from "react-router-dom"

export default function Intro() {
  return (
    <OnboardingContainer>
      <div className="relative w-screen text-center">
        <div className="relative z-10 flex flex-col gap-5">
          <div className="mb-5 flex w-full items-center justify-center gap-2">
            <h1 className="text-[25px] font-semibold">Crescent</h1>
          </div>
          <h1 className="text-4xl font-bold">Welcome to Crescent</h1>
          <p className="mx-auto w-full max-w-2xl text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            incidunt inventore suscipit, sunt quae modi hic corporis placeat
            doloribus quas sequi ipsum dignissimos animi. Consequuntur sequi
            quis ipsa odio blanditiis!
          </p>
        </div>
        <div className="my-5">
            <Link to="/dashboard" replace={true}>
              <Button variant={"secondary"} size={"lg"} className="bg-white text-black w-48 text-lg hover:text-neutral-50">
                Let's go!
              </Button>
            </Link>
        </div>
      </div>
    </OnboardingContainer>
  )
}
