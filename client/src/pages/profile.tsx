import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "../components/avatar"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

export default function ProfilePage() {
  return (
    <div className="w-full space-y-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Edit your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-24 w-24">
              <AvatarImage alt="User profile" src="/placeholder.svg?height=100&width=100" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-xs">
              <Button variant="outline">Change Picture</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input id="weight" placeholder="Enter your weight" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" placeholder="Enter your height" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <Textarea className="min-h-[100px]" id="goals" placeholder="Enter your goals" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change your password or delete your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" placeholder="Enter your new password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" placeholder="Confirm your new password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Change Password</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-lg">
        <CardContent>
          <Button className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white" variant="outline">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

