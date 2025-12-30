export default function Skeleton() {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 h-full animate-pulse">
      {/* Картинка */}
      <div className="h-64 bg-gray-700 w-full" />
      {/* Текст */}
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}