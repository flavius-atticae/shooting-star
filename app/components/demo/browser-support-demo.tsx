/**
 * Browser Support Demo Component
 * 
 * Comprehensive demonstration of all browser support detection features
 * Useful for Storybook, development, and QA testing
 */

import * as React from "react"
import { 
  useBrowserFeatures, 
  useBrowserCapabilities, 
  useContainerQueries,
  useMotionPreferences,
  useProgressiveEnhancement 
} from "~/hooks/use-browser-support"
import { 
  FeatureGate, 
  EnhancedGrid, 
  MotionSafe, 
  EnhancedImage,
  BrowserCapabilityIndicator 
} from "~/components/utils/progressive-enhancement"
import { browserSupportDebug } from "~/lib/browser-support"
import { cn } from "~/lib/utils"

/**
 * Feature status display component
 */
const FeatureStatus: React.FC<{ 
  name: string
  supported: boolean
  description: string 
}> = ({ name, supported, description }) => (
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div>
      <div className="font-medium text-neutral">{name}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <div className={cn(
      "px-2 py-1 rounded text-sm font-medium",
      supported 
        ? "bg-green-100 text-green-800" 
        : "bg-red-100 text-red-800"
    )}>
      {supported ? "✅ Supported" : "❌ Not supported"}
    </div>
  </div>
)

/**
 * Container Query demonstration
 */
const ContainerQueryDemo: React.FC = () => {
  const { hasSupport, getContainerClass, getGridClass } = useContainerQueries()
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral">Container Queries Demo</h3>
      
      <div className="p-4 border-2 border-dashed border-primary/20 rounded-lg">
        <p className="mb-4 text-sm text-gray-600">
          Support: {hasSupport ? "✅ Container Queries" : "❌ Fallback Media Queries"}
        </p>
        
        <div className={cn("resize-x border-2 border-accent/30 min-w-64", getContainerClass())}>
          <div className={getGridClass(2)}>
            <div className="bg-primary/10 p-4 rounded text-center">Item 1</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 2</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 3</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 4</div>
          </div>
        </div>
        
        <p className="mt-2 text-xs text-gray-500">
          Resize the container above to see responsive adaptation
        </p>
      </div>
    </div>
  )
}

/**
 * Motion preferences demonstration
 */
const MotionDemo: React.FC = () => {
  const { prefersReduced, shouldAnimate, getAnimationClass } = useMotionPreferences()
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral">Motion Preferences Demo</h3>
      
      <div className="p-4 border rounded-lg bg-soft/50">
        <p className="mb-4 text-sm">
          Motion preference: {prefersReduced ? "🤢 Reduced (pregnancy-safe)" : "✨ Normal"}
        </p>
        
        <div className="space-y-3">
          <MotionSafe 
            animationClass="animate-pulse bg-accent/20"
            fallbackClass="bg-accent/10"
          >
            <div className="p-3 rounded text-center text-neutral">
              Preference-respectful animation
            </div>
          </MotionSafe>
          
          <div className={getAnimationClass(
            "transition-all duration-500 hover:scale-105 bg-secondary/20",
            "transition-none bg-secondary/10"
          )}>
            <div className="p-3 rounded text-center text-neutral">
              Adaptive hover effect
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Progressive enhancement demonstration
 */
const ProgressiveEnhancementDemo: React.FC = () => {
  const enhancement = useProgressiveEnhancement()
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral">Progressive Enhancement Demo</h3>
      
      <div className="space-y-3">
        <div className="p-3 border rounded-lg">
          <div className="font-medium mb-2">Enhanced Grid</div>
          <EnhancedGrid columns={3} gap="gap-4">
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item A</div>
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item B</div>
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item C</div>
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item D</div>
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item E</div>
            <div className="bg-menthe/10 p-3 rounded text-center text-xs">Item F</div>
          </EnhancedGrid>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="font-medium mb-2">Feature Gates</div>
          <div className="space-y-2 text-sm">
            <FeatureGate 
              feature="backdropFilter"
              fallback={<div className="text-gray-600">❌ No backdrop filter</div>}
            >
              <div className="text-green-600">✅ Backdrop filter available</div>
            </FeatureGate>
            
            <FeatureGate 
              feature="aspectRatio"
              fallback={<div className="text-gray-600">❌ CSS aspect-ratio not supported</div>}
            >
              <div className="text-green-600">✅ CSS aspect-ratio supported</div>
            </FeatureGate>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="font-medium mb-2">Enhanced Image (with aspect ratio)</div>
          <EnhancedImage
            src="/api/placeholder/300/200"
            alt="Demonstration image"
            aspectRatio="3/2"
            className="w-48 rounded border"
            lazy
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Browser capability summary
 */
const CapabilitySummary: React.FC = () => {
  const capabilities = useBrowserCapabilities()
  
  const tierColors = {
    modern: "bg-green-100 text-green-800 border-green-200",
    legacy: "bg-yellow-100 text-yellow-800 border-yellow-200",
    minimal: "bg-red-100 text-red-800 border-red-200"
  }
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold text-neutral mb-3">Capabilities Summary</h3>
      
      <div className={cn(
        "inline-block px-3 py-2 rounded-lg border mb-3",
        tierColors[capabilities.tier]
      )}>
        <strong>Browser Tier: {capabilities.tier.toUpperCase()}</strong>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-neutral mb-2">✅ Supported Features</h4>
          <ul className="space-y-1">
            {capabilities.supportedFeatures.map(feature => (
              <li key={feature} className="text-green-600">• {feature}</li>
            ))}
          </ul>
        </div>
        
        {capabilities.missingCriticalFeatures.length > 0 && (
          <div>
            <h4 className="font-medium text-neutral mb-2">⚠️ Missing Critical Features</h4>
            <ul className="space-y-1">
              {capabilities.missingCriticalFeatures.map(feature => (
                <li key={feature} className="text-red-600">• {feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <div className={cn(
          "text-sm",
          capabilities.hasAccessibilitySupport ? "text-green-600" : "text-amber-600"
        )}>
          <strong>Accessibility Support (Quebec Law 25):</strong> {
            capabilities.hasAccessibilitySupport ? "✅ Compliant" : "⚠️ Verification required"
          }
        </div>
      </div>
    </div>
  )
}

/**
 * Development tools section
 */
const DevTools: React.FC = () => {
  const handleLogCapabilities = () => {
    browserSupportDebug.logCapabilities()
  }
  
  const handleGenerateReport = () => {
    const report = browserSupportDebug.generateReport()
    console.log(report)
    
    // Copy to clipboard if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(report)
        .then(() => alert('Report copied to clipboard!'))
        .catch(() => console.log('Report generated in console'))
    }
  }
  
  return (
    <div className="p-4 border rounded-lg bg-cool/30">
      <h3 className="text-lg font-semibold text-neutral mb-3">Development Tools</h3>
      
      <div className="space-y-3">
        <button 
          onClick={handleLogCapabilities}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Log Capabilities to Console
        </button>
        
        <button 
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors ml-3"
        >
          Generate & Copy Report
        </button>
        
        <div className="text-xs text-gray-600 mt-2">
          ⚠️ These tools are only active in development mode
        </div>
      </div>
    </div>
  )
}

/**
 * Main browser support demo component
 */
export const BrowserSupportDemo: React.FC = () => {
  const features = useBrowserFeatures()
  
  const featureDescriptions = {
    containerQueries: "Container Queries CSS (@container)",
    intersectionObserver: "API for observing element intersection", 
    scrollBehavior: "CSS scroll-behavior for smooth scrolling",
    cssGrid: "CSS Grid Layout for modern layouts",
    flexbox: "CSS Flexbox for alignments",
    focusVisible: ":focus-visible pseudo-class for accessibility",
    backdropFilter: "Background blur effect",
    aspectRatio: "CSS aspect-ratio property",
    webAnimations: "Web Animations API for performant animations",
    prefersReducedMotion: "Reduced motion preference detection (pregnancy-safe)"
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral mb-2">
          🌟 Browser Support Detection Demo
        </h1>
        <p className="text-gray-600">
          Cross-browser feature detection system for Shooting Star
        </p>
      </div>
      
      {/* Capability Summary */}
      <CapabilitySummary />
      
      {/* Feature Status Grid */}
      <div>
        <h2 className="text-xl font-semibold text-neutral mb-4">Feature Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(features).map(([key, supported]) => (
            <FeatureStatus
              key={key}
              name={key}
              supported={supported}
              description={featureDescriptions[key as keyof typeof featureDescriptions] || "Browser feature"}
            />
          ))}
        </div>
      </div>
      
      {/* Interactive Demos */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral">Interactive Demonstrations</h2>
        
        <ContainerQueryDemo />
        <MotionDemo />
        <ProgressiveEnhancementDemo />
      </div>
      
      {/* Development Tools */}
      {process.env.NODE_ENV === 'development' && (
        <DevTools />
      )}
      
      {/* Browser Capability Indicator (dev only) */}
      <BrowserCapabilityIndicator />
    </div>
  )
}

export default BrowserSupportDemo