// WMO Weather interpretation codes (used by Open-Meteo)
// https://open-meteo.com/en/docs

export const WEATHER_CODES = {
  0: { label: 'Cerah', icon: '☀️' },
  1: { label: 'Cerah Berawan', icon: '🌤️' },
  2: { label: 'Berawan Sebagian', icon: '⛅' },
  3: { label: 'Berawan Penuh', icon: '☁️' },
  45: { label: 'Berkabut', icon: '🌫️' },
  48: { label: 'Kabut Beku', icon: '🌫️' },
  51: { label: 'Gerimis Ringan', icon: '🌦️' },
  53: { label: 'Gerimis Sedang', icon: '🌦️' },
  55: { label: 'Gerimis Lebat', icon: '🌧️' },
  56: { label: 'Gerimis Beku Ringan', icon: '🌧️' },
  57: { label: 'Gerimis Beku Lebat', icon: '🌧️' },
  61: { label: 'Hujan Ringan', icon: '🌧️' },
  63: { label: 'Hujan Sedang', icon: '🌧️' },
  65: { label: 'Hujan Lebat', icon: '🌧️' },
  66: { label: 'Hujan Beku Ringan', icon: '🌧️' },
  67: { label: 'Hujan Beku Lebat', icon: '🌧️' },
  71: { label: 'Salju Ringan', icon: '🌨️' },
  73: { label: 'Salju Sedang', icon: '🌨️' },
  75: { label: 'Salju Lebat', icon: '❄️' },
  77: { label: 'Butiran Salju', icon: '❄️' },
  80: { label: 'Hujan Lokal Ringan', icon: '🌦️' },
  81: { label: 'Hujan Lokal Sedang', icon: '🌧️' },
  82: { label: 'Hujan Lokal Lebat', icon: '⛈️' },
  85: { label: 'Salju Lokal Ringan', icon: '🌨️' },
  86: { label: 'Salju Lokal Lebat', icon: '❄️' },
  95: { label: 'Badai Petir', icon: '⛈️' },
  96: { label: 'Badai Petir + Hujan Es Ringan', icon: '⛈️' },
  99: { label: 'Badai Petir + Hujan Es Lebat', icon: '⛈️' }
}

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { label: 'Tidak diketahui', icon: '❔' }
}

export function getWindDirectionLabel(deg) {
  const dirs = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL']
  const idx = Math.round(deg / 45) % 8
  return dirs[idx]
}
