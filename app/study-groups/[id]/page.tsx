"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Users, LinkIcon, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AppLayout from "@/components/app-layout"
import { ForumPost } from "@/components/forum-post"
import { CreateForumPostDialog } from "@/components/create-forum-post-dialog"

const mockGroups: Record<string, any> = {
  "1": {
    id: "1",
    name: "Advanced Full Stack Development",
    subject: "CS201",
    description: "Deep dive into algorithm design, complexity analysis, and advanced data structures.",
    fullDescription:
      "Welcome to the Advanced Algorithms Masters study group! This is a dedicated space for students passionate about mastering algorithm design and complexity analysis. We cover topics including sorting algorithms, dynamic programming, graph algorithms, and more. Whether you're preparing for technical interviews or just want to deepen your algorithmic knowledge, this group is for you.",
    createdBy: "Mayank Mehta",
    createdByImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    members: 24,
    chatLink: "https://discord.gg/algorithms",
    memberList: [
      { name: "Razan  ", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" },
      { name: "Muzammil", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
      { name: "Talib Khan", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
      { name: "Nawaal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
      { name: "Jay", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia" },
    ],
    sessions: [
      { id: "1", name: "Dynamic Programming Basics" },
      { id: "2", name: "Graph Theory Deep Dive" },
      { id: "3", name: "Interview Prep Session" },
    ],
    posts: [
      {
        id: "1",
        author: "Muzammil Zahoor",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        content:
          "Just Pushed to main branch it.",
        sessionTag: "Front end basics",
        upvotes: 12,
        downvotes: 0,
        createdAt: "2 hours ago",
        replies: 3,
      },
      {
        id: "2",
        author: "Talib Khan",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        content:
          "Enjoyed todays session. Can i get the notes for today?",
        sessionTag: "Backend boys",
        upvotes: 8,
        downvotes: 0,
        createdAt: "4 hours ago",
        replies: 5,
      },
    ],
  },
}

export default function StudyGroupDetailPage() {
  const params = useParams()
  const groupId = params.id as string
  const group = mockGroups[groupId]
  const [posts, setPosts] = useState(group?.posts || [])

  if (!group) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Study group not found</h1>
        </div>
      </AppLayout>
    )
  }

  const handlePostCreate = (newPost: any) => {
    setPosts([newPost, ...posts])
  }

  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {group.subject}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{group.name}</h1>
              <p className="text-muted-foreground">{group.description}</p>
            </div>

            {/* Created by */}
            <Card className="glass-card p-4 mx-0 px-4 py-3.5">
              <p className="text-sm text-muted-foreground mb-3">Created by</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={group.createdByImage || "/placeholder.svg"} />
                  <AvatarFallback>{group.createdBy.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{group.createdBy}</p>
                  <p className="text-sm text-muted-foreground">Group Founder</p>
                </div>
              </div>
            </Card>

            {/* About the Group */}
            <Card className="glass-card p-6 leading-3">
              <h3 className="font-semibold mb-4">About This Group</h3>
              <p className="text-muted-foreground leading-relaxed">{group.fullDescription}</p>
            </Card>

            {/* Group Stats */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-primary" />
                <h3 className="font-semibold">Group Statistics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{group.members}</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Study Focus</p>
                  <p className="text-lg font-bold">{group.subject}</p>
                </div>
              </div>
            </Card>

            {/* Forum Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Group Forum</h3>
                <CreateForumPostDialog
                  groupName={group.name}
                  sessions={group.sessions}
                  onPostCreate={handlePostCreate}
                />
              </div>

              <div className="space-y-3">
                {posts.length === 0 ? (
                  <Card className="glass-card p-8 text-center border border-border/50">
                    <p className="text-muted-foreground">No posts yet. Be the first to start a discussion!</p>
                  </Card>
                ) : (
                  posts.map((post: any) => <ForumPost key={post.id} {...post} />)

                )}
              </div>
            </div>
          </div>

          {/* Right Column - Action Hub */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-lg sticky top-8 space-y-4">
              <Button size="lg" className="w-full gap-2">
                <CheckCircle size={18} />
                Join Group
              </Button>

              {group.chatLink && (
                <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent" asChild>
                  <a href={group.chatLink} target="_blank" rel="noopener noreferrer">
                    <LinkIcon size={18} />
                    Open Chat
                  </a>
                </Button>
              )}

              {/* Members */}
              <div>
                <p className="text-sm font-semibold mb-3">Members ({group.memberList.length})</p>
                <div className="flex -space-x-2 mb-3">
                  {group.memberList.map((member: any, idx: number) => (
                    <Avatar key={idx} className="h-10 w-10 border-2 border-card">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center py-2">
                Join {group.members} students in this study group
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
