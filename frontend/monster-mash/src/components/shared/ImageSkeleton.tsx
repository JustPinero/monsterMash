import { useState } from 'react'

interface ImageSkeletonProps {
  src: string
  alt: string
  className?: string
}

export function ImageSkeleton({ src, alt, className = '' }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-horror-surface animate-pulse rounded" />
      )}
      <img
        src={error ? '/monsters/placeholder.svg' : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded || error ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}
