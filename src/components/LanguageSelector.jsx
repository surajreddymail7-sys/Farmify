import { useLanguage } from '../context/LanguageContext'
import '../styles/LanguageSelector.css'

function LanguageSelector() {
  const { language, setLanguage, translations, t } = useLanguage()

  return (
    <div className="language-selector">
      <button className="lang-toggle" aria-label={t('selectLanguage')}>
        <span className="globe-icon">🌐</span>
        <span className="current-lang">{translations[language].name}</span>
      </button>
      <div className="lang-dropdown">
        {Object.keys(translations).map((lang) => (
          <button
            key={lang}
            className={`lang-option ${language === lang ? 'active' : ''}`}
            onClick={() => setLanguage(lang)}
          >
            <span className="lang-flag">
              {lang === 'en' ? '🇬🇧' : 
               lang === 'hi' ? '🇮🇳' :
               lang === 'ta' ? '🇮🇳' :
               lang === 'te' ? '🇮🇳' :
               lang === 'bn' ? '🇮🇳' :
               lang === 'mr' ? '🇮🇳' :
               lang === 'gu' ? '🇮🇳' :
               lang === 'kn' ? '🇮🇳' :
               lang === 'ml' ? '🇮🇳' :
               lang === 'pa' ? '🇮🇳' : '🇮🇳'}
            </span>
            {translations[lang].name}
            {language === lang && <span className="check-mark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
