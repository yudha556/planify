import { Card } from "@workspace/ui/components/card";
import { Keyboard } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-14 py-14 md:py-25 items-center justify-center flex flex-col gap-4 md:gap-6 bg-accent/50">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
        How it Works
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-500">
        Go from idea to documentation in three guided steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full justify-between items-center gap-4 md:gap-10 mt-8 md:mt-14">
        <Card className="flex flex-col gap-4 md:gap-8 p-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0">
              <h1 className="text-white font-semibold text-sm">1</h1>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h1 className="font-semibold text-sm md:text-md">
                Input project details
              </h1>
              <p className="font-semibold text-gray-500 text-xs md:text-sm">
                Name, type, role, and language
              </p>
            </div>

            <Keyboard className="size-5 md:size-6 text-gray-500 flex-shrink-0" />
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Start with a simple from that captures what you're building and who
            it's for. Planify guides you with smart examples
          </p>
        </Card>
        <Card className="flex flex-col gap-4 md:gap-8 p-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0">
              <h1 className="text-white font-semibold text-sm">2</h1>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h1 className="font-semibold text-sm md:text-md">
                Input project details
              </h1>
              <p className="font-semibold text-gray-500 text-xs md:text-sm">
                Name, type, role, and language
              </p>
            </div>

            <Keyboard className="size-5 md:size-6 text-gray-500 flex-shrink-0" />
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Start with a simple from that captures what you're building and who
            it's for. Planify guides you with smart examples
          </p>
        </Card>
        <Card className="flex flex-col gap-4 md:gap-8 p-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0">
              <h1 className="text-white font-semibold text-sm">3</h1>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h1 className="font-semibold text-sm md:text-md">
                Input project details
              </h1>
              <p className="font-semibold text-gray-500 text-xs md:text-sm">
                Name, type, role, and language
              </p>
            </div>

            <Keyboard className="size-5 md:size-6 text-gray-500 flex-shrink-0" />
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Start with a simple from that captures what you're building and who
            it's for. Planify guides you with smart examples
          </p>
        </Card>
      </div>
    </div>
  );
}
