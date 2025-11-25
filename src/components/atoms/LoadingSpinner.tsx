import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ message = 'جاري التحميل...' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 md:px-6">
      <Loader2 className="text-primary mb-4 h-12 w-12 animate-spin" />
      <p className="text-lg text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  )
}

export default LoadingSpinner
