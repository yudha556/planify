import { AnimatedCheck } from "@workspace/ui/components/animated-check"
import { VisuallyHidden } from "@workspace/ui/components/visually-hidden"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog"

export function VerifySuccessModal({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Verification successful</DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col items-center gap-4 py-6">
          <AnimatedCheck />
          <p className="text-sm text-muted-foreground">
            Your account has been verified
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
