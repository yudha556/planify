import { Card } from "@workspace/ui/components/card";
import { Keyboard } from "lucide-react";

export default function HowItWorks() {
    return (
        <div className="w-full px-14 py-25 items-center justify-center flex flex-col gap-6 bg-accent/50">
            <h1 className="font-bold text-4xl">How it Works</h1>
            <p className="text-lg text-gray-500">Go from idea to documentation in three guided steps.</p>

            <div className="flex flex-row justify-between items-center w-full gap-10 px-25 mt-14">
                <Card className="flex flex-col gap-8 p-4 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                            <h1 className="text-white font-semibold">1</h1>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-md">Input project details</h1>
                            <p className="font-semibold text-gray-500 text-md">Name, type, role, and language</p>
                        </div>

                        <Keyboard className="size-6 text-gray-500" />
                    </div>

                    <p className="text-md text-gray-500">
                        Start with a simple from that captures what you're building and who it's for. Planify guides you with smart examples
                    </p>
                </Card>
                <Card className="flex flex-col gap-8 p-4 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                            <h1 className="text-white font-semibold">2</h1>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-md">Input project details</h1>
                            <p className="font-semibold text-gray-500 text-md">Name, type, role, and language</p>
                        </div>

                        <Keyboard className="size-6 text-gray-500" />
                    </div>

                    <p className="text-md text-gray-500">
                        Start with a simple from that captures what you're building and who it's for. Planify guides you with smart examples
                    </p>
                </Card>
                <Card className="flex flex-col gap-8 p-4 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                            <h1 className="text-white font-semibold">3</h1>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-md">Input project details</h1>
                            <p className="font-semibold text-gray-500 text-md">Name, type, role, and language</p>
                        </div>

                        <Keyboard className="size-6 text-gray-500" />
                    </div>

                    <p className="text-md text-gray-500">
                        Start with a simple from that captures what you're building and who it's for. Planify guides you with smart examples
                    </p>
                </Card>
            </div>
        </div>
    )
}