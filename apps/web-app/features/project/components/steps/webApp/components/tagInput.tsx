"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add item...",
  className,
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>([])
  const [input, setInput] = React.useState("")

  const tags = value ?? internalTags

  const updateTags = React.useCallback(
    (newTags: string[]) => {
      if (onChange) {
        onChange(newTags)
      } else {
        setInternalTags(newTags)
      }
    },
    [onChange]
  )

  const addTag = (val: string) => {
    const trimmed = val.trim()
    if (!trimmed) return
    if (tags.includes(trimmed)) return

    updateTags([...tags, trimmed])
    setInput("")
  }

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", " ", ","].includes(e.key)) {
      e.preventDefault()
      addTag(input)
    }

    if (e.key === "Backspace" && !input && tags.length) {
      updateTags(tags.slice(0, -1))
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text")
    if (paste.includes(",")) {
      e.preventDefault()
      const items = paste
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)

      const newTags = [...new Set([...tags, ...items])]
      updateTags(newTags)
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border px-3 py-1.5 min-h-11 focus-within:ring-2 focus-within:ring-ring transition",
        className
      )}
    >
      {tags.map((tag, index) => (
        <Badge
          key={tag + index}
          variant="secondary"
          className="flex items-center gap-1 rounded-md shadow-md border border-gray-300 py-1 px-2"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(index)
            }}
            className="ml-1 rounded-sm p-0.5 hover:bg-muted transition cursor-pointer"
          >
            <X className="h-3 w-3 opacity-70 hover:opacity-100" />
          </button>
        </Badge>
      ))}

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="border-none shadow-none focus-visible:ring-0 flex-1 min-w-[120px] p-0"
      />
    </div>
  )
}