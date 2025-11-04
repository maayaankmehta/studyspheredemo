"use client"
import { Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLayout from "@/components/app-layout"

const badgeDefinitions = {
  Initiator: { color: "bg-yellow-500/20", textColor: "text-yellow-600" },
  "Weekend Warrior": { color: "bg-red-500/20", textColor: "text-red-600" },
  "Knowledge Seeker": { color: "bg-blue-500/20", textColor: "text-blue-600" },
  "Team Player": { color: "bg-green-500/20", textColor: "text-green-600" },
  "Rising Star": { color: "bg-purple-500/20", textColor: "text-purple-600" },
  "Study Buddy": { color: "bg-cyan-500/20", textColor: "text-cyan-600" },
}

const leaderboardData = {
  thisWeek: [
    {
      rank: 1,
      name: "Muhammed Razan",
      xp: 1250,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry",
      badge: "Rising Star",
    },
    {
      rank: 2,
      name: "Jensen Huang",
      xp: 1120,
      image: "https://api.dicebear.com/9.x/avataaars/svg?top=frizzle",
      badge: "Knowledge Seeker",
    },
    {
      rank: 3,
      name: "Steve Jobs",
      xp: 980,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Punjab",
      badge: "Team Player",
    },
    {
      rank: 4,
      name: "Mayank Mehta",
      xp: 890,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Human",
      badge: "Study Buddy",
    },
    {
      rank: 5,
      name: "Muzammil Zahoor",
      xp: 750,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rashford",
      badge: "Initiator",
    },
    {
      rank: 6,
      name: "Talib Khan",
      xp: 620,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=james",
      badge: "Weekend Warrior",
    },
    {
      rank: 7,
      name: "Nawaalur",
      xp: 540,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry",
      badge: "Knowledge Seeker",
    },
    {
      rank: 8,
      name: "Mayank Verma",
      xp: 480,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=yourSeed&facialHair=beardMedium,beardLight&top=shortHair01,shortHair02",
      badge: "Team Player",
    },
  ],
  allTime: [
    {
      rank: 1,
      name: "Muhammed Razan",
      xp: 4200,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry",
      badge: "Rising Star",
    },
    {
      rank: 2,
      name: "Mayank Mehta",
      xp: 3850,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Human",
      badge: "Knowledge Seeker",
    },
    {
      rank: 3,
      name: "Muzammil Zahoor",
      xp: 3650,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      badge: "Study Buddy",
    },
    {
      rank: 4,
      name: "Talib Khan",
      xp: 3420,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      badge: "Team Player",
    },
    {
      rank: 5,
      name: "Nawalur",
      xp: 3200,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry",
      badge: "Initiator",
    },
    {
      rank: 6,
      name: "Mayank Jain",
      xp: 2950,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      badge: "Weekend Warrior",
    },
    {
      rank: 7,
      name: "Steve Jobs",
      xp: 2840,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Punjab",
      badge: "Rising Star",
    },
    {
      rank: 8,
      name: "Jensen Huang",
      xp: 2650,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
      badge: "Knowledge Seeker",
    },
  ],
}

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy size={20} className="text-yellow-500" />
  if (rank === 2) return <Trophy size={20} className="text-gray-400" />
  if (rank === 3) return <Trophy size={20} className="text-orange-600" />
  return null
}

function LeaderboardRow({ item }: { item: (typeof leaderboardData.thisWeek)[0] }) {
  const badge = badgeDefinitions[item.badge as keyof typeof badgeDefinitions]

  return (
    <Card className="glass-card p-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-8 flex justify-center">
            {[1, 2, 3].includes(item.rank) ? (
              <MedalIcon rank={item.rank} />
            ) : (
              <span className="font-bold text-lg text-muted-foreground">#{item.rank}</span>
            )}
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.image || "/placeholder.svg"} />
            <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <span className="font-semibold">{item.name}</span>
            <div className="mt-1">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.color} ${badge.textColor}`}>
                {item.badge}
              </span>
            </div>
          </div>
        </div>
        <span className="font-bold text-lg text-primary">{item.xp.toLocaleString()} XP</span>
      </div>
    </Card>
  )
}

export default function LeaderboardPage() {
  return (
    <AppLayout>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Student Leaderboard</h1>

        <Tabs defaultValue="thisWeek" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            <TabsTrigger value="allTime">All-Time</TabsTrigger>
          </TabsList>

          <TabsContent value="thisWeek" className="space-y-3">
            {leaderboardData.thisWeek.map((item) => (
              <LeaderboardRow key={item.rank} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="allTime" className="space-y-3">
            {leaderboardData.allTime.map((item) => (
              <LeaderboardRow key={item.rank} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
