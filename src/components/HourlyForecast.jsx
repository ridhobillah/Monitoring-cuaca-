import { getWeatherInfo } from '../utils/weatherCodes'
import { formatHour } from '../utils/helpers'

export default function HourlyForecast({ hourly }) {
  if (!hourly?.time) return null

  const now = new Date()
  const startIndex = hourly.time.findIndex((t) => new Date(t) >= now)
  const from = startIndex === -1 ? 0 : startIndex
  const slice = { length: 24 }

  const items = Array.from(slice, (_, i) => {
    const idx = from + i
    if (idx >= hourly.time.length) return null
    return {
      time: hourly.time[idx],
      temp: hourly.temperature_2m[idx],
      code: hourly.weather_code[idx],
      pop: hourly.precipitation_probability[idx]
    }
  }).filter(Boolean)

  return (
    <div className="rounded-3xl bg-indigo/40 border border-slate-750 p-6 shadow-card">
      <h2 className="font-display font-semibold text-cloud mb-4">Prakiraan Per Jam</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {items.map((item, i) => {
          const info = getWeatherInfo(item.code)
          return (
            <div key={item.time} className="flex flex-col items-center shrink-0 w-16">
              <p className="text-xs text-mist/40 mb-2">{i === 0 ? 'Now' : formatHour(item.time)}</p>
              <span className="text-2xl mb-2">{info.icon}</span>
              <p className="text-sm font-mono text-mist mb-1">{Math.round(item.temp)}°</p>
              <p className="text-[10px] text-aurora/70 font-mono">{item.pop}%</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
