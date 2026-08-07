import { aqiToPercent, getAqiLevel } from '../utils/helpers'

export default function AirQualityCard({ airQuality }) {
  const aqi = airQuality?.us_aqi
  const level = getAqiLevel(aqi)
  const percent = aqiToPercent(aqi)

  return (
    <div className="rounded-3xl bg-indigo/40 border border-slate-750 p-6 shadow-card">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display font-semibold text-cloud">Kualitas Udara</h2>
        <span className="text-xs font-mono text-mist/40">US AQI</span>
      </div>

      <div className="flex items-end gap-3 mt-3 mb-5">
        <span className="font-display font-semibold text-4xl tabular-nums" style={{ color: level.color }}>
          {aqi ?? '—'}
        </span>
        <span className={`text-sm font-medium mb-1 ${level.textColor}`}>{level.label}</span>
      </div>

      {/* Signature element: barometer-style AQI gradient strip with position marker */}
      <div className="relative h-3 rounded-full bg-sky-strip mb-2">
        <div
          className="absolute top-1/2 w-4 h-4 rounded-full bg-cloud border-2 shadow-lg transition-all duration-700"
          style={{
            left: `${percent}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: level.color
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-mist/30 font-mono mb-5">
        <span>0</span>
        <span>150</span>
        <span>300+</span>
      </div>

      <p className="text-sm text-mist/70 leading-relaxed mb-5">{level.advice}</p>

      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-750/70">
        <Pollutant label="PM2.5" value={airQuality?.pm2_5} unit="µg/m³" />
        <Pollutant label="PM10" value={airQuality?.pm10} unit="µg/m³" />
        <Pollutant label="Ozon" value={airQuality?.ozone} unit="µg/m³" />
      </div>
    </div>
  )
}

function Pollutant({ label, value, unit }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-wide text-mist/35 mb-1">{label}</p>
      <p className="text-sm font-mono text-mist">{value != null ? Math.round(value) : '—'}</p>
      <p className="text-[9px] text-mist/25">{unit}</p>
    </div>
  )
}
