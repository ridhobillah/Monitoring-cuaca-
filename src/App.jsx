import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CurrentWeatherCard from './components/CurrentWeatherCard'
import AirQualityCard from './components/AirQualityCard'
import UVIndexCard from './components/UVIndexCard'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import FavoriteLocations from './components/FavoriteLocations'
import LoadingScreen from './components/LoadingScreen'
import ErrorBanner from './components/ErrorBanner'
import { useGeolocation } from './hooks/useGeolocation'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getAirQuality, getWeather, reverseGeocode } from './api/openMeteo'

const DEFAULT_LOCATION = {
  id: 'default-jakarta',
  name: 'Jakarta',
  admin1: 'DKI Jakarta',
  country: 'Indonesia',
  latitude: -6.2088,
  longitude: 106.8456
}

export default function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [weather, setWeather] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useLocalStorage('ecoair:favorites', [])

  const { detect, loading: geoLoading, error: geoError } = useGeolocation()

  const loadData = useCallback(async (loc) => {
    setLoading(true)
    setError(null)
    try {
      const [weatherData, airData] = await Promise.all([
        getWeather(loc.latitude, loc.longitude),
        getAirQuality(loc.latitude, loc.longitude)
      ])
      setWeather(weatherData)
      setAirQuality(airData.current)
    } catch (err) {
      setError('Gagal memuat data cuaca. Periksa koneksi internet Anda dan coba lagi.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(location)
  }, [location, loadData])

  useEffect(() => {
    if (geoError) setError(geoError)
  }, [geoError])

  async function handleUseCurrentLocation() {
    const coords = await detect()
    if (!coords) return
    const loc = await reverseGeocode(coords.latitude, coords.longitude)
    setLocation({ id: `current-${coords.latitude}-${coords.longitude}`, ...loc })
  }

  function handleAddCurrentToFavorites() {
    if (favorites.some((f) => f.id === location.id)) return
    setFavorites([...favorites, location])
  }

  function handleRemoveFavorite(id) {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  const isCurrentSaved = favorites.some((f) => f.id === location.id)

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Header />

        <div className="mb-6">
          <SearchBar
            onSelectLocation={setLocation}
            onUseCurrentLocation={handleUseCurrentLocation}
            geoLoading={geoLoading}
          />
        </div>

        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {loading ? (
          <LoadingScreen />
        ) : weather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-16">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <CurrentWeatherCard location={location} current={weather.current} />
              <HourlyForecast hourly={weather.hourly} />
              <DailyForecast daily={weather.daily} />
            </div>
            <div className="flex flex-col gap-6">
              <AirQualityCard airQuality={airQuality} />
              <UVIndexCard uvIndex={weather.daily?.uv_index_max?.[0]} />
              <FavoriteLocations
                favorites={favorites}
                activeId={location.id}
                onSelect={setLocation}
                onRemove={handleRemoveFavorite}
                onAddCurrent={handleAddCurrentToFavorites}
                isCurrentSaved={isCurrentSaved}
              />
            </div>
          </div>
        ) : null}

        <footer className="text-center text-xs text-mist/25 pb-8">
          Data oleh{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-mist/40 hover:text-aurora transition-colors"
          >
            Open-Meteo
          </a>{' '}
          — gratis & tanpa API key.
        </footer>
      </div>
    </div>
  )
}
