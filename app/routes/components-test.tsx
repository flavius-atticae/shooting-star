import type { Route } from "./+types/components-test";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "shadcn/ui Components Test - Pauline Roussel" },
    { name: "description", content: "Testing shadcn/ui component integration with React Router v7 SSR" },
  ];
}

export default function ComponentsTest() {
  // Form setup with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the data to your server
    console.log(values);
    alert(`Formulaire soumis avec succès!\n\nNom: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`);
  }

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

      {/* Form Component with Validation */}
      <Card>
        <CardHeader>
          <CardTitle>Form Component avec Validation</CardTitle>
          <CardDescription>
            Exemple complet de formulaire avec validation Zod et gestion d'erreurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom complet" {...field} />
                    </FormControl>
                    <FormDescription>
                      Entrez votre nom complet pour la prise de contact.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="votre.email@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Votre adresse email pour vous recontacter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Décrivez vos besoins en yoga prénatal..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Parlez-nous de vos attentes et de vos besoins spécifiques.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit">
                  Envoyer le message
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </Form>
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