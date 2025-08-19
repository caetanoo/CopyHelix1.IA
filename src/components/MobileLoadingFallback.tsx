import { Skeleton } from "@/components/ui/skeleton";

interface MobileLoadingFallbackProps {
  type?: 'page' | 'component' | 'minimal';
  height?: string;
}

export const MobileLoadingFallback = ({ 
  type = 'page', 
  height = 'min-h-screen' 
}: MobileLoadingFallbackProps) => {
  if (type === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (type === 'component') {
    return (
      <div className="w-full p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  // Page loading fallback
  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black ${height} flex flex-col`}>
      {/* Header skeleton */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-4 space-y-6">
        {/* Hero section skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>

        {/* Content blocks skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-4 right-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default MobileLoadingFallback;