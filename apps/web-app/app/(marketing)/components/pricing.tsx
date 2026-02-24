"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Check } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

type PricingOption = "free_tier" | "coin_10" | "coin_50" | "coin_100";
type PricingItem = {
  value: PricingOption;
  title: string;
  describ: string;
  coin: string;
  features: string[];
  button: string;
  isPopular?: boolean;
};

export default function Pricing() {
  const [selectPricing, setSelectPricing] = useState<PricingOption | null>(
    null,
  );

  const pricing: PricingItem[] = [
    {
      value: "free_tier",
      title: "Free Tier",
      describ: "For exploration and drafting",
      coin: "$0 / Forever",
      features: [
        "Unlimited drafts",
        "Basic export",
        "Community support",
        "Limited templates",
      ],
      button: "Start Free",
    },
    {
      value: "coin_10",
      title: "10 Coins",
      describ: "Small export package",
      coin: "$4",
      features: [
        "10 exports",
        "Premium templates",
        "Fast generation",
        "Email support",
      ],
      button: "Buy 10 Coins",
      isPopular: true,
    },
    {
      value: "coin_50",
      title: "50 Coins",
      describ: "Best for freelancers",
      coin: "$15",
      features: [
        "50 exports",
        "All templates",
        "Priority generation",
        "Priority support",
      ],
      button: "Buy 50 Coins",
    },
  ];
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
        {pricing.map((pricing) => (
          <Card
            key={pricing.value}
            onClick={() => setSelectPricing(pricing.value)}
            className={cn(
              "relative px-8 py-10 flex flex-col w-full shadow-md gap-12 cursor-pointer transition-all duration-300 border",
              selectPricing === pricing.value
                ? "border-blue-600 shadow-blue-600/30 bg-blue-50 scale-[1.02]"
                : "hover:border-blue-400 hover:-translate-y-1",
            )}
          >
            {pricing.isPopular && (
              <div className="absolute top-1 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-xl">{pricing.title}</h1>
                <p className="text-gray-500 text-md">{pricing.describ}</p>
              </div>
            </div>

            <h1 className="text-4xl font-bold">{pricing.coin}</h1>
            <div className="flex flex-col gap-3">
              {pricing.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="size-4 text-green-500" />
                  <p className="text-md text-gray-500">{feature}</p>
                </div>
              ))}
            </div>

            <Button
              variant={selectPricing === pricing.value ? "default" : "outline"}
              className={cn(
                "w-full py-5 transition-all duration-300",
                selectPricing === pricing.value &&
                  "bg-blue-600 hover:bg-blue-700 text-white",
              )}
            >
              {pricing.button}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
