export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-8 h-8 border-2 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
