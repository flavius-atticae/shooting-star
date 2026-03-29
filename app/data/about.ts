import type { MethodItem } from "~/components/layout/about";

export const ABOUT_DEFAULT_CONTENT =
  "Je suis Pauline, femme, maman, doula, professeure de yoga et grande curieuse du vivant. Depuis toujours, j'apprends et je cherche à comprendre pour mieux accompagner. Mon parcours m'a guidé, du monde de la danse et du mouvement vers l'univers du féminin, de la maternité, de la transformation. Je suis profondément touchée par la puissance, la complexité et la beauté des femmes. Douce et bienveillante, je vous accompagne avec respect, écoute et sensibilité, dans toutes les transitions de la vie.";

export const defaultMethodItems: MethodItem[] = [
  {
    id: "ecoute",
    title: "Écoute",
    description:
      "Une attention particulière portée à vos besoins, à votre rythme et à votre vécu unique.",
  },
  {
    id: "bienveillance",
    title: "Bienveillance",
    description: "Un accompagnement respectueux et sans jugement, dans la douceur et la confiance.",
  },
  {
    id: "adaptation",
    title: "Adaptation",
    description:
      "Des pratiques personnalisées selon votre état, vos capacités et vos envies du moment.",
  },
];

// Custom inspirations for the About page
export const inspirationItems: MethodItem[] = [
  {
    id: "holistique",
    title: "Holistique",
    description:
      "Ma méthode considère la Femme dans sa globalité : corps, mental, émotions et énergie. Chaque pratique et chaque accompagnement vise à favoriser l'équilibre, l'ancrage et le rayonnement de ton énergie féminine.",
  },
  {
    id: "bienveillante",
    title: "Bienveillante",
    description:
      "Je crée un espace doux, sécurisant et empathique, où tu peux t'écouter, te révéler et t'épanouir en toute confiance, portée par une guidance attentive et réconfortante.",
  },
  {
    id: "engagee",
    title: "Engagée",
    description:
      "Je m'implique pleinement pour t'accompagner à chaque étape, avec des outils, des pratiques et une présence soutenante qui respectent ton parcours et tes besoins uniques.",
  },
];
