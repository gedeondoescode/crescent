import { useEffect, useState } from "react"
import { CalendarDateRangePicker } from "@/dashboard/components/date-range-picker"
// import { MainNav } from "@/dashboard/components/main-nav"
import { Overview } from "@/dashboard/components/overview"
import { RecentSales } from "@/dashboard/components/recent-sales"
// import { Search } from "@/dashboard/components/search"
// import TeamSwitcher from "@/dashboard/components/team-switcher"
// import { UserNav } from "@/dashboard/components/user-nav"
import { Activity, CreditCard, DollarSign, Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [time, setTime] = useState(new Date())

  //Revalidate time every 1000ms
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Change greeting based on current time
  const hour = time.getHours()
  const day = time.toLocaleString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  // TODO: show user's name in greeting
  const greeting = `Good ${
    (hour < 6 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, Gedeon`

  // Get current time for locale
  const currentTime = time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <div className="h-screen flex-col md:flex">
      {/* <div className="border-b"> */}
      {/* <div className="flex h-16 items-center px-4"> */}
      {/* <TeamSwitcher /> */}
      {/* <MainNav className="mx-6" /> */}
      {/* <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div> */}
      {/* </div> */}
      {/* </div> */}
      <div className="flex grow flex-row">
        {/* TODO: add a finished navbar later */}
        {/* <div className="flex h-screen w-full max-w-[190px] flex-row bg-blue-900">
          navbar
        </div> */}
        <div className="h-full flex-1 px-8 py-6">
          <div className="flex h-full grow flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <h1 className="text-5xl font-bold">{greeting}</h1>
              <div className="flex flex-row">
                <p className="font-semibold ">
                  Today is {day}. It is currently
                  <span className="font-extrabold"> {currentTime}</span>
                </p>
              </div>
            </div>
            <div className="my-5 flex h-full grow-0 flex-col">
              <div className="mb-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="h-28">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-28">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-28">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-28">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex grow flex-col rounded-lg border">
                <div className="flex h-full flex-col items-center justify-center space-y-5 p-10 text-center">
                  <h1 className="text-3xl font-extrabold">
                    Seems Empty Here...
                  </h1>
                  <p className="w-2/4 text-lg">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Repellat similique beatae praesentium dolorum animi nisi
                    dolores perferendis totam, quidem laborum vel quae aut
                    dolorem, deserunt suscipit? Mollitia iste delectus totam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
