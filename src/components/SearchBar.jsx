export default function SearchBar({ value, onChange, placeholder = 'Поиск...' }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-gray-200 transition-colors"
      />
    </div>
  );
}
