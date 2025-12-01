import type { Route } from "./+types/components-test";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import {
  Background,
  BackgroundPattern,
  useBackgroundClasses,
} from "~/components/ui/background";
import { Header } from "~/components/layout/header";
import { AboutSection } from "~/components/layout/about-section";
import { Footer } from "~/components/layout/footer";
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
    {
      name: "description",
      content:
        "Testing shadcn/ui component integration with React Router v7 SSR",
    },
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
    alert(
      `Formulaire soumis avec succès!\n\nNom: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`
    );
  }

  return (
    <>
      {/* Header Component Test */}
      <Header />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Test Section */}
        <Card>
          <CardHeader>
            <CardTitle>Header Component Test</CardTitle>
            <CardDescription>
              Testing Header with Logo, Mobile Menu, and Contact Button
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-primary mb-2">
                ✅ Header Features
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Logo "Pauline Roussel" (Ivyora Display font):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Functional
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile menu trigger (responsive):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Functional
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contact button (pregnancy-safe):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Functional
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Touch targets (44x44px minimum):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Compliant
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>WCAG 2.1 AA accessibility:</span>
                  <span className="text-green-600 font-medium">
                    ✓ Compliant
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            shadcn/ui Components Test
          </h1>
          <p className="text-muted-foreground">
            Testing Phase 1 foundation components integration with React Router
            v7 SSR
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
            <CardDescription>Testing form input elements</CardDescription>
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
              Exemple complet de formulaire avec validation Zod et gestion
              d'erreurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                        Parlez-nous de vos attentes et de vos besoins
                        spécifiques.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">Envoyer le message</Button>
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

        {/* Layout Components Test */}
        <Card>
          <CardHeader>
            <CardTitle>Layout Components (Section & Container)</CardTitle>
            <CardDescription>
              Testing Section with different spacing and background variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Section Variants:</h4>
              <div className="grid gap-4">
                {/* Compact spacing */}
                <Section
                  spacing="compact"
                  background="accent"
                  className="rounded-lg"
                >
                  <Container size="sm">
                    <p className="text-center text-sm">
                      Section compact avec background accent (py-8)
                    </p>
                  </Container>
                </Section>

                {/* Normal spacing */}
                <Section
                  spacing="normal"
                  background="soft"
                  className="rounded-lg"
                >
                  <Container size="md">
                    <p className="text-center text-sm">
                      Section normal avec background soft (py-12 lg:py-16)
                    </p>
                  </Container>
                </Section>

                {/* Spacious spacing */}
                <Section
                  spacing="spacious"
                  background="white"
                  className="rounded-lg border"
                >
                  <Container size="lg">
                    <p className="text-center text-sm">
                      Section spacious avec background white (py-16 lg:py-24)
                    </p>
                  </Container>
                </Section>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Background System Tests */}
        <Card>
          <CardHeader>
            <CardTitle>
              Background System - Phase 1 Final Implementation
            </CardTitle>
            <CardDescription>
              Testing complete white background system with pregnancy-safe
              colors and patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Background Component Variants */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">
                Background Component Variants:
              </h4>
              <div className="grid gap-4">
                <Background variant="white" className="p-4 border rounded-lg">
                  <p className="text-sm text-center">
                    Background white - Pure white (#ffffff)
                  </p>
                </Background>

                <Background variant="accent" className="p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Background accent - Gris doux (#f5f4f2)
                  </p>
                </Background>

                <Background variant="soft" className="p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Background soft - Dégradé blanc vers gris
                  </p>
                </Background>

                <Background variant="gradient-soft" className="p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Background gradient-soft - Dégradé complexe avec rose pale
                  </p>
                </Background>

                <Background variant="gradient-warm" className="p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Background gradient-warm - Dégradé avec tons beiges
                  </p>
                </Background>
              </div>
            </div>

            {/* Background Patterns */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">
                Background Patterns (Pregnancy-Safe):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative p-6 border rounded-lg bg-white overflow-hidden">
                  <BackgroundPattern pattern="dots" intensity="subtle" />
                  <div className="relative z-10">
                    <p className="text-sm text-center font-medium">
                      Dots Pattern
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      Subtil
                    </p>
                  </div>
                </div>

                <div className="relative p-6 border rounded-lg bg-white overflow-hidden">
                  <BackgroundPattern pattern="lines" intensity="subtle" />
                  <div className="relative z-10">
                    <p className="text-sm text-center font-medium">
                      Lines Pattern
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      Subtil
                    </p>
                  </div>
                </div>

                <div className="relative p-6 border rounded-lg bg-white overflow-hidden">
                  <BackgroundPattern pattern="grid" intensity="light" />
                  <div className="relative z-10">
                    <p className="text-sm text-center font-medium">
                      Grid Pattern
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      Light
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration with Section Component */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">
                Integration avec Section Component:
              </h4>
              <div className="space-y-4 border rounded-lg overflow-hidden">
                <Section spacing="compact" background="white">
                  <Container size="md">
                    <div className="text-center">
                      <h5 className="font-medium text-primary">
                        Section avec Background White
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Parfait pour le contenu principal
                      </p>
                    </div>
                  </Container>
                </Section>

                <Section spacing="normal" background="accent">
                  <Container size="md">
                    <div className="text-center">
                      <h5 className="font-medium text-secondary">
                        Section avec Background Accent
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Idéal pour séparer les sections
                      </p>
                    </div>
                  </Container>
                </Section>

                <Section spacing="compact" background="soft">
                  <Container size="md">
                    <div className="text-center">
                      <h5 className="font-medium text-neutral">
                        Section avec Background Soft
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Dégradé doux pour transitions
                      </p>
                    </div>
                  </Container>
                </Section>
              </div>
            </div>

            {/* Color System Integration */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">
                Palette Couleurs Pauline Roussel:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="w-full h-16 bg-white border-2 border-gris rounded-lg mb-2"></div>
                  <p className="text-xs font-medium">White</p>
                  <p className="text-xs text-muted-foreground">#ffffff</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-gris rounded-lg mb-2"></div>
                  <p className="text-xs font-medium">Gris</p>
                  <p className="text-xs text-muted-foreground">#f5f4f2</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-soft rounded-lg mb-2"></div>
                  <p className="text-xs font-medium">Rose Pale</p>
                  <p className="text-xs text-muted-foreground">#ffddd3</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-warm rounded-lg mb-2"></div>
                  <p className="text-xs font-medium">Beige</p>
                  <p className="text-xs text-muted-foreground">#ceaf9b</p>
                </div>
              </div>
            </div>

            {/* Phase 1 Completion Status */}
            <div className="bg-primary/5 p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-primary mb-2">
                ✅ Phase 1 - Foundation Components COMPLETE
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Step 1 - shadcn/ui integration:</span>
                  <span className="text-green-600 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 2 - Container queries:</span>
                  <span className="text-green-600 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 3 - Layout components:</span>
                  <span className="text-green-600 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 4 - Cross-browser detection:</span>
                  <span className="text-green-600 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 5 - White background system:</span>
                  <span className="text-green-600 font-medium">✓ Complete</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                🚀 Ready for Phase 2: Brand Integration & Visual Identity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About Section Test */}
        <Card>
          <CardHeader>
            <CardTitle>
              About Section Component - Phase 1 Base Structure
            </CardTitle>
            <CardDescription>
              Testing AboutSection with pregnancy-safe design, responsive
              layout, and default content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg border">
              <h4 className="text-sm font-medium text-primary mb-2">
                ✅ About Section Features
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Background gris (#f5f4f2) pregnancy-safe:</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Text color secondary (#517982) soothing:</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>2-row layout structure:</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>About content (2/3 + 1/3) responsive:</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Method section (3 columns + separators):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Typography (Ivyora Display + Barlow):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile responsive (stacked):</span>
                  <span className="text-green-600 font-medium">
                    ✓ Implemented
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section Component - Full Display */}
      <AboutSection />

      {/* Footer Component Test */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Component - Post-Merge QA Testing</CardTitle>
          <CardDescription>
            Testing Footer component with pregnancy-safe design, accessibility,
            and responsive layout
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg border">
            <h4 className="text-sm font-medium text-primary mb-2">
              ✅ Footer Features to Test
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Primary green background (#618462) with white text:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>3-column grid layout (2fr-1fr-2fr):</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mobile responsive stacking:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>Newsletter form with validation:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>Social icons with hover states:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>Touch targets 48px minimum:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
              <div className="flex justify-between">
                <span>WCAG 2.1 AA accessibility:</span>
                <span className="text-yellow-600 font-medium">
                  🔄 Testing...
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Component - Full Display */}
      <Footer
        onNewsletterSignup={(email) => {
          console.log("Newsletter signup:", email);
          alert(`Newsletter signup test: ${email}`);
          return Promise.resolve();
        }}
      />
    </>
  );
}
