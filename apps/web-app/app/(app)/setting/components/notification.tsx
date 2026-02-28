import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";

export default function Notification() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-xl font-bold">Notifications</h1>
        <p className="text-sm text-gray-500">
          Control what emails you receive.
        </p>
      </div>

      <Card className="flex flex-col gap-8 px-4 py-6">
        <CardContent>
          <Field orientation="horizontal" className="w-full">
            <FieldContent>
              <FieldLabel htmlFor="generation_complete">
                Generation Complete
              </FieldLabel>
              <FieldDescription>
                Email me when a large document is ready.
              </FieldDescription>
            </FieldContent>
            <Switch id="generation_complete" />
          </Field>
        </CardContent>
        <CardContent>
          <Field orientation="horizontal" className="w-full">
            <FieldContent>
              <FieldLabel htmlFor="low_coint">Low Coint Balance</FieldLabel>
              <FieldDescription>
                Alert when balance drops below 50 coins.
              </FieldDescription>
            </FieldContent>
            <Switch id="low_coint" />
          </Field>
        </CardContent>
        <CardContent>
          <Field orientation="horizontal" className="w-full">
            <FieldContent>
              <FieldLabel htmlFor="product_updates">Product Updates</FieldLabel>
              <FieldDescription>
                News about new features and improvements.
              </FieldDescription>
            </FieldContent>
            <Switch id="product_updates" />
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
