import { Button } from "@workspace/ui/components/button";

export default function PlanningSection() {
  return (
    <div className="flex flex-col gap-8 md:gap-14 w-full bg-blue-600 text-white px-4 sm:px-8 md:px-14 py-14 md:py-25 items-center justify-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Start planning smarter today
      </h1>

      <div className="flex flex-col items-center w-full gap-5 md:gap-8 max-w-2xl">
        <h2 className="text-center text-sm sm:text-base md:text-md font-medium">
          Create your first project n minutes. Preview everything for free and
          export only when you're ready to share
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 md:gap-2">
          <Button
            variant={"secondary"}
            size="lg"
            className="rounded-sm px-6 md:px-10 py-4 md:py-6 transform-all hover:shadow-md hover:translate-y-1 cursor-pointer w-full sm:w-auto text-sm md:text-base"
          >
            Get Started Free
          </Button>
          <p className="text-xs sm:text-sm md:text-md">
            No Lock-in. No Subscriptions. Just coins when you need them
          </p>
        </div>
      </div>
    </div>
  );
}
