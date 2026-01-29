// app/guide-profile/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      <p className="ml-3">Loading tour related data...</p>
    </div>
  );
}
