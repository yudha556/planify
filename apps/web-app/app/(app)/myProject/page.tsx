import { Button } from "@workspace/ui/components/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import { BookOpen, LayoutTemplate, Search, Smartphone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import RecentActivity from "./components/recentActivity";

export default function MyProject() {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <div className="flex flex-row items-center gap-4">
        <InputGroup className="w-full max-w-sm bg-white shadow-md h-10">
          <InputGroupInput
            id="input-group-url"
            placeholder="Search Documents"
          />
          <InputGroupAddon align={"inline-start"}>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <p className="text-gray-500 text-sm">Project Type</p>
        <Button
          variant={"outline"}
          className="bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
        >
          All
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row gap-2 items-center bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
        >
          <LayoutTemplate />
          Web App
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row gap-2 items-center bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
        >
          <BookOpen />
          Research
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row gap-2 items-center bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
        >
          <Smartphone />
          Mobile
        </Button>
      </div>

      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row gap-4 items-center w-full">
          <p className="text-gray-500 text-sm">Status</p>
          <Button
            variant={"outline"}
            className="bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
          >
            Any Status
          </Button>
          <Button
            variant={"outline"}
            className="bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
          >
            Draft
          </Button>
          <Button
            variant={"outline"}
            className="bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
          >
            In Progress
          </Button>
          <Button
            variant={"outline"}
            className="bg-white text-medium px-3 rounded-xl border-gray-300 hover:shadow-md cursor-pointer hover:translate-y-1"
          >
            Generated
          </Button>
        </div>

        <div className="flex flex-row items-center gap-3 justify-end w-full">
          <p className="text-sm text-gray-500">Short by</p>
          <Select defaultValue="lastedited">
            <SelectTrigger className="w-full max-w-48 bg-white shadow-md border-gray-300 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" side="bottom">
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="lastedited">Last Edited</SelectItem>
                <SelectItem value="1hour">1 Hour</SelectItem>
                <SelectItem value="1day">1 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <RecentActivity />
    </div>
  );
}
