"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Palette,
  Type,
  Image,
  Save,
  RefreshCcw,
  Eye,
  Check,
  AlertCircle,
} from "lucide-react"

interface SiteSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
    dark: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  branding: {
    siteName: string
    tagline: string
    logoUrl: string
  }
  hero: {
    title: string
    subtitle: string
    buttonText: string
    backgroundImage: string
  }
}

const defaultSettings: SiteSettings = {
  colors: {
    primary: "#023020",
    secondary: "#D4A373",
    accent: "#D4A373",
    dark: "#023020",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
  },
  branding: {
    siteName: "MK GLOBAL SERVICE",
    tagline: "Votre partenaire de confiance",
    logoUrl: "/logo.png",
  },
  hero: {
    title: "Vos services professionnels a portee de main",
    subtitle: "Voyages, finance, entretien et restauration - tout en un seul endroit",
    buttonText: "Decouvrir nos services",
    backgroundImage: "/images/hero.jpg",
  },
}

export default function SiteControlPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState("colors")
  const [saved, setSaved] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Load saved settings from localStorage (in real app, this would be from API/database)
    const saved = localStorage.getItem("siteSettings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {
        // Use defaults
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirm("Reinitialiser toutes les modifications ?")) {
      setSettings(defaultSettings)
    }
  }

  const updateColor = (key: keyof SiteSettings["colors"], value: string) => {
    setSettings({
      ...settings,
      colors: { ...settings.colors, [key]: value },
    })
  }

  const updateTypography = (key: keyof SiteSettings["typography"], value: string) => {
    setSettings({
      ...settings,
      typography: { ...settings.typography, [key]: value },
    })
  }

  const updateBranding = (key: keyof SiteSettings["branding"], value: string) => {
    setSettings({
      ...settings,
      branding: { ...settings.branding, [key]: value },
    })
  }

  const updateHero = (key: keyof SiteSettings["hero"], value: string) => {
    setSettings({
      ...settings,
      hero: { ...settings.hero, [key]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Controle du site</h1>
          <p className="text-muted-foreground mt-1">
            Personnalisez l'apparence et le contenu du site
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Editer" : "Apercu"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reinitialiser
          </Button>
          <Button onClick={handleSave} className="bg-primary">
            {saved ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Sauvegarde!
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Apercu des modifications</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Preview Hero Section */}
            <div
              className="relative p-8 rounded-lg mb-6"
              style={{ backgroundColor: settings.colors.dark }}
            >
              <div className="relative z-10">
                <h1
                  className="text-3xl font-bold mb-4"
                  style={{ color: "#ffffff" }}
                >
                  {settings.hero.title}
                </h1>
                <p className="text-white/80 mb-6">{settings.hero.subtitle}</p>
                <Button
                  style={{
                    backgroundColor: settings.colors.secondary,
                    color: "#ffffff",
                  }}
                >
                  {settings.hero.buttonText}
                </Button>
              </div>
            </div>

            {/* Preview Colors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(settings.colors).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-sm font-medium capitalize">{name}</p>
                  <p className="text-xs text-muted-foreground">{color}</p>
                </div>
              ))}
            </div>

            {/* Preview Branding */}
            <div className="p-4 border rounded-lg">
              <h2
                className="text-2xl font-bold"
                style={{ color: settings.colors.primary }}
              >
                {settings.branding.siteName}
              </h2>
              <p className="text-muted-foreground">{settings.branding.tagline}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 mr-2" />
              Couleurs
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="h-4 w-4 mr-2" />
              Typographie
            </TabsTrigger>
            <TabsTrigger value="branding">
              <Image className="h-4 w-4 mr-2" />
              Identite
            </TabsTrigger>
            <TabsTrigger value="content">
              <AlertCircle className="h-4 w-4 mr-2" />
              Contenu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Palette de couleurs</CardTitle>
                <CardDescription>
                  Modifiez les couleurs principales du site
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary">Couleur primaire</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="primary"
                      value={settings.colors.primary}
                      onChange={(e) => updateColor("primary", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.primary}
                      onChange={(e) => updateColor("primary", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary">Couleur secondaire</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="secondary"
                      value={settings.colors.secondary}
                      onChange={(e) => updateColor("secondary", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.secondary}
                      onChange={(e) => updateColor("secondary", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent">Couleur accent</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="accent"
                      value={settings.colors.accent}
                      onChange={(e) => updateColor("accent", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.accent}
                      onChange={(e) => updateColor("accent", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dark">Couleur sombre</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="dark"
                      value={settings.colors.dark}
                      onChange={(e) => updateColor("dark", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.dark}
                      onChange={(e) => updateColor("dark", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Typographie</CardTitle>
                <CardDescription>Personnalisez les polices du site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headingFont">Police des titres</Label>
                  <Input
                    id="headingFont"
                    value={settings.typography.headingFont}
                    onChange={(e) => updateTypography("headingFont", e.target.value)}
                    placeholder="Inter, Roboto, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Police du contenu</Label>
                  <Input
                    id="bodyFont"
                    value={settings.typography.bodyFont}
                    onChange={(e) => updateTypography("bodyFont", e.target.value)}
                    placeholder="Inter, Roboto, etc."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identite de marque</CardTitle>
                <CardDescription>
                  Configurez le nom et les elements visuels principaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.branding.siteName}
                    onChange={(e) => updateBranding("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Slogan</Label>
                  <Input
                    id="tagline"
                    value={settings.branding.tagline}
                    onChange={(e) => updateBranding("tagline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL du logo</Label>
                  <Input
                    id="logoUrl"
                    value={settings.branding.logoUrl}
                    onChange={(e) => updateBranding("logoUrl", e.target.value)}
                    placeholder="/logo.png"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contenu de la page d'accueil</CardTitle>
                <CardDescription>
                  Modifiez le texte principal du hero
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Titre principal</Label>
                  <Input
                    id="heroTitle"
                    value={settings.hero.title}
                    onChange={(e) => updateHero("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Sous-titre</Label>
                  <Input
                    id="heroSubtitle"
                    value={settings.hero.subtitle}
                    onChange={(e) => updateHero("subtitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroButton">Texte du bouton</Label>
                  <Input
                    id="heroButton"
                    value={settings.hero.buttonText}
                    onChange={(e) => updateHero("buttonText", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroBg">Image de fond</Label>
                  <Input
                    id="heroBg"
                    value={settings.hero.backgroundImage}
                    onChange={(e) => updateHero("backgroundImage", e.target.value)}
                    placeholder="/images/hero.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
