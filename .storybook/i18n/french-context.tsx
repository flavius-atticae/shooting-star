import React from "react";
import type { Decorator } from "@storybook/react";

/**
 * Configuration I18n pour le marché québécois
 *
 * Contexte et utilitaires pour tester les composants en français
 * avec les spécificités du Québec (formats, dates, devises, etc.)
 */

// Configuration Quebec-specific
export const QUEBEC_CONFIG = {
  locale: "fr-CA",
  currency: "CAD",
  dateFormat: "DD/MM/YYYY",
  phoneFormat: "(XXX) XXX-XXXX",
  postalCodeFormat: "AXA XAX",
  timezone: "America/Montreal",
  healthSystem: "RAMQ",
} as const;

// Textes français pour les composants pregnancy-safe
export const FRENCH_TEXTS = {
  pregnancy: {
    firstTrimester: "Premier trimestre",
    secondTrimester: "Deuxième trimestre",
    thirdTrimester: "Troisième trimestre",
    postpartum: "Post-partum",
    dueDate: "Date prévue d'accouchement",
    gestationWeeks: "Semaines de grossesse",
  },
  yoga: {
    prenatalYoga: "Yoga prénatal",
    postnatalYoga: "Yoga postnatal",
    gentleYoga: "Yoga doux",
    breathingTechniques: "Techniques de respiration",
    birthPreparation: "Préparation à l'accouchement",
    pelvicFloor: "Plancher pelvien",
  },
  actions: {
    book: "Réserver",
    cancel: "Annuler",
    reschedule: "Reporter",
    learnMore: "En savoir plus",
    contact: "Contacter",
    emergency: "Urgence",
  },
  health: {
    symptoms: "Symptômes",
    contractions: "Contractions",
    bloodPressure: "Tension artérielle",
    heartRate: "Rythme cardiaque",
    weight: "Poids",
    meditation: "Méditation",
  },
  accessibility: {
    reducedMotion: "Mouvement réduit",
    highContrast: "Contraste élevé",
    largeText: "Texte agrandi",
    screenReader: "Lecteur d'écran",
  },
} as const;

// Context provider pour les tests français
interface QuebecContextProps {
  children: React.ReactNode;
  persona?: "marie" | "sophie" | "alexandra";
  includeHealthcare?: boolean;
}

export const QuebecContext: React.FC<QuebecContextProps> = ({
  children,
  persona = "marie",
  includeHealthcare = false,
}) => {
  React.useEffect(() => {
    // Set document language
    document.documentElement.lang = QUEBEC_CONFIG.locale;

    // Set Quebec-specific meta information
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", viewport.getAttribute("content") + ", user-scalable=yes");
    }

    return () => {
      document.documentElement.lang = "en";
    };
  }, []);

  const contextValue = {
    locale: QUEBEC_CONFIG.locale,
    persona,
    texts: FRENCH_TEXTS,
    config: QUEBEC_CONFIG,
    includeHealthcare,
  };

  return (
    <div
      lang={QUEBEC_CONFIG.locale}
      data-locale={QUEBEC_CONFIG.locale}
      data-persona={persona}
      data-quebec-context="true"
    >
      {includeHealthcare && (
        <div className="quebec-healthcare-notice bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
          <p className="text-sm text-blue-800">
            <strong>🏥 Système de santé du Québec:</strong>
            Ce contenu est adapté aux standards RAMQ et aux lois de protection des données du
            Québec.
          </p>
        </div>
      )}

      <div className="french-context-indicator bg-green-50 border border-green-200 p-2 mb-4 rounded">
        <span className="text-xs text-green-700">
          🇫🇷 Contexte français québécois • Persona: {persona} • Locale: {QUEBEC_CONFIG.locale}
        </span>
      </div>

      {children}
    </div>
  );
};

// Decorator pour Storybook
export const withQuebecContext = (
  persona: "marie" | "sophie" | "alexandra" = "marie",
  includeHealthcare = false,
): Decorator => {
  return (Story, context) => (
    <QuebecContext persona={persona} includeHealthcare={includeHealthcare}>
      <Story {...context} />
    </QuebecContext>
  );
};

// Utilitaire pour générer du contenu français réaliste
export const generateFrenchContent = (type: keyof typeof FRENCH_TEXTS, count = 1) => {
  const texts = FRENCH_TEXTS[type];
  const keys = Object.keys(texts) as Array<keyof typeof texts>;

  if (count === 1) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return texts[randomKey];
  }

  return keys.slice(0, count).map((key) => texts[key]);
};

// Validation des formats québécois
export const validateQuebecFormats = {
  postalCode: (code: string) => /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(code),
  phone: (phone: string) => /^\(\d{3}\) \d{3}-\d{4}$/.test(phone),
  healthCard: (card: string) => /^[A-Z]{4}\d{8}$/.test(card),
  sin: (sin: string) => /^\d{3} \d{3} \d{3}$/.test(sin),
};

// Générateur de données de test québécoises
export const generateQuebecTestData = () => ({
  postalCodes: ["H1A 0A1", "G1A 0A1", "J1A 0A1"],
  phoneNumbers: ["(514) 123-4567", "(418) 987-6543", "(450) 555-0123"],
  cities: ["Montréal", "Québec", "Laval", "Gatineau", "Sherbrooke"],
  healthCards: ["DOUB12345678", "TREM98765432", "JOHN11223344"],
  hospitals: [
    "Hôpital Sainte-Justine",
    "CHUM",
    "Hôpital Maisonneuve-Rosemont",
    "Centre hospitalier de Québec",
  ],
  insuranceProviders: ["RAMQ", "Desjardins Assurances", "Sun Life du Canada", "Great-West Vie"],
});

// Test helper pour le contenu français
export const testFrenchContentQuality = (element: HTMLElement) => {
  const textContent = element.textContent || "";

  // Indicateurs de qualité française
  const qualityIndicators = {
    hasAccents: /[éèêëàâäùûüôöîïç]/i.test(textContent),
    hasFrenchArticles: /\b(le|la|les|un|une|des|du|de la)\b/i.test(textContent),
    hasFrenchConjunctions: /\b(et|ou|mais|donc|car|ni)\b/i.test(textContent),
    hasProperSpacing: !/\w[!?:;]/.test(textContent), // Space before punctuation
    hasQuebecTerms: /\b(dépanneur|fin de semaine|magasinage|courriel)\b/i.test(textContent),
  };

  const score = Object.values(qualityIndicators).filter(Boolean).length;

  return {
    ...qualityIndicators,
    overallScore: score,
    maxScore: Object.keys(qualityIndicators).length,
    percentage: Math.round((score / Object.keys(qualityIndicators).length) * 100),
    suggestions: [
      ...(qualityIndicators.hasAccents ? [] : ["Ajouter les accents français appropriés"]),
      ...(qualityIndicators.hasFrenchArticles
        ? []
        : ["Utiliser les articles français (le, la, les)"]),
      ...(qualityIndicators.hasProperSpacing ? [] : ["Ajouter l'espacement avant la ponctuation"]),
      ...(qualityIndicators.hasQuebecTerms ? [] : ["Considérer l'utilisation de termes québécois"]),
    ],
  };
};

export default QuebecContext;
