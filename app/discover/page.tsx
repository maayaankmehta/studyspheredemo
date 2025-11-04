"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StudySessionCard from "@/components/study-session-card"
import CreateSessionDialog from "@/components/create-session-dialog"
import AppLayout from "@/components/app-layout"

const mockSessions = [
  {
    id: "1",
    courseCode: "22CS3AEFWD",
    title: "Advanced Algorithms: Final Exam Review",
    date: "Oct 28",
    time: "4:00 PM - 6:00 PM",
    location: "Library, Room 301",
    attendees: 5,
    hostName: "Alex Johnson",
    groupName: "M3 Masters",
  },
  {
    id: "2",
    courseCode: "MTH201",
    title: "Calculus Study Group",
    date: "Oct 29",
    time: "6:00 PM - 8:00 PM",
    location: "Discord Link",
    attendees: 8,
    hostName: "Sam Lee",
    groupName: "Math Wizards",
  },
  {
    id: "3",
    courseCode: "CS101",
    title: "Web Development Workshop",
    date: "Oct 30",
    time: "3:00 PM - 5:00 PM",
    location: "Tech Hub, Room 102",
    attendees: 12,
    hostName: "Jordan Chen",
    groupName: "Code Ninjas",
  },
  {
    id: "4",
    courseCode: "BIO301",
    title: "Organic Chemistry Review",
    date: "Oct 28",
    time: "5:00 PM - 7:00 PM",
    location: "Science Building, Room 204",
    attendees: 6,
    hostName: "Emma Davis",
    groupName: "Science Squad",
  },
  {
    id: "5",
    courseCode: "ECON101",
    title: "Microeconomics Problem Set",
    date: "Oct 31",
    time: "2:00 PM - 4:00 PM",
    location: "Library, Room 101",
    attendees: 4,
    hostName: "Marcus Brown",
    groupName: "Econ Enthusiasts",
  },
  {
    id: "6",
    courseCode: "ENG201",
    title: "Literature Essay Workshop",
    date: "Nov 1",
    time: "6:00 PM - 8:00 PM",
    location: "Discord Link",
    attendees: 7,
    hostName: "Sofia Rodriguez",
    groupName: "Book Lovers",
  },
  {
    id: "7",
    courseCode: "PHYS201",
    title: "Quantum Mechanics Q&A",
    date: "Oct 29",
    time: "7:00 PM - 9:00 PM",
    location: "Online",
    attendees: 9,
    hostName: "Chris Taylor",
    groupName: "Physics Nerds",
  },
  {
    id: "8",
    courseCode: "HIST301",
    title: "World History Test Prep",
    date: "Oct 30",
    time: "4:00 PM - 6:00 PM",
    location: "Café",
    attendees: 5,
    hostName: "Isabella Martinez",
    groupName: "History Buffs",
  },
  {
    id: "9",
    courseCode: "CS201",
    title: "Data Structures Deep Dive",
    date: "Nov 2",
    time: "5:00 PM - 7:00 PM",
    location: "Tech Hub, Room 105",
    attendees: 11,
    hostName: "David Kim",
    groupName: "Code Ninjas",
  },
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filters = ["All", "Online", "In-Person", "This Week", "Exam Prep"]

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch =
      session.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.groupName.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeFilter === "All") return matchesSearch
    if (activeFilter === "Online")
      return matchesSearch && (session.location === "Discord Link" || session.location === "Online")
    if (activeFilter === "In-Person")
      return matchesSearch && session.location !== "Discord Link" && session.location !== "Online"
    if (activeFilter === "This Week") return matchesSearch
    if (activeFilter === "Exam Prep") return matchesSearch && session.title.toLowerCase().includes("exam")

    return matchesSearch
  })

  return (
    <AppLayout>
      <div>
        <div className="flex justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Sessions</h1>
            <p className="text-muted-foreground text-sm mt-1">Browse and join study sessions</p>
          </div>
          <Button className="gap-2 flex-shrink-0" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={18} />
            <span className="hidden sm:inline">Create Session</span>
          </Button>
        </div>

        {/* Search Input */}
        <div className="mb-6 relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by course code, topic, or group..."
            className="pl-10 h-10 bg-muted border-border text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              size="sm"
              className="text-xs font-medium"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSessions.map((session) => (
            <StudySessionCard key={session.id} session={session} compact={true} />
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No sessions found matching your search.</p>
          </div>
        )}

        <CreateSessionDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
      </div>
    </AppLayout>
  )
}
