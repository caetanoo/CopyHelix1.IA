import * as React from "react"

// Enhanced mobile breakpoints for Brazilian market
const BREAKPOINTS = {
  MOBILE_SMALL: 320,   // Older/budget Android devices
  MOBILE_MEDIUM: 375,  // iPhone SE, smaller screens
  MOBILE_LARGE: 414,   // Most common mobile size in Brazil
  TABLET_SMALL: 768,   // Small tablets/large phones
  TABLET_LARGE: 1024,  // Full tablets
} as const

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.TABLET_SMALL - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.TABLET_SMALL)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.TABLET_SMALL)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Enhanced mobile detection hooks for specific scenarios
export function useIsMobileSmall() {
  const [isMobileSmall, setIsMobileSmall] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE_MEDIUM - 1}px)`)
    const onChange = () => {
      setIsMobileSmall(window.innerWidth < BREAKPOINTS.MOBILE_MEDIUM)
    }
    mql.addEventListener("change", onChange)
    setIsMobileSmall(window.innerWidth < BREAKPOINTS.MOBILE_MEDIUM)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobileSmall
}

export function useViewportSize() {
  const [viewportSize, setViewportSize] = React.useState<{
    width: number | undefined;
    height: number | undefined;
    category: 'mobile-small' | 'mobile-medium' | 'mobile-large' | 'tablet-small' | 'tablet-large' | 'desktop' | undefined;
  }>({
    width: undefined,
    height: undefined,
    category: undefined
  })

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      let category: typeof viewportSize.category
      if (width < BREAKPOINTS.MOBILE_SMALL) {
        category = 'mobile-small'
      } else if (width < BREAKPOINTS.MOBILE_MEDIUM) {
        category = 'mobile-medium'  
      } else if (width < BREAKPOINTS.MOBILE_LARGE) {
        category = 'mobile-large'
      } else if (width < BREAKPOINTS.TABLET_SMALL) {
        category = 'tablet-small'
      } else if (width < BREAKPOINTS.TABLET_LARGE) {
        category = 'tablet-large'
      } else {
        category = 'desktop'
      }

      setViewportSize({ width, height, category })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return viewportSize
}

// Hook for detecting mobile touch capability
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}
