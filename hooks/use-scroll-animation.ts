"use client"

import { useEffect } from "react"

export function useScrollAnimation() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate",
      )

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active")
            } else {
              // Optional: remove the class when element is not in view
              // entry.target.classList.remove('active')
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        },
      )

      elements.forEach((element) => {
        observer.observe(element)
      })

      return () => {
        elements.forEach((element) => {
          observer.unobserve(element)
        })
      }
    }

    animateElements()

    // Re-run if DOM changes
    window.addEventListener("resize", animateElements)
    return () => {
      window.removeEventListener("resize", animateElements)
    }
  }, [])
}

