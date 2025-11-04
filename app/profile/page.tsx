"use client"
import { BookOpen, Target, Users, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/app-layout"

const userProfile = {
  name: "Alex Johnson",
  level: "Level 4: Senior",
  currentXP: 1250,
  nextLevelXP: 2000,
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
}

const badges = [
  { name: "Initiator", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-500/20" },
  { name: "Weekend Warrior", icon: Target, color: "text-red-500", bgColor: "bg-red-500/20" },
  { name: "Knowledge Seeker", icon: BookOpen, color: "text-blue-500", bgColor: "bg-blue-500/20" },
  { name: "Team Player", icon: Users, color: "text-green-500", bgColor: "bg-green-500/20" },
  { name: "Rising Star", icon: Zap, color: "text-purple-500", bgColor: "bg-purple-500/20" },
  { name: "Study Buddy", icon: BookOpen, color: "text-cyan-500", bgColor: "bg-cyan-500/20" },
]

const groups = [
  { name: "M3 Masters", membersCount: 24 },
  { name: "Code Ninjas", membersCount: 31 },
  { name: "Math Wizards", membersCount: 18 },
  { name: "Science Squad", membersCount: 42 },
]

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-3xl">
        {/* Header Card */}
        <Card className="glass-card p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.image || "/placeholder.svg"} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-lg text-muted-foreground">{userProfile.level}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="font-semibold">
                {userProfile.currentXP} / {userProfile.nextLevelXP} XP to next level
              </span>
            </div>
            <Progress value={(userProfile.currentXP / userProfile.nextLevelXP) * 100} className="h-3" />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="groups">My Groups</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {badges.map((badge, idx) => {
                const Icon = badge.icon
                return (
                  <Card key={idx} className="glass-card p-6 text-center">
                    <div className={`p-4 rounded-full ${badge.bgColor} mb-3 inline-block`}>
                      <Icon size={32} className={badge.color} />
                    </div>
                    <p className="font-semibold">{badge.name}</p>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups">
            <div className="space-y-3">
              {groups.map((group, idx) => (
                <Card key={idx} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.membersCount} members</p>
                    </div>
                    <span className="text-primary font-semibold">{group.membersCount}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
