export default function SearchBar({ value, onChange, placeholder = 'Поиск...' }) {
  return (
    <div className="relative">
      <span style={{ color: '#888' }} className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">⌕</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          color: '#fff',
        }}
        className="w-full pl-10 pr-4 py-3 text-sm placeholder-gray-600 outline-none focus:border-yellow-300 transition-colors"
      />
    </div>
  );
}
