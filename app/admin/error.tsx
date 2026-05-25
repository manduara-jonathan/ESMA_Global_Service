"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Admin error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Une erreur est survenue</h2>
        <p className="text-muted-foreground mb-6">
          Nous sommes desoles, une erreur inattendue s&apos;est produite. 
          Veuillez reessayer ou retourner a la page d&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reessayer
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/admin/login"}
          >
            <Home className="mr-2 h-4 w-4" />
            Retour au login
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm font-mono text-gray-700 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
