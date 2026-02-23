import { Card } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { History } from "lucide-react";

export default function TransactionHistory() {
  const dummyTransaction = [
    {
      id: 1,
      date: "Oct 24, 10:42 AM",
      activity: "Export PDF Document",
      project: "Student Research Portal",
      change: "-50",
    },
    {
      id: 2,
      date: "Oct 24, 10:42 AM",
      activity: "Export PDF Document",
      project: "Student Research Portal",
      change: "-50",
    },
    {
      id: 3,
      date: "Oct 24, 10:42 AM",
      activity: "Export PDF Document",
      project: "Student Research Portal",
      change: "-50",
    },
    {
      id: 4,
      date: "Oct 24, 10:42 AM",
      activity: "Export PDF Document",
      project: "Student Research Portal",
      change: "-50",
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row gap-4 items-center">
        <History />
        <h1 className="font-semibold text-md">Transaction History</h1>
      </div>

      <Card className="p-4 shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyTransaction.map((invoice) => (
              <TableRow key={invoice.id} className="">
                <TableCell className="py-4">{invoice.date}</TableCell>
                <TableCell className="py-4">{invoice.activity}</TableCell>
                <TableCell className="py-4">{invoice.project}</TableCell>
                <TableCell className="py-4">{invoice.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
