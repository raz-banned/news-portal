import { useEffect, useRef, useState } from "react"

export function useElementOnScreen<T extends HTMLElement>(
  options: IntersectionObserverInit
) {
  const containerRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const currentTarget = containerRef.current
    if (!currentTarget) return

    const observer = new IntersectionObserver(callback, options)
    observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [options])

  return [containerRef, isVisible] as const
}
