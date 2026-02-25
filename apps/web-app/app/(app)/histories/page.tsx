import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { FileDown, FileText, Plus, Coins, Pencil, Trash2 } from "lucide-react";

const TRANSACTION_META = {
  export: {
    icon: FileDown,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  generate: {
    icon: FileText,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  create: {
    icon: Plus,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  purchase: {
    icon: Coins,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  update: {
    icon: Pencil,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  delete: {
    icon: Trash2,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
} as const;

type TransactionType = keyof typeof TRANSACTION_META;

type TransactionItem = {
  id: string;
  type: TransactionType;
  title: string;
  projectType: string;
  coins: number;
  time: string;
};

type TransactionGroup = {
  day: string;
  date: string;
  transactions: TransactionItem[];
};

const dummyTransaction: TransactionGroup[] = [
  {
    day: "Today",
    date: "Oct 24",
    transactions: [
      {
        id: "trx-001",
        type: "export",
        title: "Exported PDF Document",
        projectType: "Student Research Portal · Web App",
        coins: -5,
        time: "10:42 AM",
      },
      {
        id: "trx-002",
        type: "generate",
        title: "Generated Project Brief",
        projectType: "Student Research Portal · Web App",
        coins: 0,
        time: "10:15 AM",
      },
      {
        id: "trx-003",
        type: "create",
        title: "Created New Project",
        projectType: "Student Research Portal",
        coins: 0,
        time: "10:00 AM",
      },
    ],
  },
  {
    day: "Yesterday",
    date: "Oct 23",
    transactions: [
      {
        id: "trx-004",
        type: "purchase",
        title: "Purchased Coin Pack",
        projectType: "Starter Pack (50 Coins)",
        coins: 50,
        time: "4:30 PM",
      },
      {
        id: "trx-005",
        type: "update",
        title: "Updated Research Scope",
        projectType: "AI Ethics in Education · Research",
        coins: 0,
        time: "2:15 PM",
      },
    ],
  },
  {
    day: "",
    date: "Oct 18, 2024",
    transactions: [
      {
        id: "trx-006",
        type: "export",
        title: "Exported Markdown",
        projectType: "E-Commerce Mobile App · Mobile",
        coins: -5,
        time: "9:20 AM",
      },
      {
        id: "trx-007",
        type: "delete",
        title: "Deleted Project",
        projectType: "Untitled Project (Draft)",
        coins: 0,
        time: "8:45 AM",
      },
    ],
  },
];

export default function Histories() {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <div className="flex flex-row items-center gap-4">
        <Button
          variant={"outline"}
          className="px-3 rounded-full bg-blue-600 cursor-pointer hover:shadow-md hover:translate-y-1 text-white"
        >
          All Activity
        </Button>
        <Button
          variant={"outline"}
          className="px-3 rounded-full cursor-pointer hover:shadow-md hover:translate-y-1 "
        >
          <FileText />
          Documents
        </Button>
        <Button
          variant={"outline"}
          className="px-3 rounded-full cursor-pointer hover:shadow-md hover:translate-y-1 "
        >
          <Coins />
          Transactions
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {dummyTransaction.map((group) => (
          <div key={group.date} className="space-y-3">
            {/* Header tanggal */}
            <p className="text-xs font-medium text-muted-foreground">
              {group.day} • {group.date}
            </p>

            <Card>
              <CardContent className="p-0">
                {group.transactions.map((trx, idx) => {
                  const meta = TRANSACTION_META[trx.type];
                  const Icon = meta.icon;

                  return (
                    <div key={trx.id}>
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.bgColor}`}
                          >
                            <Icon className={`h-5 w-5 ${meta.iconColor}`} />
                          </div>

                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">{trx.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {trx.projectType}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex flex-col gap-1">
                          <p
                            className={`text-sm font-medium ${
                              trx.coins > 0
                                ? "text-green-600"
                                : trx.coins < 0
                                  ? "text-muted-foreground"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {trx.coins === 0
                              ? "Free"
                              : `${trx.coins > 0 ? "+" : ""}${trx.coins} Coins`}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {trx.time}
                          </p>
                        </div>
                      </div>

                      {idx !== group.transactions.length - 1 && (
                        <div className="mx-4 h-0.5 bg-gray-200 dark:bg-gray-900" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
