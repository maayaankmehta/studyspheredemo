"use client"

import { useState } from "react"
import { Search, Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StudyGroupCard from "@/components/study-group-card"
import AppLayout from "@/components/app-layout"
import CreateStudyGroupDialog from "@/components/create-study-group-dialog"

const mockStudyGroups = [
  {
    id: "1",
    name: "Team StudySphere",
    subject: "22CS3AEFWD",
    description: "Deep dive into React JS, FASTAPI and Django.",
    members: 24,
    createdBy: "RazanCodes",
    memberImages: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    ],
  },
  {
    id: "2",
    name: "Statistics and Discrete Maths",
    subject: "23MA3BSSDM",
    description: "Collaborative learning space for probability and stats concepts, problem-solving, and exam prep.",
    members: 18,
    createdBy: "Talib Khan",
    memberImages: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    ],
  },
  {
    id: "3",
    name: "Java Coding Club",
    subject: "23CS3PCOOJ",
    description: "Led by Faculty Monisha H M for learining developing Java Applications",
    members: 32,
    createdBy: "Monisha H M",
    memberImages: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    ],
  },
  {
    id: "4",
    name: "Data Structures",
    subject: "23CS3PCDST",
    description: "Explore Data Structures, and How they work together.",
    members: 15,
    createdBy: "Muzammil Zahoor",
    memberImages: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    ],
  },
  {
    id: "5",
    name: "Machine Learning gang",
    subject: "23CS6PCMAL",
    description: "Advanced machine learning techniques, neural networks, and AI project discussions.",
    members: 28,
    createdBy: "Mayank",
    memberImages: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    ],
  },
]

export default function StudyGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredGroups = mockStudyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Groups</h1>
            <p className="text-muted-foreground text-sm mt-1">Join or create a study group to collaborate with peers</p>
          </div>
          <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} />
            Create Group
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by group name, subject, or description..."
              className="pl-10 bg-secondary/50 border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Groups List */}
        {filteredGroups.length > 0 ? (
          <div className="space-y-10">
            {filteredGroups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-lg p-12 border border-border">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <BookOpen size={48} className="text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">No groups found</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
              Try adjusting your search or create a new study group to get started.
            </p>
          </div>
        )}
      </div>

      {/* Create Study Group Dialog */}
      <CreateStudyGroupDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </AppLayout>
  )
}
