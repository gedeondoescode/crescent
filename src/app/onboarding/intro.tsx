import { OnboardingContainer } from "./Layout"

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
      </div>
    </OnboardingContainer>
  )
}
