import { useCallback, useState } from 'react'

export function useGeolocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const detect = useCallback(() => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setError('Browser tidak mendukung Geolocation.')
        resolve(null)
        return
      }
      setLoading(true)
      setError(null)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoading(false)
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        },
        (err) => {
          setLoading(false)
          setError(
            err.code === err.PERMISSION_DENIED
              ? 'Izin lokasi ditolak. Aktifkan izin lokasi di browser Anda.'
              : 'Gagal mendeteksi lokasi. Coba cari kota secara manual.'
          )
          resolve(null)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      )
    })
  }, [])

  return { detect, loading, error }
}
