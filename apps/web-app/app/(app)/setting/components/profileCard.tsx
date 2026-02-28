"use client";

import { useState, useRef } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import Image from "next/image";

export default function ProfileCard() {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
    }
  };

  const handleRemove = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your public profile and role information.
          </p>
        </div>

        <Card className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-semibold">Profile Photo</h1>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-4 items-center">
                <div className="relative w-24 aspect-square">
                  <Image
                    src={image || "/default-avatar.png"}
                    alt="profile"
                    fill
                    className="rounded-full border-2 object-cover"
                  />
                </div>

                <Field>
                  <Input
                    ref={inputRef}
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                </Field>
              </div>

              {image && (
                <Button
                  variant="destructive"
                  onClick={handleRemove}
                  className="cursor-pointer"
                >
                  Hapus
                </Button>
              )}
            </div>

            <div className="flex flex-row justify-between items-center w-full gap-6">
              <Field>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input
                  id="full_name"
                  placeholder="Dr. Maya Putri"
                  className="py-5"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="maya.putri@university.edu"
                  className="py-5"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="role">Primary Role</FieldLabel>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Lecture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dosen">Dosen</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription className="text-xs">
                This help AI tailor content generation to your experties level.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="institution">
                Institution / Company
              </FieldLabel>
              <Input
                id="institution"
                placeholder="University of Indonesia"
                className="py-5"
              />
            </Field>
          </div>
        </Card>
      </div>
    </div>
  );
}
