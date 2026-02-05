import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Check } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

export default function Pricing() {
  return (
    <div className="w-full px-14 py-25 flex flex-col gap-14">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Transparent Pricing</h1>
          <p className="text-md text-gray-500">
            Start for free, pay only when you need to export.{" "}
          </p>
        </div>

        <Tabs defaultValue="freemium">
          <TabsList className="px-3 gap-4 py-2">
            <TabsTrigger value="freemium">Freemium</TabsTrigger>
            <TabsTrigger value="coins">Coins</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-row items-center justify-between gap-14 w-full">
        <Card className="px-8  py-10 flex flex-col w-full shadow-md gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Free Tier</h1>
            <p className="text-gray-500 text-md">
              For exploration and drafting
            </p>
          </div>

          <h1 className="text-4xl font-bold">
            $0{" "}
            <span className="text-xl text-gray-500 font-semibold">
              / forever
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Generate unlimited project</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Generate unlimited project</p>
            </div>
          </div>

          <Button
            variant={"outline"}
            className="w-full py-5 shadow-md border border-gray-300"
            size={"lg"}
          >
            Get Started Free
          </Button>
        </Card>
        <Card className="px-8  py-10 flex flex-col w-full shadow-lg shadow-blue-200 gap-12 border-blue-500 border-2 ">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">Pay With Coins</h1>
              <p className="text-gray-500 text-md">
                For exploration and drafting
              </p>
            </div>

            <Badge  className="bg-blue-500">Most Popular</Badge>
          </div>

          <h1 className="text-4xl font-bold">
            1 Coin{" "}
            <span className="text-xl text-gray-500 font-semibold">
              / Export
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Everything in Free Tier</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Remove Watermarks</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Export to PDF</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Export to Markdown</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Check className="size-4" color="green" />
              <p className="text-md">Transparent pricing, no subscribtion</p>
            </div>
          </div>

          <Button
            variant={"default"}
            className="w-full py-5 shadow-md border border-gray-300"
            size={"lg"}
          >
            Buy Coins
          </Button>
        </Card>
      </div>
    </div>
  );
}
