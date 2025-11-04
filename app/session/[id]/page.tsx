"use client"

import { useParams } from "next/navigation"
import { Calendar, Clock, MapPin, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLayout from "@/components/app-layout"

const mockSession = {
  id: "1",
  courseCode: "22CS3AEFWD",
  title: "Full Stack Web Development",
  date: "Wednesday, October 22nd",
  time: "8:00 am - 10:00 am",
  location: "CSE-UG LAB2",
  description:
    "Join us for an in-depth study of FWD covered in this semester. We'll go through React for frontend, Django for backend, FASTAPI for connecting API, and more. This is a great opportunity to develop web application from front to back. Bring your questions and your laptop!",
  hostName: "Razancodes",
  hostImage: "https://api.dicebear.com/9.x/avataaars/svg?top=frizzle",
  groupName: "Team StudySphere",
  attendees: [
    { name: "Sam Lee", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" },
    { name: "Jordan Chen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
    { name: "Emma Davis", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
    { name: "Marcus Brown", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
    { name: "Sofia Rodriguez", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia" },
  ],
}

export default function SessionDetailPage() {
  const params = useParams()

  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {mockSession.courseCode}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{mockSession.title}</h1>
            </div>

            {/* Hosted by */}
            <Card className="glass-card p-4 mx-0 px-4 py-3.5">
              <p className="text-sm text-muted-foreground mb-3">Hosted by</p>
              <div className="flex items-center gap-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mockSession.hostImage || "/placeholder.svg"} />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{mockSession.hostName}</p>
                  <p className="text-sm text-muted-foreground">From the '{mockSession.groupName}' group</p>
                </div>
              </div>
            </Card>

            {/* Session Details */}
            <Card className="glass-card p-6 leading-3">
              <h3 className="font-semibold mb-4">Session Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <span>{mockSession.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <span>{mockSession.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <span>{mockSession.location}</span>
                </div>
              </div>
            </Card>

            {/* What We'll Cover */}
            <div>
              <h3 className="font-semibold mb-3">What We'll Cover</h3>
              <p className="text-muted-foreground leading-relaxed">{mockSession.description}</p>
            </div>
          </div>

          {/* Right Column - Action Hub */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-lg sticky top-8 space-y-4">
              <Button size="lg" className="w-full gap-2">
                <Check size={20} />
                RSVP - I'm Attending
              </Button>

              {/* Who's Going */}
              <div>
                <p className="text-sm font-semibold mb-3">Who's Going ({mockSession.attendees.length})</p>
                <div className="flex -space-x-2">
                  {mockSession.attendees.map((attendee, idx) => (
                    <Avatar key={idx} className="h-10 w-10 border-2 border-card">
                      <AvatarImage src={attendee.image || "/placeholder.svg"} />
                      <AvatarFallback>{attendee.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center py-2">
                Join {mockSession.attendees.length} other students attending this session
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
