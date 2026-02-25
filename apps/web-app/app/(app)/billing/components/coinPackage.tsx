import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { ListOrderedIcon } from "lucide-react";

export default function CoinPackage() {
  const dummyCoin = [
    {
      id: 1,
      coin: "500",
      description: "Suitable for trying a few documents.",
      price: "$5",
    },
    {
      id: 2,
      coin: "1500",
      description: "Recommended for active students and professionals.",
      price: "$12",
    },
    {
      id: 3,
      coin: "3000",
      description: "For labs teams, or intensive research planning.",
      price: "$20",
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row gap-4 items-center">
        <ListOrderedIcon />
        <h1 className="text-md font-semibold">Coin Packages</h1>
      </div>
      <Card className="p-4 flex flex-col shadow-md">
        {dummyCoin.map((item, i) => (
          <div key={item.id}>
            <CardContent className="flex flex-row items-center justify-between py-4">
              <div className="flex flex-col gap-0">
                <h1 className="text-md font-semibold">{item.coin} Coin</h1>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <h1 className="text-sm font-semibold">{item.price}</h1>
                <Button variant="outline" size="lg" className="shadow-md px-6 flex flex-row gap-2 cursor-pointer hover:shadow-md hover:translate-y-1">
                  Buy
                </Button>
              </div>
            </CardContent>

            {i !== dummyCoin.length - 1 && (
              <Separator className="bg-gray-200 h-px" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
