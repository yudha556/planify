import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Coins, Plus } from "lucide-react";
import CoinPackage from "./components/coinPackage";
import TransactionHistory from "./components/transactionHistory";

export default function Billing() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Card className="flex flex-row justify-between items-center gap-3 p-6 shadow-md">
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-lg text-gray-500">
            CURRENT BALANCE
          </h1>

          <div className="flex flex-row gap-6 items-center">
            <Coins className="w-10 h-10 text-yellow-500" />
            <h1 className="text-5xl font-bold">410</h1>
          </div>

          <p className="text-sm text-gray-500">Coin digunakan untuk generate dokumen yang diperlukan</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant={"default"}
            size={"lg"}
            className="flex flex-row gap-2 cursor-pointer hover:shadow-md hover:translate-y-1"
          >
            <Plus />
            Buy Coins
          </Button>
          <Button variant={"outline"} size={"lg"} className="flex flex-row gap-2 cursor-pointer hover:shadow-md hover:translate-y-1">
            View Plans
          </Button>
        </div>
      </Card>
    
      <CoinPackage />
      <TransactionHistory />
    </div>
  );
}
