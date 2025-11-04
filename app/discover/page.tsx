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
    title: "Full Stack Web Development",
    date: "Oct 22",
    time: "8:00 AM - 10:00 AM",
    location: "CSE-UG LAB2",
    attendees: 4,
    hostName: "RazanCodes",
    groupName: "Team StudySphere",
  },
  {
    id: "2",
    courseCode: "23MA3BSSDM",
    title: "Probability Practice",
    date: "Oct 23",
    time: "1:00 PM - 2:00 PM",
    location: "Reference Section, 1st Floor PJA Block",
    attendees: 8,
    hostName: "Talib Khan",
    groupName: "SDM Group",
  },
  {
    id: "3",
    courseCode: "23CS3PCOOJ ",
    title: "Java Coding Session (cie-1)",
    date: "Oct 25",
    time: "3:00 PM - 5:00 PM",
    location: "CSE Dept, Room 102",
    attendees: 12,
    hostName: "RazanCodes",
    groupName: "Backend Fans",
  },
  {
  id: "4",
  courseCode: "23CS3ESCOA",
  title: "Computer Architecture Revision",
  date: "Oct 26",
  time: "10:00 AM - 12:00 PM",
  location: "CSE-UG LAB1",
  attendees: 6,
  hostName: "Aditya Sharma",
  groupName: "Architecture Masters",
},
{
  id: "5",
  courseCode: "23CS3PCLOD",
  title: "Logic Design Problem Solving",
  date: "Oct 27",
  time: "2:00 PM - 4:00 PM",
  location: "CSE Dept, Room 205",
  attendees: 10,
  hostName: "Priya Menon",
  groupName: "Digital Logic Squad",
},
{
  id: "6",
  courseCode: "23CS3PCDBM",
  title: "Database Queries Workshop",
  date: "Oct 28",
  time: "9:00 AM - 11:00 AM",
  location: "CSE-UG LAB3",
  attendees: 15,
  hostName: "RazanCodes",
  groupName: "DB Engineers",
},
{
  id: "7",
  courseCode: "23CS3PCDST",
  title: "Data Structures & Algorithms Bootcamp",
  date: "Oct 29",
  time: "11:00 AM - 1:00 PM",
  location: "Reference Section, 2nd Floor PJA Block",
  attendees: 20,
  hostName: "Vikram Singh",
  groupName: "Algo Enthusiasts",
},
{
  id: "8",
  courseCode: "23CS3PCUSP",
  title: "Unix Shell Scripting Practice",
  date: "Oct 30",
  time: "4:00 PM - 6:00 PM",
  location: "CSE-UG LAB2",
  attendees: 7,
  hostName: "Neha Gupta",
  groupName: "Linux Lovers",
},
{
  id: "9",
  courseCode: "23MA3BSSDM",
  title: "Statistics for Computing - CIE Prep",
  date: "Oct 31",
  time: "10:00 AM - 12:00 PM",
  location: "CSE Dept, Room 108",
  attendees: 9,
  hostName: "Talib Khan",
  groupName: "SDM Group",
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
    if (activeFilter === "Exam Prep") return matchesSearch && session.title.toLowerCase().includes("cie")

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
