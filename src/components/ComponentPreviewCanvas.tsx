import React from 'react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Icons
import { Rocket, Terminal, AlertTriangle } from 'lucide-react';

interface ComponentPreviewCanvasProps {
  style?: React.CSSProperties;
}

const ComponentPreviewCanvas: React.FC<ComponentPreviewCanvasProps> = ({ style }) => {
  console.log('ComponentPreviewCanvas loaded');

  // State for interactive components to make the preview feel more dynamic
  const [progress, setProgress] = React.useState(33);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="p-4 sm:p-6 md:p-8 bg-background text-foreground overflow-y-auto h-full" style={style}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Card for Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button>
              <Rocket className="mr-2 h-4 w-4" /> Icon
            </Button>
          </CardContent>
        </Card>

        {/* Card for Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Informational messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Card for Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Inputs, checkboxes, and switches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="email" placeholder="Email" />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </CardContent>
        </Card>

        {/* Card for Badges & Progress */}
        <Card>
            <CardHeader>
                <CardTitle>Indicators</CardTitle>
                <CardDescription>Badges and progress bars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                </div>
                <Progress value={progress} className="w-full" />
            </CardContent>
        </Card>

        {/* Card for Tabs */}
        <Card>
            <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Content organization</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-4">
                        <p>Make changes to your account here. Click save when you're done.</p>
                    </TabsContent>
                    <TabsContent value="password" className="pt-4">
                       <p>Change your password here. After saving, you'll be logged out.</p>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

        {/* Example Standalone Card */}
        <Card>
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>A card is a great way to group content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the content area of the card. It can contain any elements you need to display.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComponentPreviewCanvas;