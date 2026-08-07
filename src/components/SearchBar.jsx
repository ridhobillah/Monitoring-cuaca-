import { useEffect, useRef, useState } from 'react'
import { searchLocations } from '../api/openMeteo'

export default function SearchBar({ onSelectLocation, onUseCurrentLocation, geoLoading }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const containerRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const data = await searchLocations(query)
        setResults(data)
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 350)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(loc) {
    onSelectLocation(loc)
    setQuery('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mist/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Cari kota, mis. Jakarta, Bandung..."
            className="w-full bg-indigo/60 border border-slate-750 rounded-xl pl-11 pr-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:border-aurora/50 focus:bg-indigo transition-colors outline-none"
          />
          {searching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-aurora/30 border-t-aurora rounded-full animate-spin" />
          )}
        </div>
        <button
          onClick={onUseCurrentLocation}
          disabled={geoLoading}
          title="Gunakan lokasi saat ini"
          className="shrink-0 w-12 h-12 rounded-xl bg-aurora/10 border border-aurora/30 text-aurora hover:bg-aurora/20 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {geoLoading ? (
            <div className="w-4 h-4 border-2 border-aurora/30 border-t-aurora rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v8m4-4H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full bg-dusk border border-slate-750 rounded-xl shadow-card overflow-hidden">
          {results.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-indigo/60 transition-colors flex items-center justify-between group border-b border-slate-750/50 last:border-0"
            >
              <div>
                <p className="text-sm text-mist group-hover:text-cloud">{loc.name}</p>
                <p className="text-xs text-mist/40">
                  {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                </p>
              </div>
              <span className="text-mist/20 group-hover:text-aurora transition-colors">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
