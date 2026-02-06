import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-14 pt-12 md:pt-20 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 pb-10 md:pb-16">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-row gap-3 items-center">
            <div className="w-8 h-8 items-center justify-center flex bg-blue-600">
              <FileText className="size-4 text-white" />
            </div>
            <h1 className="font-bold text-xl md:text-2xl">Planify</h1>
          </div>

          <div className="w-full max-w-sm">
            <p className="text-sm md:text-md text-gray-500">
              AI-powered documentation for modern product teams, student, and
              independent builders.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-14">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-sm md:text-md font-semibold">Product</h1>

            <div className="flex flex-col gap-2 md:gap-3">
              <p className="text-gray-500 text-sm md:text-md cursor-pointer">
                Feature
              </p>
              <p className="text-gray-500 text-sm md:text-md cursor-pointer">
                Pricing
              </p>
              <p className="text-gray-500 text-sm md:text-md cursor-pointer">
                Example PRD
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-sm md:text-md font-semibold">Company</h1>

            <div className="flex flex-col gap-2 md:gap-3">
              <p className="text-gray-500 text-sm md:text-md cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-gray-500 text-sm md:text-md cursor-pointer">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-300 flex items-center justify-center py-4 md:py-6">
        <p className="text-gray-400 text-xs md:text-sm font-light">
          a9 2026 Planify, All right reserved.
        </p>
      </div>
    </div>
  );
}
