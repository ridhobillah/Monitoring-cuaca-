export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-[3px] border-aurora/20 border-t-aurora rounded-full animate-spin" />
      <p className="text-sm text-mist/40 animate-pulseSoft">Mengambil data cuaca...</p>
    </div>
  )
}
