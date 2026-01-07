"use client"

import { useEffect } from "react"

export function useScrollAnimation() {
  useEffect(() => {
    const checkElements = () => {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate",
      )

      if (elements.length === 0) return elements

      elements.forEach((element) => {
        // If already active, skip
        if (element.classList.contains("active")) return

        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 1.1 // 10% tolerance margin

        if (isVisible) {
          element.classList.add("active")
        }
      })

      return elements
    }

    const initObserver = () => {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate",
      )

      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active")
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        },
      )

      elements.forEach((element) => {
        observer.observe(element)
      })

      return observer
    }

    // 1. Run immediately
    checkElements()

    // 2. Initialize observer
    const observer = initObserver()

    // 3. Run delayed check to catch layout shifts
    const timeoutId = setTimeout(checkElements, 100)

    // 4. Safety net: Force visible if still hidden after 2 seconds
    const safetyTimeoutId = setTimeout(() => {
      const remaining = document.querySelectorAll(
        ".reveal-on-scroll:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active), .reveal-rotate:not(.active)"
      )
      remaining.forEach(el => el.classList.add("active"))
    }, 2000)

    const handleResize = () => {
      checkElements()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", checkElements, { passive: true }) // Passive listener for backup

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(safetyTimeoutId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", checkElements)
      if (observer) observer.disconnect()
    }
  }, [])
}

