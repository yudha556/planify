import { Alert, AlertAction, AlertDescription, AlertTitle } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { AlertCircleIcon } from "lucide-react";

export default function DangerZone() {
    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="text-red-600 text-xl font-bold">Danger Zone</h1>

            <Alert variant={"destructive"} className="w-full bg-red-100 shadow-md">
                <AlertCircleIcon />
                <AlertTitle className="font-semibold text-md">Delete Account</AlertTitle>
                <AlertDescription>Permanently delete your account and all generated documents.</AlertDescription>
                <AlertAction>
                    <Button size={"lg"} variant={"destructive"} className="cursor-pointer hover:shadow-md hover:translate-y-1">
                        Delete Account
                    </Button>
                </AlertAction>
            </Alert>
        </div>
    )
}