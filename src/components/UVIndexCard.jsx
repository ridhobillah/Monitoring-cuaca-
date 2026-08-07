import { getUvLevel } from '../utils/helpers'

export default function UVIndexCard({ uvIndex }) {
  const level = getUvLevel(uvIndex)
  const percent = uvIndex != null ? Math.min((uvIndex / 12) * 100, 100) : 0

  return (
    <div className="rounded-3xl bg-indigo/40 border border-slate-750 p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-cloud">Indeks UV</h2>
        <span className="text-xl">☀️</span>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <span className="font-display font-semibold text-4xl tabular-nums" style={{ color: level.color }}>
          {uvIndex != null ? uvIndex.toFixed(1) : '—'}
        </span>
        <span className="text-sm font-medium mb-1" style={{ color: level.color }}>
          {level.label}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-750 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, backgroundColor: level.color }}
        />
      </div>

      <p className="text-xs text-mist/50 mt-4 leading-relaxed">
        {uvIndex >= 6
          ? 'Gunakan tabir surya, kacamata hitam, dan topi jika beraktivitas di luar.'
          : 'Paparan UV rendah hingga sedang, tetap aman untuk aktivitas luar ruang.'}
      </p>
    </div>
  )
}
