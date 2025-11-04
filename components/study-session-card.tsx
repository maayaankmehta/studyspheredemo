"use client"

import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getGroupBadgeColor } from "@/lib/badge-colors"

interface StudySessionCardProps {
  session: {
    id: string
    courseCode: string
    title: string
    date: string
    time: string
    location: string
    attendees: number
    hostName: string
    groupName: string
  }
  compact?: boolean
}

export default function StudySessionCard({ session, compact = false }: StudySessionCardProps) {
  const badgeColor = getGroupBadgeColor(session.groupName)

  return (
    <Link href={`/session/${session.id}`}>
      <Card className="glass p-5 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg h-full border border-border leading-5 my-2.5 py-5 px-5 mx-0">
        <div className="space-y-4">
          <div>
            <Badge className={`mb-3 text-xs font-medium ${badgeColor}`}>{session.courseCode}</Badge>
            <h3 className="font-semibold text-base leading-snug">{session.title}</h3>
          </div>

          <div className="space-y-2.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Calendar size={16} className="flex-shrink-0" />
              <span>
                {session.date} @ {session.time.split(" - ")[0]}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="truncate">{session.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium">{session.attendees} going</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs font-medium h-8 px-3"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
