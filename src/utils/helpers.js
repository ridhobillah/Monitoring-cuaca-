// AQI (US EPA scale, as returned by Open-Meteo's us_aqi field)
export function getAqiLevel(aqi) {
  if (aqi == null) return { label: '—', color: '#94A3B8', advice: 'Data tidak tersedia.', textColor: 'text-slate-400' }
  if (aqi <= 50)
    return {
      label: 'Baik',
      color: '#2DD4BF',
      textColor: 'text-aurora',
      advice: 'Udara bersih. Aman untuk semua aktivitas di luar ruangan, termasuk olahraga.'
    }
  if (aqi <= 100)
    return {
      label: 'Sedang',
      color: '#A3E635',
      textColor: 'text-lime-400',
      advice: 'Kualitas udara cukup baik. Kelompok sangat sensitif sebaiknya kurangi aktivitas berat di luar.'
    }
  if (aqi <= 150)
    return {
      label: 'Tidak Sehat (Sensitif)',
      color: '#F59E0B',
      textColor: 'text-haze',
      advice: 'Penderita asma & anak-anak sebaiknya batasi aktivitas luar ruang yang lama.'
    }
  if (aqi <= 200)
    return {
      label: 'Tidak Sehat',
      color: '#FB923C',
      textColor: 'text-orange-400',
      advice: 'Gunakan masker jika keluar rumah. Kurangi aktivitas fisik berat di luar ruangan.'
    }
  if (aqi <= 300)
    return {
      label: 'Sangat Tidak Sehat',
      color: '#EF4444',
      textColor: 'text-ember',
      advice: 'Hindari aktivitas luar ruang. Gunakan masker N95 bila harus keluar rumah.'
    }
  return {
    label: 'Berbahaya',
    color: '#991B1B',
    textColor: 'text-red-800',
    advice: 'Tetap di dalam ruangan. Tutup jendela dan gunakan penyaring udara jika ada.'
  }
}

// Percentage position (0-100) of an AQI value along the 0-300+ gradient strip
export function aqiToPercent(aqi) {
  if (aqi == null) return 0
  const clamped = Math.max(0, Math.min(aqi, 300))
  return (clamped / 300) * 100
}

export function getUvLevel(uv) {
  if (uv == null) return { label: '—', color: '#94A3B8' }
  if (uv < 3) return { label: 'Rendah', color: '#2DD4BF' }
  if (uv < 6) return { label: 'Sedang', color: '#A3E635' }
  if (uv < 8) return { label: 'Tinggi', color: '#F59E0B' }
  if (uv < 11) return { label: 'Sangat Tinggi', color: '#FB923C' }
  return { label: 'Ekstrem', color: '#EF4444' }
}

export function formatHour(isoString) {
  return new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function formatDay(isoString, index) {
  if (index === 0) return 'Hari Ini'
  return new Date(isoString).toLocaleDateString('id-ID', { weekday: 'short' })
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}
