export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-aurora to-violet flex items-center justify-center shadow-glow animate-drift">
          <span className="text-lg">🌿</span>
        </div>
        <div>
          <h1 className="font-display font-semibold text-xl text-cloud leading-tight">EcoAir</h1>
          <p className="text-xs text-mist/50 -mt-0.5">Dashboard Cuaca & Udara</p>
        </div>
      </div>
    </header>
  )
}
