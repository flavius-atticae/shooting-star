import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pauline Roussel - Yoga Prénatal & Accompagnement à la Naissance" },
    { name: "description", content: "Accompagnement holistique pour les femmes enceintes : yoga prénatal, doula, consultations bien-être et mama blessings. Spécialiste en maternité et naissance respectée." },
    { name: "keywords", content: "yoga prénatal, doula, accompagnement naissance, maternité, grossesse, postnatal, mama blessing, bien-être femme enceinte" },
  ];
}

export default function Home() {
  return <Welcome />;
}
