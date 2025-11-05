"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/app-layout"
import { CheckCircle, XCircle, BarChart3, Users, BookOpen } from "lucide-react"

interface GroupRequest {
  id: string
  groupName: string
  creator: string
  description: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

interface GroupStats {
  totalGroups: number
  approvedGroups: number
  rejectedGroups: number
  totalSessions: number
  activeSessions: number
}

const mockRequests: GroupRequest[] = [
  {
    id: "1",
    groupName: "Advanced Algorithms Club",
    creator: "Sarah Chen",
    description: "For students interested in competitive programming and advanced data structures",
    createdAt: "2025-11-04",
    status: "pending",
  },
  {
    id: "2",
    groupName: "Physics Study Circle",
    creator: "James Wilson",
    description: "Collaborative study group for physics fundamentals",
    createdAt: "2025-11-03",
    status: "pending",
  },
  {
    id: "3",
    groupName: "Machine Learning Enthusiasts",
    creator: "Emma Davis",
    description: "Study group focused on ML algorithms and applications",
    createdAt: "2025-11-02",
    status: "approved",
  },
  {
    id: "4",
    groupName: "Web Dev Bootcamp",
    creator: "Alex Johnson",
    description: "Learning modern web development techniques",
    createdAt: "2025-11-01",
    status: "rejected",
  },
]

const mockStats: GroupStats = {
  totalGroups: 24,
  approvedGroups: 20,
  rejectedGroups: 4,
  totalSessions: 156,
  activeSessions: 42,
}

export default function AdminPage() {
  const [requests, setRequests] = useState<GroupRequest[]>(mockRequests)

  const handleApprove = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

  const RequestCard = ({ request, showActions }: { request: GroupRequest; showActions: boolean }) => (
    <Card className="glass-card p-6 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{request.groupName}</h3>
          <p className="text-sm text-muted-foreground mb-2">Created by: {request.creator}</p>
          <p className="text-sm mb-3">{request.description}</p>
          <p className="text-xs text-muted-foreground">{request.createdAt}</p>
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="default" className="gap-1" onClick={() => handleApprove(request.id)}>
              <CheckCircle size={16} />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 bg-transparent"
              onClick={() => handleReject(request.id)}
            >
              <XCircle size={16} />
              Reject
            </Button>
          </div>
        )}
        {!showActions && (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              request.status === "approved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {request.status === "approved" ? "Approved" : "Rejected"}
          </div>
        )}
      </div>
    </Card>
  )

  return (
    <AppLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage study group requests and view platform statistics</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Groups</p>
                <p className="text-2xl font-bold">{mockStats.totalGroups}</p>
              </div>
              <BookOpen size={32} className="text-primary/50" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-400">{mockStats.approvedGroups}</p>
              </div>
              <CheckCircle size={32} className="text-green-400/50" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{mockStats.rejectedGroups}</p>
              </div>
              <XCircle size={32} className="text-red-400/50" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-2xl font-bold">{mockStats.totalSessions}</p>
              </div>
              <BarChart3 size={32} className="text-blue-400/50" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
                <p className="text-2xl font-bold text-cyan-400">{mockStats.activeSessions}</p>
              </div>
              <Users size={32} className="text-cyan-400/50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <Card className="glass-card p-8 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            ) : (
              <div>
                {pendingRequests.map((req) => (
                  <RequestCard key={req.id} request={req} showActions={true} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Approved Requests */}
          <TabsContent value="approved">
            {approvedRequests.length === 0 ? (
              <Card className="glass-card p-8 text-center">
                <p className="text-muted-foreground">No approved groups yet</p>
              </Card>
            ) : (
              <div>
                {approvedRequests.map((req) => (
                  <RequestCard key={req.id} request={req} showActions={false} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Rejected Requests */}
          <TabsContent value="rejected">
            {rejectedRequests.length === 0 ? (
              <Card className="glass-card p-8 text-center">
                <p className="text-muted-foreground">No rejected groups</p>
              </Card>
            ) : (
              <div>
                {rejectedRequests.map((req) => (
                  <RequestCard key={req.id} request={req} showActions={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
