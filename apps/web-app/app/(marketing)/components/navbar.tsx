"use client"

import { useState } from "react"
import { Card } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet"
import { FileText, Menu } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        { label: "Features", href: "#" },
        { label: "How it Works", href: "#" },
        { label: "Pricing", href: "#" }
    ]

    return (
        <div className="w-full">
            <Card className="w-full shadow-md rounded-none flex flex-row justify-between items-center px-4 md:px-14 py-4">
                <div className="flex flex-row gap-4 items-center md:w-full">
                    <div className="w-10 h-10 items-center justify-center flex rounded-md bg-blue-600">
                        <FileText className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Planify</h1>
                </div>

                <div className="hidden md:flex flex-row gap-12 items-center w-full justify-center">
                    {menuItems.map((item) => (
                        <a key={item.label} href={item.href} className="text-sm font-medium text-gray-500 hover:translate-y-1 transform-all duration-200">
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex flex-row gap-6 items-center w-full justify-end">
                    <Link href="/login">
                        <Button variant="outline" size="lg" className="min-w-30 cursor-pointer hover:shadow-md hover:translate-y-1">Login</Button>
                    </Link>

                    <Link href="/register">
                        <Button variant="default" size="lg" className="min-w-30 cursor-pointer hover:shadow-md hover:translate-y-1">Sign Up</Button>
                    </Link>
                </div>

                <div className="md:hidden ml-auto">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="flex flex-col gap-4">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="outline" size="lg" className="w-full cursor-pointer">Login</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="default" size="lg" className="w-full cursor-pointer">Sign Up</Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Card>
        </div>
    )
}