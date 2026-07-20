'use client'

interface ProgressBarProps {
  progress: number
  duration: number
  onSeek: (time: number) => void
}

export default function ProgressBar({ progress, duration, onSeek }: ProgressBarProps) {
  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    onSeek(percent * duration)
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-[#B3B3B3] w-10 text-right">
        {formatTime(progress)}
      </span>
      <div
        className="flex-1 h-1 bg-[#535353] rounded-full cursor-pointer group relative"
        onClick={handleClick}
      >
        <div
          className="h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-colors"
          style={{ width: `${(progress / (duration || 1)) * 100}%` }}
        />
      </div>
      <span className="text-xs text-[#B3B3B3] w-10">
        {formatTime(duration)}
      </span>
    </div>
  )
}
