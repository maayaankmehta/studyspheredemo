"use client"
import { CalendarPlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import StudySessionCard from "@/components/study-session-card"
import AppLayout from "@/components/app-layout"

const mockUpcomingSessions = [
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
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl leading-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Upcoming Sessions</h1>
          <p className="text-muted-foreground text-sm mt-1">Your study schedule for the week ahead</p>
        </div>

        {mockUpcomingSessions.length > 0 ? (
          <div className="space-y-59">
            {mockUpcomingSessions.map((session) => (
              <StudySessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-lg p-12 border border-border">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <CalendarPlus size={48} className="text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your calendar is empty</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
              Find your next study session and level up your learning.
            </p>
            <Button className="gap-2" asChild>
              <a href="/discover">
                <Search size={18} />
                Discover Sessions
              </a>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
