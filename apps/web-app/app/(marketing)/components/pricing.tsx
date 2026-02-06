import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Check } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

export default function Pricing() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-14 py-14 md:py-25 flex flex-col gap-8 md:gap-14">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-3xl">
            Transparent Pricing
          </h1>
          <p className="text-sm sm:text-base md:text-md text-gray-500">
            Start for free, pay only when you need to export.{" "}
          </p>
        </div>

        <Tabs defaultValue="freemium" className="w-full md:w-auto">
          <TabsList className="px-2 md:px-3 gap-2 md:gap-4 py-2 w-full md:w-auto">
            <TabsTrigger value="freemium" className="text-xs md:text-sm">
              Freemium
            </TabsTrigger>
            <TabsTrigger value="coins" className="text-xs md:text-sm">
              Coins
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-14 items-stretch">
        <Card className="px-4 md:px-8 py-6 md:py-10 flex flex-col w-full shadow-md gap-6 md:gap-12">
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="font-bold text-lg md:text-xl">Free Tier</h1>
            <p className="text-gray-500 text-sm md:text-md">
              For exploration and drafting
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            $0{" "}
            <span className="text-lg md:text-xl text-gray-500 font-semibold">
              / forever
            </span>
          </h1>

          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Generate unlimited project</p>
            </div>
          </div>

          <Button
            variant={"outline"}
            className="w-full py-4 md:py-5 shadow-md border border-gray-300 text-sm md:text-base"
            size={"lg"}
          >
            Get Started Free
          </Button>
        </Card>
        <Card className="px-4 md:px-8 py-6 md:py-10 flex flex-col w-full shadow-lg shadow-blue-200 gap-6 md:gap-12 border-blue-500 border-2 ">
          <div className="flex flex-row justify-between items-start md:items-center w-full gap-2">
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="font-bold text-lg md:text-xl">Pay With Coins</h1>
              <p className="text-gray-500 text-sm md:text-md">
                For exploration and drafting
              </p>
            </div>

            <Badge className="bg-blue-500 text-xs md:text-sm whitespace-nowrap">
              Most Popular
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            1 Coin{" "}
            <span className="text-lg md:text-xl text-gray-500 font-semibold">
              / Export
            </span>
          </h1>

          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Everything in Free Tier</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Remove Watermarks</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Export to PDF</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">Export to Markdown</p>
            </div>
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <Check className="size-4" color="green" />
              <p className="text-sm md:text-md">
                Transparent pricing, no subscribtion
              </p>
            </div>
          </div>

          <Button
            variant={"default"}
            className="w-full py-4 md:py-5 shadow-md border border-gray-300 text-sm md:text-base"
            size={"lg"}
          >
            Buy Coins
          </Button>
        </Card>
      </div>
    </div>
  );
}
