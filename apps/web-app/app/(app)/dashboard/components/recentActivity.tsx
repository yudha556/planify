import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";

export default function RecentActivity() {
    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Recent Activity</h1>
            <Table>
                <TableHeader className="bg-gray-200">
                    <TableRow>
                        <TableHead className="text-gray-700">Document</TableHead>
                        <TableHead className="text-gray-700">Activity</TableHead>
                        <TableHead className="text-gray-700">Date</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    <TableRow>
                        <TableCell className="font-medium">Student Research Portal</TableCell>
                        <TableCell className="text-gray-700">Exported PDF</TableCell>
                        <TableCell className="text-gray-700">Today, 10:23 AM</TableCell>
                        <TableCell>
                            <Badge className="bg-green-50 text-green-700">Success</Badge>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Student Research Portal</TableCell>
                        <TableCell className="text-gray-700">Generated PRD</TableCell>
                        <TableCell className="text-gray-700">Today, 09:45 AM</TableCell>
                        <TableCell>
                            <Badge className="bg-blue-50 text-blue-700">Saved</Badge>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Fitness Tracker Mobile App</TableCell>
                        <TableCell className="text-gray-700">Update Feature List</TableCell>
                        <TableCell className="text-gray-700">Yesterday</TableCell>
                        <TableCell>
                            <Badge className="bg-blue-50 text-blue-700">Saved</Badge>
                        </TableCell>
                    </TableRow>
                    
                </TableBody>
            </Table>
        </div>
    )
}