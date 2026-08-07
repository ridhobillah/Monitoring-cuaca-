import { getWeatherInfo } from '../utils/weatherCodes'
import { formatDay, formatDate } from '../utils/helpers'

export default function DailyForecast({ daily }) {
  if (!daily?.time) return null

  const globalMin = Math.min(...daily.temperature_2m_min)
  const globalMax = Math.max(...daily.temperature_2m_max)
  const range = globalMax - globalMin || 1

  return (
    <div className="rounded-3xl bg-indigo/40 border border-slate-750 p-6 shadow-card">
      <h2 className="font-display font-semibold text-cloud mb-4">Prakiraan 7 Hari</h2>
      <div className="flex flex-col divide-y divide-slate-750/60">
        {daily.time.map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i])
          const min = daily.temperature_2m_min[i]
          const max = daily.temperature_2m_max[i]
          const leftPct = ((min - globalMin) / range) * 100
          const widthPct = ((max - min) / range) * 100

          return (
            <div key={date} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <div className="w-16 shrink-0">
                <p className="text-sm text-mist">{formatDay(date, i)}</p>
                <p className="text-[10px] text-mist/30 font-mono">{formatDate(date)}</p>
              </div>
              <span className="text-xl shrink-0 w-7 text-center">{info.icon}</span>
              <span className="text-xs text-mist/40 font-mono w-9 text-right shrink-0">
                {Math.round(min)}°
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-750 relative overflow-hidden">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-aurora to-haze"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </div>
              <span className="text-xs text-mist font-mono w-9 shrink-0">{Math.round(max)}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
