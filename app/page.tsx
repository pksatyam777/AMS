import { LoginForm } from "@/components/login-form"

export default function Home() {
  // In a real app, you would check if the user is authenticated
  // const isAuthenticated = checkAuth()
  // if (isAuthenticated) redirect("/dashboard")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Attendance Management System
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your attendance tracking, leave management, and HR processes with our comprehensive
                    solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
                    <LoginForm />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  alt="Attendance Management"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="550"
                  src="/placeholder.svg?height=550&width=800"
                  width="800"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
