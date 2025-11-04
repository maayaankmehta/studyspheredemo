"use client"
import { CalendarPlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import StudySessionCard from "@/components/study-session-card"
import AppLayout from "@/components/app-layout"

const mockUpcomingSessions = [
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
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl leading-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Upcoming Study Sessions</h1>
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
