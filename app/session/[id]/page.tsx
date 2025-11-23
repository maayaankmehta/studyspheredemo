"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Check, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLayout from "@/components/app-layout"
import { sessionsAPI } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const sessionId = params.id as string

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRSVPing, setIsRSVPing] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true)
        const data = await sessionsAPI.getById(sessionId)
        setSession(data)
        setError(null)
      } catch (err: any) {
        console.error("Failed to fetch session:", err)
        setError("Session not found")
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  const handleRSVP = async () => {
    try {
      setIsRSVPing(true)
      await sessionsAPI.rsvp(sessionId)
      // Refresh session data
      const updatedSession = await sessionsAPI.getById(sessionId)
      setSession(updatedSession)
    } catch (err: any) {
      console.error("Failed to RSVP:", err)
      alert(err.response?.data?.detail || "Failed to RSVP")
    } finally {
      setIsRSVPing(false)
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading session...</p>
        </div>
      </AppLayout>
    )
  }

  if (error || !session) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Session not found</h1>
          <Link href="/discover">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Discover
            </Button>
          </Link>
        </div>
      </AppLayout>
    )
  }

  const isAttending = session.is_attending

  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="mb-6">
          <Link href="/discover">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft size={18} />
              Back to Discover
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">
                {session.course_code}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{session.title}</h1>
            </div>

            {/* Hosted by */}
            <Card className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-3">Hosted by</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.host_image} />
                  <AvatarFallback>{session.host_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{session.host_name}</p>
                  <p className="text-sm text-muted-foreground">Session Host</p>
                </div>
              </div>
            </Card>

            {/* Session Details */}
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Session Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <span>{session.location}</span>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">About This Session</h3>
              <p className="text-muted-foreground leading-relaxed">{session.description}</p>
            </Card>
          </div>

          {/* Right Column - Action Hub */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-lg sticky top-8 space-y-4">
              {isAttending ? (
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Check size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">You're attending!</p>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleRSVP}
                  disabled={isRSVPing}
                >
                  <Check size={18} />
                  {isRSVPing ? "RSVPing..." : "RSVP to Session"}
                </Button>
              )}

              {/* Attendees */}
              <div>
                <p className="text-sm font-semibold mb-3">
                  Attendees ({session.attendees_count || 0})
                </p>
                {session.attendees_list && session.attendees_list.length > 0 ? (
                  <div className="flex -space-x-2 mb-3">
                    {session.attendees_list.slice(0, 5).map((attendee: any, idx: number) => (
                      <Avatar key={idx} className="h-10 w-10 border-2 border-card">
                        <AvatarImage src={attendee.image} />
                        <AvatarFallback>{attendee.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                    {session.attendees_list.length > 5 && (
                      <div className="h-10 w-10 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-semibold">
                        +{session.attendees_list.length - 5}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No attendees yet</p>
                )}
              </div>

              {session.group_name && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Part of</p>
                  <Link href={`/study-groups/${session.group}`}>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors">
                      {session.group_name}
                    </Badge>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
