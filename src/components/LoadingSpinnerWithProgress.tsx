import { useEffect, useRef, useState } from "react";

export function LoadingSpinnerWithProgress({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef(false);

  const jump = () => {
    setProgress((prev) => {
      if (prev >= 88) return prev;
      const jumpBy = Math.floor(Math.random() * 10) + 5;
      return Math.min(prev + jumpBy, 88);
    });

    const nextDelay = Math.floor(Math.random() * 2000) + 1000;
    timeoutRef.current = setTimeout(jump, nextDelay);
  };

  useEffect(() => {
    if (isLoading) {
      jump();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setProgress(100);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-light border-t-success-base" />
      <p className="text-gray-600 text-sm">Loading... {progress}%</p>
    </div>
  );
}
