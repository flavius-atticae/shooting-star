import type { Route } from "./+types/components-test";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "shadcn/ui Components Test - Pauline Roussel" },
    { name: "description", content: "Testing shadcn/ui component integration with React Router v7 SSR" },
  ];
}

export default function ComponentsTest() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          shadcn/ui Components Test
        </h1>
        <p className="text-muted-foreground">
          Testing Phase 1 foundation components integration with React Router v7 SSR
        </p>
      </div>

      {/* Button Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
          <CardDescription>
            Testing different button variants and sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Input and Label Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Input & Label Components</CardTitle>
          <CardDescription>
            Testing form input elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Enter your name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input 
              type="text" 
              id="message" 
              placeholder="Enter a message" 
              className="min-h-[100px]" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Card Nesting Test */}
      <Card>
        <CardHeader>
          <CardTitle>Nested Card Test</CardTitle>
          <CardDescription>
            Testing card composition and nesting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yoga Prénatal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accompagnement pendant la grossesse
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Doula</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Soutien lors de l'accouchement
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Postnatal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Récupération après la naissance
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* SSR Test Info */}
      <Card>
        <CardHeader>
          <CardTitle>SSR Compatibility Status</CardTitle>
          <CardDescription>
            This page renders on the server and hydrates on the client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>React Router v7:</span>
              <span className="text-green-600 font-medium">✓ Compatible</span>
            </div>
            <div className="flex justify-between">
              <span>TailwindCSS v4.1.4:</span>
              <span className="text-green-600 font-medium">✓ Compatible</span>
            </div>
            <div className="flex justify-between">
              <span>shadcn/ui Components:</span>
              <span className="text-green-600 font-medium">✓ Compatible</span>
            </div>
            <div className="flex justify-between">
              <span>TypeScript:</span>
              <span className="text-green-600 font-medium">✓ Compatible</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}