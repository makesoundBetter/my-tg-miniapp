import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { services, categories } from '../data/services';
import { countries } from '../data/countries';

const CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP', 'AED', 'THB', 'CNY', 'USDT TRC20', 'USDT ERC20', 'BTC'];

const mainSections = [
  { id: 'online', label: 'Онлайн сервисы' },
  { id: 'moving', label: 'Перестановки' },
  { id: 'legal', label: 'Юр. услуги' },
];

function BigButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        boxShadow: '0 4px 0 #000, 0 6px 16px rgba(0,0,0,0.5)',
      }}
      className="w-full p-5 flex items-center justify-between active:translate-y-1 active:shadow-none transition-all"
    >
      <span className="text-white font-semibold text-base">{label}</span>
      <span style={{ color: '#F5E642' }} className="text-xl font-bold">›</span>
    </button>
  );
}

function BackButton({ onClick, title }) {
  return (
    <div className="p-4 pt-5 flex items-center gap-3">
      <button
        onClick={onClick}
        style={{ color: '#F5E642', border: '1px solid #2A2A2A', background: '#1A1A1A' }}
        className="w-8 h-8 flex items-center justify-center text-lg font-bold shrink-0"
      >
        ‹
      </button>
      <h2 className="text-white font-bold text-lg">{title}</h2>
    </div>
  );
}

function ServiceIcon({ service }) {
  const [failed, setFailed] = useState(false);
  if (service.logo && !failed) {
    return <img src={service.logo} alt="" onError={() => setFailed(true)} className="w-10 h-10 object-contain" />;
  }
  return <span className="text-3xl">{service.emoji}</span>;
}

function FlagImg({ code, name }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={name}
      style={{ width: '28px', height: '20px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
    />
  );
}

const inputStyle = {
  background: '#111',
  border: '1px solid #2A2A2A',
  color: '#fff',
  outline: 'none',
  width: '100%',
  padding: '13px 14px',
  fontSize: '15px',
  borderRadius: '2px',
};

const labelStyle = {
  color: '#555',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: '6px',
  display: 'block',
};

export default function Catalog() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [countrySearch, setCountrySearch] = useState('');

  // Moving flow state
  const [destCountry, setDestCountry] = useState(null);       // страна назначения
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [sourceSearch, setSourceSearch] = useState('');
  const [sourceCountry, setSourceCountry] = useState(null);   // страна отдачи
  const [sourcePicker, setSourcePicker] = useState(false);
  const [transferMethod, setTransferMethod] = useState(null);

  const filtered = selectedCategory ? services.filter(s => s.category === selectedCategory) : [];
  const selectedCat = categories.find(c => c.id === selectedCategory);

  const handleSendRequest = () => {
    const text = encodeURIComponent(
      `Перестановка средств\n\n` +
      `Страна назначения: ${destCountry.name}\n` +
      `Сумма: ${amount} ${currency}\n` +
      `Страна отдачи: ${sourceCountry.name}\n` +
      `Способ передачи: ${transferMethod}`
    );
    window.open(`https://t.me/Torontocake?text=${text}`, '_blank');
  };

  // Экран 1: главные разделы
  if (screen === 'main') {
    return (
      <div>
        <div className="p-4 pt-6 pb-4">
          <p style={{ color: '#888', letterSpacing: '0.15em' }} className="text-xs uppercase mb-1">Каталог</p>
          <h1 className="text-2xl font-bold text-white">Услуги</h1>
        </div>
        <div className="px-4 space-y-3">
          {mainSections.map(s => (
            <BigButton key={s.id} label={s.label} onClick={() => setScreen(s.id)} />
          ))}
        </div>
      </div>
    );
  }

  // Экран 2: подразделения Онлайн сервисов
  if (screen === 'online') {
    return (
      <div>
        <BackButton onClick={() => setScreen('main')} title="Онлайн сервисы" />
        <div className="px-4 space-y-3">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <BigButton
              key={cat.id}
              label={cat.name}
              onClick={() => { setSelectedCategory(cat.id); setScreen('services'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Экран 3: список услуг
  if (screen === 'services') {
    return (
      <div>
        <BackButton onClick={() => setScreen('online')} title={selectedCat?.name} />
        <div className="px-4 space-y-3 pb-4">
          {filtered.map(service => (
            <button
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              style={{
                background: '#1A1A1A',
                border: '1px solid #2A2A2A',
                boxShadow: '0 4px 0 #000, 0 6px 16px rgba(0,0,0,0.5)',
              }}
              className="w-full p-4 flex items-center gap-4 active:translate-y-1 active:shadow-none transition-all text-left"
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <ServiceIcon service={service} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{service.name}</p>
                <p style={{ color: '#888' }} className="text-xs truncate mt-0.5">{service.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Перестановки — шаг 1: список стран назначения
  if (screen === 'moving') {
    const list = countries.filter(c =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase())
    );
    return (
      <div className="pb-20">
        <BackButton onClick={() => setScreen('main')} title="Перестановки" />
        <div className="px-4 mb-1">
          <p style={{ color: '#555', fontSize: '12px', marginBottom: '10px' }}>
            Выберите страну, <span className="text-white">куда</span> нужно перевести средства
          </p>
          <input
            type="text"
            placeholder="Поиск страны..."
            value={countrySearch}
            onChange={e => setCountrySearch(e.target.value)}
            style={{ ...inputStyle, padding: '10px 14px', fontSize: '14px' }}
          />
        </div>
        <div className="mt-2">
          {list.map(country => (
            <button
              key={country.name}
              onClick={() => {
                setDestCountry(country);
                setCountrySearch('');
                setScreen('moving-form');
              }}
              style={{ borderBottom: '1px solid #1a1a1a' }}
              className="w-full flex items-center gap-4 px-4 py-3 active:bg-white/5 transition-colors text-left"
            >
              <FlagImg code={country.code} name={country.name} />
              <span className="text-white text-sm font-medium">{country.name}</span>
              <span style={{ color: '#F5E642' }} className="ml-auto text-lg">›</span>
            </button>
          ))}
          {list.length === 0 && (
            <p style={{ color: '#555' }} className="text-center text-sm pt-10">Страна не найдена</p>
          )}
        </div>
      </div>
    );
  }

  // Перестановки — шаг 2: форма
  if (screen === 'moving-form') {
    const sourceList = countries.filter(c =>
      c.name.toLowerCase().includes(sourceSearch.toLowerCase())
    );

    return (
      <div className="pb-28">
        <BackButton onClick={() => setScreen('moving')} title="Перестановки" />

        {/* Страна назначения (выбрана) */}
        <div className="px-4 mb-5">
          <div style={{ background: '#0f0f0f', border: '1px solid #2A2A2A', padding: '12px 14px', borderRadius: '2px' }}>
            <p style={{ color: '#555', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Страна назначения
            </p>
            <div className="flex items-center gap-3">
              <FlagImg code={destCountry.code} name={destCountry.name} />
              <span className="text-white font-semibold">{destCountry.name}</span>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Сумма */}
          <div>
            <label style={labelStyle}>Сумма</label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Валюта */}
          <div>
            <label style={labelStyle}>Валюта</label>
            <div className="flex gap-2 flex-wrap">
              {CURRENCIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  style={{
                    background: currency === c ? '#F5E642' : '#1A1A1A',
                    color: currency === c ? '#000' : '#888',
                    border: '1px solid #2A2A2A',
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: currency === c ? 'bold' : 'normal',
                    borderRadius: '2px',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Страна отдачи */}
          <div>
            <label style={labelStyle}>Страна, где вы отдаёте средства</label>
            {sourceCountry && !sourcePicker ? (
              <button
                onClick={() => setSourcePicker(true)}
                style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <FlagImg code={sourceCountry.code} name={sourceCountry.name} />
                <span>{sourceCountry.name}</span>
                <span style={{ color: '#F5E642', marginLeft: 'auto' }}>›</span>
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Поиск страны..."
                  value={sourceSearch}
                  onChange={e => setSourceSearch(e.target.value)}
                  style={{ ...inputStyle, marginBottom: '2px' }}
                  autoFocus={sourcePicker}
                />
                <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#0f0f0f', border: '1px solid #2A2A2A', borderTop: 'none' }}>
                  {sourceList.map(country => (
                    <button
                      key={country.name}
                      onClick={() => { setSourceCountry(country); setSourceSearch(''); setSourcePicker(false); }}
                      style={{ borderBottom: '1px solid #1a1a1a' }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 active:bg-white/5 text-left"
                    >
                      <FlagImg code={country.code} name={country.name} />
                      <span className="text-white text-sm">{country.name}</span>
                    </button>
                  ))}
                  {sourceList.length === 0 && (
                    <p style={{ color: '#555', fontSize: '12px', padding: '12px' }}>Не найдено</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Способ передачи */}
          <div>
            <label style={labelStyle}>Способ передачи</label>
            <div className="space-y-2">
              {[
                { id: 'online', label: 'Онлайн перевод', desc: 'Перевод через банк или крипту' },
                { id: 'offline', label: 'Офлайн встреча', desc: 'Личная передача наличных' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setTransferMethod(m.label)}
                  style={{
                    background: transferMethod === m.label ? '#1a1500' : '#111',
                    border: transferMethod === m.label ? '1px solid #F5E642' : '1px solid #2A2A2A',
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: transferMethod === m.label ? '4px solid #F5E642' : '2px solid #333',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                  />
                  <div>
                    <p style={{ color: transferMethod === m.label ? '#F5E642' : '#fff', fontSize: '13px', fontWeight: '600' }}>
                      {m.label}
                    </p>
                    <p style={{ color: '#555', fontSize: '11px', marginTop: '2px' }}>{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Кнопка отправки */}
        <div className="fixed bottom-[70px] left-0 right-0 p-4">
          <button
            onClick={handleSendRequest}
            disabled={!amount || !sourceCountry || !transferMethod}
            style={{
              background: amount && sourceCountry && transferMethod ? '#F5E642' : '#1a1a1a',
              color: amount && sourceCountry && transferMethod ? '#000' : '#444',
              border: '1px solid #2A2A2A',
              width: '100%',
              padding: '16px',
              fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            Узнать условия →
          </button>
        </div>
      </div>
    );
  }

  // Юр. услуги
  return (
    <div>
      <BackButton onClick={() => setScreen('main')} title="Юридические услуги" />
      <div className="flex flex-col items-center justify-center pt-16 px-8">
        <span style={{ color: '#F5E642' }} className="text-5xl mb-6">⚖️</span>
        <p className="text-white font-semibold text-lg mb-2">Юридические услуги</p>
        <p style={{ color: '#888' }} className="text-sm text-center">Раздел скоро появится.</p>
      </div>
    </div>
  );
}
