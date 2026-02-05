import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full">
            <Card className="w-full shadow-md rounded-none flex flex-row justify-between items-center px-14 py-4">
                <div className="flex flex-row gap-4 items-center w-full">
                    <div className="w-10 h-10 items-center justify-center flex rounded-md bg-blue-600">
                        <FileText className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Planify</h1>
                </div>

                <div className="flex flex-row gap-12 items-center w-full justify-center">
                    <a href="#" className="text-sm font-medium text-gray-500 hover:translate-y-1 transform-all duration-200">Features</a>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:translate-y-1 transform-all duration-200">How it Works</a>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:translate-y-1 transform-all duration-200">Pricing</a>
                </div>

                <div className="flex flex-row gap-6 items-center w-full justify-end">
                    <Link href="/login">
                    
                    <Button variant="outline" size="lg" className="min-w-30 cursor-pointer hover:shadow-md hover:translate-y-1 ">Login</Button>
                    </Link>
                    <Button variant="default" size="lg" className="min-w-30 cursor-pointer hover:shadow-md hover:translate-y-1 ">Sign Up</Button>
                </div>
            </Card>
        </div>
    )
}