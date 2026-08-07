import { getWeatherInfo, getWindDirectionLabel } from '../utils/weatherCodes'

export default function CurrentWeatherCard({ location, current }) {
  const info = getWeatherInfo(current.weather_code)
  const isDay = current.is_day === 1

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo to-dusk border border-slate-750 p-8 shadow-card">
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20 animate-drift"
        style={{ background: isDay ? '#F59E0B' : '#8B5CF6' }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-mist/50 mb-1">
            {[location?.name, location?.admin1].filter(Boolean).join(', ')}
          </p>
          <div className="flex items-end gap-3">
            <span className="font-display font-semibold text-6xl text-cloud tabular-nums">
              {Math.round(current.temperature_2m)}°
            </span>
            <span className="text-5xl mb-1">{info.icon}</span>
          </div>
          <p className="text-mist/70 mt-1">{info.label}</p>
          <p className="text-xs text-mist/40 mt-3 font-mono">
            Terasa seperti {Math.round(current.apparent_temperature)}°C
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-750/70">
        <Stat label="Kelembapan" value={`${current.relative_humidity_2m}%`} />
        <Stat
          label="Angin"
          value={`${Math.round(current.wind_speed_10m)} km/j ${getWindDirectionLabel(current.wind_direction_10m)}`}
        />
        <Stat label="Tekanan" value={`${Math.round(current.surface_pressure)} hPa`} />
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-mist/35 mb-1">{label}</p>
      <p className="text-sm font-mono text-mist">{value}</p>
    </div>
  )
}
