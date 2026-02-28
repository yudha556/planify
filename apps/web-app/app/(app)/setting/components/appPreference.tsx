import { Card } from "@workspace/ui/components/card";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";

export default function AppPreference() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-xl font-bold">App Preferences</h1>
        <p className="text-sm text-gray-500">
          Customize language and regional formats.
        </p>
      </div>
      <Card className="flex flex-col gap-6 px-4 py-6">
        <Field>
            <FieldLabel htmlFor="interface">Interface Language</FieldLabel>
            <Select>
                <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="English" />
                </SelectTrigger>

                <SelectContent>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="english">English (US)</SelectItem>
                            <SelectItem value="indonesia">Indonesia</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </SelectContent>
            </Select>
        </Field>

        <Field>
            <FieldLabel htmlFor="output">Document Output Default Language</FieldLabel>
            <Select>
                <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Bahasa Indonesia" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="indonesia">Bahasa Indonesia</SelectItem>
                        <SelectItem value="english">English (US)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
      </Card>
    </div>
  );
}
