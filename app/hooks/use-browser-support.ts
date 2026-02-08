/**
 * React hook for motion preference detection
 *
 * Provides reactive access to the user's reduced-motion preference
 * with proper SSR handling. Critical for pregnancy-safe UX.
 */

import { useState, useEffect, useMemo } from 'react'
import { prefersReducedMotion } from '~/lib/browser-support'

/**
 * Hook for motion preferences (pregnancy-safe UX)
 * Critical for users experiencing nausea or motion sensitivity
 *
 * @returns Object with motion preference and helper functions
 *
 * @example
 * ```tsx
 * function AnimatedSection() {
 *   const { shouldAnimate, getAnimationClass } = useMotionPreferences()
 *
 *   return (
 *     <div className={getAnimationClass('animate-fadeIn', 'opacity-100')}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export function useMotionPreferences() {
  const [isReduced, setIsReduced] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsReduced(prefersReducedMotion())
    }
  }, [])

  const helpers = useMemo(() => ({
    /**
     * Should animations be enabled?
     * Respects user's motion preferences
     */
    shouldAnimate: !isReduced,

    /**
     * Get appropriate animation class based on preferences
     */
    getAnimationClass: (animationClass: string, fallbackClass: string = '') => {
      return isReduced ? fallbackClass : animationClass
    },

    /**
     * Get transition duration based on preferences
     * Shorter durations for motion-sensitive users
     */
    getTransitionDuration: (normal: string = 'duration-300', reduced: string = 'duration-150') => {
      return isReduced ? reduced : normal
    }
  }), [isReduced])

  return {
    prefersReduced: isReduced,
    ...helpers
  }
}