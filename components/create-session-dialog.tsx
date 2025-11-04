"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateSessionDialog({ open, onOpenChange }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    group: "",
    location: "",
    date: "",
    time: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Session created:", formData)
    onOpenChange(false)
    setFormData({ title: "", description: "", group: "", location: "", date: "", time: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Study Session</DialogTitle>
          <DialogDescription>Schedule a new session for your fellow students to join.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Session Title</label>
            <Input
              placeholder="e.g., Advanced Algorithms Review"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea
              placeholder="Describe the session and what you'll cover..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Group</label>
            <Select value={formData.group} onValueChange={(value) => setFormData({ ...formData, group: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a Group" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="m3-masters">M3 Masters</SelectItem>
                <SelectItem value="code-ninjas">Code Ninjas</SelectItem>
                <SelectItem value="math-wizards">Math Wizards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Input
              placeholder="e.g., Discord Link, Library Room 301, etc."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Send size={18} />
              Schedule Session
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
