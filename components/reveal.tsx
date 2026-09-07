"use client"

/**
 * Reveal : révèle son contenu avec une animation "fade-in-up" quand il
 * entre dans le viewport. S'appuie sur un IntersectionObserver partagé
 * pour rester performant même avec de nombreuses instances.
 *
 * Reveal: animates its content with a "fade-in-up" effect when it enters
 * the viewport. Uses a single shared IntersectionObserver for performance.
 */

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// Observateur unique partagé par toutes les instances (déduplication du listener).
let sharedObserver: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, () => void>()

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target)
            if (cb) cb()
            sharedObserver?.unobserve(entry.target)
            callbacks.delete(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
  }
  return sharedObserver
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Délai d'apparition en ms (pour effets décalés / staggered). */
  delay?: number
  /** Élément HTML rendu (div par défaut). */
  as?: ElementType
}

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => {
      el.style.transitionDelay = delay ? `${delay}ms` : ""
      el.classList.add("is-visible")
    }

    const observer = getObserver()
    if (!observer) {
      // Pas d'IO disponible : on affiche directement.
      reveal()
      return
    }

    callbacks.set(el, reveal)
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      callbacks.delete(el)
    }
  }, [delay])

  return (
    <Tag ref={ref} className={cn("reveal", className)}>
      {children}
    </Tag>
  )
}
