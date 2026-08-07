// Open-Meteo API wrapper — no API key required.
// Docs: https://open-meteo.com/en/docs

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/reverse'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request gagal (${res.status}): ${url}`)
  }
  return res.json()
}

/**
 * Cari lokasi berdasarkan nama kota.
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return []
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=8&language=id&format=json`
  const data = await fetchJson(url)
  return (data.results || []).map((r) => ({
    id: `${r.id}`,
    name: r.name,
    admin1: r.admin1 || '',
    country: r.country || '',
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone
  }))
}

/**
 * Reverse geocode dari koordinat (dipakai untuk hasil Geolocation browser).
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const url = `${REVERSE_GEOCODE_URL}?latitude=${latitude}&longitude=${longitude}&language=id&format=json`
    const data = await fetchJson(url)
    const r = data.results?.[0]
    if (!r) {
      return { name: 'Lokasi Saat Ini', admin1: '', country: '', latitude, longitude }
    }
    return {
      id: `${r.id}`,
      name: r.name,
      admin1: r.admin1 || '',
      country: r.country || '',
      latitude,
      longitude,
      timezone: r.timezone
    }
  } catch {
    return { name: 'Lokasi Saat Ini', admin1: '', country: '', latitude, longitude }
  }
}

/**
 * Ambil cuaca saat ini, per jam, dan 7 hari ke depan.
 */
export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: 'auto',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure'
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'weather_code',
      'uv_index'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'uv_index_max',
      'precipitation_probability_max',
      'sunrise',
      'sunset'
    ].join(','),
    forecast_days: '7'
  })
  return fetchJson(`${FORECAST_URL}?${params.toString()}`)
}

/**
 * Ambil kualitas udara saat ini & per jam (termasuk US AQI).
 */
export async function getAirQuality(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: 'auto',
    current: ['us_aqi', 'pm10', 'pm2_5', 'ozone', 'carbon_monoxide', 'nitrogen_dioxide', 'sulphur_dioxide'].join(','),
    hourly: ['us_aqi'].join(',')
  })
  return fetchJson(`${AIR_QUALITY_URL}?${params.toString()}`)
}
