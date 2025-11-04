"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateStudyGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateStudyGroupDialog({ open, onOpenChange }: CreateStudyGroupDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    chatLink: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle group creation
    console.log("Creating group:", formData)
    onOpenChange(false)
    setFormData({ name: "", subject: "", description: "", chatLink: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Study Group</DialogTitle>
          <DialogDescription>Start a new study group and invite others to join</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Group Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Advanced Algorithms Masters"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 bg-secondary/50 border-border"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject Code
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="e.g., CS201"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 bg-secondary/50 border-border"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              placeholder="What is this study group about?"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="chatLink" className="text-sm font-medium">
              Chat Link (Discord, etc.)
            </Label>
            <Input
              id="chatLink"
              name="chatLink"
              placeholder="https://discord.gg/..."
              value={formData.chatLink}
              onChange={handleChange}
              className="mt-1 bg-secondary/50 border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Group
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
