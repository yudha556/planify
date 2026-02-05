import { Button } from "@workspace/ui/components/button";

export default function PlanningSection() {
    return (
        <div className="flex flex-col gap-14 w-full bg-blue-600 text-white px-14 py-25 items-center justify-center">
            <h1 className="text-4xl font-bold">Start planning smarter today</h1>

            <div className="flex flex-col items-center w-full gap-8 max-w-2xl">
                <h2 className="text-center text-md font-medium">Create your first project n minutes. Preview everything for free and export only when you're ready to share</h2>

                <div className="flex flex-row justify-between items-center w-full gap-2">
                    <Button variant={"secondary"} size="lg" className="rounded-sm px-10 py-6 transform-all hover:shadow-md hover:translate-y-1 cursor-pointer">Get Started Free</Button>
                    <p>No Lock-in. No Subscriptions. Just coins when you need them</p>
                </div>
            </div>
        </div>
    )
}