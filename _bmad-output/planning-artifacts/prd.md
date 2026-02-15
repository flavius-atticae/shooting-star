---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/api-contracts.md
  - docs/data-models.md
  - docs/component-inventory.md
  - docs/source-tree-analysis.md
  - docs/development-guide.md
  - docs/deployment-guide.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 9
workflowType: "prd"
projectType: "brownfield"
date: "2026-02-13"
classification:
  projectType: web_app
  domain: wellness_professional_services
  complexity: medium
  projectContext: brownfield
lastEdited: "2026-02-15"
editHistory:
  - date: "2026-02-13"
    changes: "Full revision guided by validation report: measurable FR/NFR, leakage cleanup, traceability and completeness improvements"
  - date: "2026-02-13"
    changes: "Traceability hardening and final FR wording cleanup for full guided revision"
  - date: "2026-02-15"
    changes: "Added Phase 1 Epic 2 for test strategy modernization, with measurable quality metrics, FR/NFR additions, and CI quality gate alignment"
  - date: "2026-02-15"
    changes: "Added consolidated traceability matrix and LLM Spec Pack appendix for Epic 2 requirements"
---

# Product Requirements Document - shooting-star

**Author:** Flavius
**Date:** 2026-02-13

## Executive Summary

**Vision :** Le site shooting-star est la vitrine professionnelle de Pauline Roussel, instructrice de yoga périnatal et doula à Saint-Lambert (Rive-Sud de Montréal). Il positionne l'accompagnement à la naissance comme service phare et offre un point de contact direct pour les femmes enceintes et nouvelles mamans du Grand Montréal.

**Différentiateur :** Approche chaleureuse, rassurante et pregnancy-safe — le site reflète l'accompagnement humain de Pauline, pas une clinique froide. Design mobile-first pensé pour une main (bébé dans l'autre).

**Public cible :** Femmes enceintes et nouvelles mamans, Québec francophone (fr-CA), principalement Rive-Sud → Verdun/Sud-Ouest → Montréal centre.

**Contexte :** Projet brownfield — site en production sur Fly.io (Toronto). Phase actuelle : consolidation de l'existant via la méthodologie BMAD pour structurer les évolutions futures avec des agents IA.

**Classification :** web_app · wellness_professional_services · medium complexity · brownfield

## Success Criteria

### User Success

- **Utilisatrices finales (B2C — femmes enceintes, nouvelles mamans, Montréal) :**
  - Comprennent en ≤ 30 secondes qui est Pauline et ce qu'elle offre (test utilisateur modéré, n=10)
  - Identifient le service doula comme offre principale en ≤ 2 interactions depuis la page d'accueil (test d'arborescence)
  - Complètent le formulaire de contact en ≤ 2 minutes avec un taux de succès ≥ 90% (test modéré, n=10)
  - Naviguent sur mobile avec un taux d'erreur ≤ 10% sur les tâches critiques (ouvrir menu, changer de page, envoyer formulaire)
  - Déclarent un sentiment de confiance ≥ 4/5 après parcours complet, soutenu par des contenus de crédibilité (témoignages et page À propos)

- **Développeur + Agents IA :**
  - Un agent peut implémenter une feature complète (analyse → QA) avec ≤ 2 demandes de clarification sur les artefacts BMAD
  - Un nouveau contributeur (humain ou IA) peut expliquer l'architecture et lancer le projet en ≤ 60 minutes à partir des docs
  - Le workflow BMAD couvre le cycle complet avec artefacts disponibles pour chaque étape (analyse, UX, architecture, implémentation, QA)

### Business Success

- **Priorité 1 — Doula :** Le site positionne clairement l'accompagnement à la naissance comme service phare, avec un funnel de conversion clair vers le formulaire de contact
- **Priorité 2 — Cours existants :** Yoga et Féminin Sacré sont présentés mais sans objectif de croissance — maintien de l'existant
- **Priorité 3 — B2B (futur) :** Les ateliers en entreprise sont un segment à développer dans une phase ultérieure, pas dans le MVP actuel
- **Visibilité locale :** Présence web crédible et professionnelle pour la région de Montréal
- **Mesure de succès :** Augmentation des demandes de contact via le formulaire de +25% dans les 6 mois (baseline: moyenne mensuelle des 3 derniers mois avant mise en œuvre)

### Technical Success

- **Clean Code (Uncle Bob) :** Responsabilité unique, fonctions courtes, nommage expressif, pas de duplication inutile
- **Tests efficaces :** Si quelque chose change ou casse → le build casse. Tests qui protègent les régressions, pas du test cosmétique
- **Ratio LOC/valeur :** Réduire de 10% le code dupliqué sur les composants critiques et supprimer 100% du code mort identifié lors de l'audit
- **Stack proportionnée :** La stack actuelle (React Router v7 SSR, Tailwind v4, shadcn/ui) est classique et propre — la conserver sans ajouter de complexité
- **Conformité intégrée :** WCAG 2.1 AA, GDPR/PIPEDA/Loi 25 comme contraintes de base, pas comme features séparées
- **Performance correcte :** LCP < 2.5s mobile — suffisant pour une vitrine, pas besoin de micro-optimisation

### Measurable Outcomes

| Métrique                         | Cible                                                                 | Comment mesurer                     |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------------------- |
| Formulaire contact fonctionnel   | 100% des soumissions livrées                                          | Tests E2E Playwright                |
| Build cassé si régression        | 0 régression silencieuse                                              | CI/CD pipeline (tests unit + E2E)   |
| Couverture de test significative | Tests sur les flux critiques (contact, navigation, a11y)              | Vitest + Playwright                 |
| Accessibilité                    | WCAG 2.1 AA                                                           | axe-core automatisé + tests manuels |
| LCP mobile                       | < 2.5s                                                                | Lighthouse CI                       |
| Codebase rationalisé             | -10% de duplication sur composants critiques et 0 code mort identifié | Audit LOC + revue technique         |
| Flaky tests                      | Taux de flakiness ≤ 2% sur les suites critiques pendant 3 sprints     | Historique CI (reruns/runs totaux) |
| Feedback CI sur PR               | Temps médian ≤ 12 minutes pour checks obligatoires                    | Durée workflow CI sur PR            |
| Faux positifs visuels            | ≤ 5% des échecs visuels classés comme bruit                           | Triage visuel mensuel               |

## Product Scope

### MVP — État actuel à consolider

- 7 routes existantes fonctionnelles (/, /yoga, /accompagnement, /feminin-sacre, /a-propos, /contact, /health)
- Formulaire de contact protégé contre le spam, limitation d'abus, confirmation utilisatrice et notification métier
- Design system cohérent (9 couleurs, 3 typos, composants shadcn/ui)
- Déploiement Fly.io opérationnel
- Documentation BMAD (PRD, Architecture, Epics/Stories) maintenue comme source de vérité

### Growth Features (Post-MVP)

- Rationalisation du code : audit et nettoyage des ~22k lignes
- Renforcement des tests : s'assurer que chaque flux critique est couvert
- SEO local : optimisation pour la recherche « doula Montréal » / « accompagnement naissance Montréal »
- Contenu enrichi : témoignages réels, photos professionnelles
- Analytics avec consentement (conforme Loi 25)

### Vision (Future)

- Section B2B : ateliers en entreprise, tarification corpo, formulaire dédié
- Système de réservation en ligne (si le volume le justifie)
- Blog / contenu éducatif (SEO long-tail)
- Multilinguisme (EN) si expansion hors Québec

## User Journeys

### Journey 1 : Camille — Future maman cherche une doula (B2C primaire — Happy path)

**Qui :** Camille, 31 ans, enceinte de 5 mois, vit à Rosemont. Premier bébé. Un peu anxieuse à l'idée de l'accouchement. Son conjoint est ouvert mais pas très impliqué dans les recherches.

**Ouverture :** Camille google « doula Montréal » après qu'une amie lui ait parlé de son accompagnement. Elle tombe sur le site de Pauline — ou une amie lui envoie le lien directement via Instagram.

**Parcours :**

1. Arrive sur la page d'accueil → voit le hero qui l'interpelle, comprend immédiatement que Pauline est doula et accompagnante à la naissance
2. Clique sur « Accompagnement » dans la nav → découvre les 9 services de doula, l'approche par phases (grossesse → accouchement → postpartum)
3. Lit les témoignages → se sent rassurée par les retours d'autres mamans
4. Vérifie la page « À propos » → veut savoir qui est Pauline, sa formation, sa philosophie
5. Revient sur la section CTA → clique « Me contacter »
6. Remplit le formulaire (nom, email, message) → reçoit un email de confirmation
7. Pauline reçoit la notification → répond par email/téléphone

**Climax :** Le moment où Camille lit les témoignages et l'approche de Pauline, et se dit « c'est elle que je veux ». Le formulaire de contact est juste la concrétisation.

**Résolution :** Camille et Pauline se parlent, s'entendent, et démarrent l'accompagnement. Camille se sent soutenue et moins anxieuse.

**Ce que ce journey révèle :**

- La page Doula est le cœur du funnel — elle doit convaincre
- Les témoignages sont un levier de confiance critique
- Le formulaire de contact doit être frictionless
- Le SEO local « doula Montréal » est le point d'entrée organique

### Journey 2 : Isabelle — Maman qui cherche du soutien postnatal (B2C — Edge case)

**Qui :** Isabelle, 28 ans, a accouché il y a 3 semaines. Fatiguée, un peu perdue, allaitement difficile. Cherche du soutien mais ne sait pas exactement quoi.

**Ouverture :** Isabelle voit un post Instagram de Pauline partagé par une connaissance. Elle clique sur le lien dans la bio.

**Parcours :**

1. Arrive sur le site sur son téléphone, une main tenant le bébé → navigation mobile impérative
2. Voit les services sur la page d'accueil → hésite entre yoga postnatal et accompagnement doula
3. Explore la page Yoga → découvre les cours de yoga postnatal, comprend que c'est adapté à sa situation
4. Explore la page Doula → réalise que l'accompagnement doula est prénatal et à la naissance, pas postnatal
5. Revient sur la page Yoga → se décide pour les cours de yoga postnatal
6. Décide de contacter Pauline pour s'inscrire → formulaire de contact
7. Écrit un message un peu confus (fatigue de nouvelle maman) → le formulaire accepte quand même

**Climax :** Le moment où Isabelle comprend clairement que le yoga postnatal est fait pour elle, sans confusion avec les services de doula qui sont pré/péri-nataux uniquement.

**Résolution :** Pauline la contacte et l'invite au prochain cours de yoga postnatal. Isabelle retrouve un moment pour elle.

**Ce que ce journey révèle :**

- La distinction entre services doula (prénatal + naissance) et yoga postnatal doit être limpide
- Le mobile one-handed est un vrai use case (bébé dans les bras)
- Le formulaire doit être tolérant (messages courts, pas de sélection obligatoire trop précise)
- Le ton doit rassurer, pas surcharger d'information

### Journey 3 : Pauline — Propriétaire du site (Admin)

**Qui :** Pauline Roussel, instructrice de yoga et doula. Pas technique du tout. Utilise son téléphone et Instagram comme outils principaux.

**Ouverture :** Un lundi matin, Pauline vérifie ses emails.

**Parcours :**

1. Reçoit un email de notification « Nouveau message de contact » → voit le nom, l'email, et le message de Camille
2. Lit le message → comprend que Camille cherche un accompagnement doula
3. Répond à Camille par email ou l'appelle directement
4. Si elle veut modifier du contenu sur le site (nouveau témoignage, changement de tarif, nouvel événement féminin sacré) → contacte Flavius
5. Flavius met à jour les données dans `app/data/` et redéploie

**Climax :** Le système de notification email fonctionne de façon fiable — Pauline ne rate aucune demande de contact.

**Résolution :** Pauline peut se concentrer sur son métier d'accompagnante sans se soucier de la technique.

**Ce que ce journey révèle :**

- La fiabilité des emails (Resend) est critique — une demande ratée = un client perdu
- Pauline n'a AUCUNE interface admin — toute modification passe par Flavius
- Un CMS headless pourrait éventuellement résoudre ça (vision future)
- Les notifications email doivent être claires et contenir toute l'info nécessaire

### Journey 4 : Flavius + Agent IA — Cycle de développement BMAD (Développeur / Ops)

**Qui :** Flavius, architecte logiciel. Utilise BMAD avec des agents IA (Copilot, Claude) pour faire évoluer le site shooting-star.

**Ouverture :** Pauline demande à Flavius d'ajouter une section « FAQ » sur la page Doula. Ou Flavius identifie lui-même un besoin d'amélioration (rationaliser un composant, améliorer les tests).

**Parcours :**

1. **Analyse** → Flavius lance l'agent PM (John) pour créer ou mettre à jour le PRD avec la nouvelle feature / le changement
2. **UX** → L'agent UX (Sally) propose le design et la structure de la section, cohérente avec le design system existant
3. **Architecture** → L'agent Architecte (Winston) valide que le changement s'intègre proprement dans la stack existante, pas de complexité ajoutée inutile
4. **Implémentation** → L'agent Dev (Amelia) implémente la story en suivant les specs exactes, avec les tests unitaires
5. **QA** → L'agent QA (Quinn) vérifie la couverture de test, les régressions, l'accessibilité
6. **Quality Gates** → Les checks obligatoires (tests critiques, régression visuelle, règles de merge) passent avec un signal fiable
7. **Review** → Flavius review la PR, vérifie le code, merge
8. **Maintenance des baselines** → Les snapshots visuels approuvés sont mis à jour via un flux explicite en PR
9. **Déploiement** → CI/CD pousse en staging puis production via Fly.io

**Climax :** L'agent Dev produit du code qui passe les tests du premier coup, respecte les conventions du projet, et ne génère pas de dette technique.

**Résolution :** La feature est en prod, documentée, testée, et le PRD/epics sont mis à jour. Le prochain agent qui travaille sur le projet a toute la connaissance nécessaire.

**Ce que ce journey révèle :**

- Les artefacts BMAD (PRD, architecture, epics/stories) doivent être la source de vérité
- Les instructions agent (`copilot.instructions.md`, `codacy.instructions.md`) doivent refléter les conventions du code
- Le CI/CD doit être le filet de sécurité — un agent qui casse quelque chose doit être attrapé par les tests
- La documentation doit rester synchronisée avec le code (pas de docs périmées)

### Journey Requirements Summary

| Journey                            | Capabilities révélées                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Camille (doula B2C)**            | Pages services convaincantes, témoignages, formulaire contact frictionless, SEO local                 |
| **Isabelle (postnatal edge case)** | Navigation mobile one-handed, distinction claire des services, ton bienveillant, formulaire tolérant  |
| **Pauline (admin)**                | Notifications email fiables, emails clairs et complets, pas d'interface admin (pour l'instant)        |
| **Flavius + Agent IA (dev BMAD)**  | Artefacts BMAD comme source de vérité, CI/CD comme filet de sécurité, docs synchronisées avec le code |

## Traceability Matrix

| Journey / Objective                         | Epic | FR Coverage           | NFR Coverage                  | Test Signal                                          | Owner   | Status |
| ------------------------------------------- | ---- | --------------------- | ----------------------------- | ---------------------------------------------------- | ------- | ------ |
| Conversion B2C doula (Camille, Isabelle)   | 1    | FR1-FR13, FR22-FR25   | NFR-P1-P6, NFR-A1-A6          | E2E contact/navigation, a11y checks, Lighthouse CI   | Flavius | Active |
| Fiabilité opérationnelle (Pauline)          | 1    | FR14-FR16, FR26-FR28  | NFR-F1-F4, NFR-S1-S7          | Health checks, email flow tests, abuse protection    | Flavius | Active |
| Delivery BMAD (Flavius + Agents IA)         | 1    | FR29-FR33             | NFR-T2 (feedback CI), NFR-F3  | PR checks pass/fail, implementation readiness checks | Flavius | Active |
| Stratégie de test modernisée (Epic 2)       | 2    | FR34-FR38             | NFR-T1-T4                     | Visual regression, flakiness trend, merge gates      | Flavius | Active |

**Legend:**
- **Epic 1:** Consolidation technique
- **Epic 2:** Modernisation de la stratégie de test

## Web App Specific Requirements

### Project-Type Overview

Shooting-star est un site vitrine SSR (Server-Side Rendered) construit avec React Router v7. L'architecture MPA avec hydration client offre un bon socle pour le SEO et la performance. Le site est mobile-first, ciblant principalement les femmes enceintes naviguant sur leur téléphone dans la région de Montréal (Rive-Sud, Sud-Ouest, puis Montréal centre).

### Responsive Design

- **Approche :** Mobile-first — le design mobile est la référence, le desktop est l'adaptation
- **Breakpoints :** Suivent les breakpoints Tailwind standard (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Viewports testés :** 375px (mobile), 768px (tablette), 1280px (desktop), 1536px (xlarge) — déjà couverts par les tests de régression visuelle
- **Touch targets :** Minimum 44×44px sur mobile — déjà implémenté

### Browser Support

- **Cible :** Navigateurs modernes evergreen uniquement
- **Priorité mobile :** Chrome Mobile (Android), Safari Mobile (iOS) — les deux navigateurs dominants pour le public cible
- **Priorité desktop :** Chrome, Safari, Firefox (dernières 2 versions)
- **Exclus :** IE11, navigateurs legacy — aucun effort de compatibilité

### Performance Targets

Les cibles de performance mesurables sont définies dans la section [Non-Functional Requirements > Performance](#performance). Pas de micro-optimisation — on vise « correct et perceptiblement rapide », pas « benchmark parfait ».

### SEO Strategy (À construire)

**État actuel :** Aucun travail SEO — tout est à faire.

**Fondations techniques (SSR = avantage) :**

- Le SSR rend les pages indexables par défaut ✅
- React Router v7 supporte les `meta()` functions par route — à implémenter
- Structured data (JSON-LD) pour les services locaux — à ajouter

**SEO local — Zones géographiques (par priorité) :**

1. **Rive-Sud** — Saint-Lambert, Longueuil, Brossard, Saint-Bruno, Boucherville
2. **Sud-Ouest de l'île** — Verdun, Le Sud-Ouest, LaSalle, Ville-Émard
3. **Montréal centre** — Plateau, Rosemont, Villeray, Centre-ville
4. **Rive-Nord** — Dernière priorité, pas un focus

**Requêtes SEO cibles :**

- « doula Rive-Sud », « doula Saint-Lambert », « doula Longueuil »
- « accompagnement naissance Rive-Sud Montréal »
- « doula Verdun », « doula Sud-Ouest Montréal »
- « yoga prénatal Rive-Sud »
- « doula Montréal » (plus large, plus compétitif)

**Actions SEO prioritaires :**

- Google Business Profile : à créer et lier au site
- Schema.org LocalBusiness : structured data pour le référencement local
- Meta tags par page : title, description, Open Graph — à implémenter sur chaque route
- Sitemap.xml : à générer
- robots.txt : à configurer

**Contenu SEO (phase ultérieure) :**

- Blog / articles éducatifs pour capter le long-tail (ex: « qu'est-ce qu'une doula », « yoga prénatal bienfaits »)
- Témoignages et cas concrets pour le contenu unique

### Accessibility Level

- **Standard :** WCAG 2.1 AA — non négociable
- **Outillage :** axe-core (automatisé dans Playwright + Storybook), tests manuels ponctuels
- **Patterns pregnancy-safe :** Touch targets 44px+, `prefers-reduced-motion`, animations calmes, contrast ratios respectés
- **État actuel :** Bien intégré dans le code et les tests ✅

Les critères mesurables d'accessibilité sont définis dans la section [Non-Functional Requirements > Accessibilité](#accessibilité).

### Architecture Constraints

- **SSR-first :** Toutes les pages rendues côté serveur — pas de client-only rendering
- **Progressive enhancement :** Le formulaire de contact fonctionne sans JavaScript (server actions)
- **Static data :** Contenu dans `app/data/` en TypeScript — simple, versionné, pas de CMS pour l'instant
- **Server-only modules :** Email, honeypot, rate limiter isolés avec `.server.ts` — pas de leak côté client

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP :** Le MVP est **déjà en production**. La stratégie est une consolidation progressive — documenter, rationaliser, puis étendre. Chaque phase est incrémentale et livrable indépendamment.

**Ressources :** Un développeur (Flavius) assisté par des agents IA via la méthodologie BMAD. Pas d'équipe dédiée — le rythme est déterminé par la disponibilité.

### Phase 1 — Consolidation & Polish (En cours)

**Core User Journeys supportés :** Camille, Isabelle, Pauline, Flavius + Agent IA

**Epic 1 — Consolidation technique :** Rationalisation du code, fiabilisation des flux critiques et réduction de la dette technique.

**Epic 2 — Modernisation de la stratégie de test (Phase 1) :**

- Définir une pyramide de test explicite (unit/integration/component/e2e/visual) sans duplication d'assertions
- Remplacer la dépendance à un outil visuel unique par une stratégie de régression visuelle soutenable en CI
- Stabiliser la CI de test avec des gates explicites et une gouvernance des baselines
- Maintenir des boucles de feedback rapides sur PR tout en limitant le bruit de faux positifs

**Must-Have :**

- Documentation BMAD complète (PRD, Architecture, Epics/Stories) comme source de vérité
- Rationalisation du codebase (~22k LOC → identifier et éliminer le superflu)
- Renforcement des tests (flux critiques couverts, build qui casse si régression)
- Mise en place de l'Epic 2 de stratégie de test (pyramide, visual regression sans dépendance fournisseur unique, quality gates CI)
- **Issue #186 — Effets graphiques subtils :** Animations au scroll, micro-interactions boutons/cartes, transitions de page, support `prefers-reduced-motion`, pas d'impact LCP/CLS

### Phase 2 — SEO, Contenu & Monitoring

**Objectif :** Rendre Pauline trouvable en ligne et assurer la visibilité sur les erreurs en production.

**Fonctionnalités :**

- Meta tags et Open Graph par route (title, description)
- Structured data JSON-LD (LocalBusiness, Service)
- Sitemap.xml et robots.txt
- Google Business Profile (Rive-Sud / Saint-Lambert)
- Contenu enrichi : vrais témoignages clients, photos professionnelles
- Monitoring d'erreurs via Sentry (serveur + client)

### Phase 3 — Expansion

**Objectif :** Nouveaux segments et autonomie de Pauline.

**Fonctionnalités :**

- Section B2B corpo : ateliers en entreprise, offre dédiée, formulaire spécifique
- Blog / contenu éducatif (SEO long-tail)
- CMS headless pour l'autonomie de Pauline (si le besoin se confirme)
- Multilinguisme (EN) si expansion hors Québec

### Risk Mitigation Strategy

| Risque                                              | Impact               | Mitigation                                                             |
| --------------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **Technique — Régression silencieuse**              | Moyen                | Tests CI/CD + régression visuelle en environnement déterministe        |
| **Technique — Over-engineering**                    | Moyen                | Stack proportionnée, pas d'ajout de complexité inutile                 |
| **Market — SEO inexistant**                         | Élevé                | Phase 2 dédiée au SEO local, requêtes hyper-locales moins compétitives |
| **Ressource — Dev solo**                            | Moyen                | BMAD + agents IA pour multiplier la capacité, phases indépendantes     |
| **Business — Pauline ne peut pas modifier le site** | Faible (court terme) | Flavius gère, CMS en Phase 3 si nécessaire                             |
| **Qualité — Bruit de régression visuelle**          | Moyen                | Environnement CI déterministe, gouvernance baseline et triage mensuel  |

## Functional Requirements

### Présentation des Services

- **FR1:** Une visiteuse peut identifier les 3 catégories de services principales depuis la page d'accueil en ≤ 2 interactions.
- **FR2:** Une visiteuse peut consulter la page doula avec les 9 services et les 3 phases d'accompagnement.
- **FR3:** Une visiteuse peut consulter les offres de yoga prénatal, postnatal et privé sur une page dédiée.
- **FR4:** Une visiteuse peut consulter les événements et ateliers du féminin sacré avec leurs informations essentielles.
- **FR5:** Une visiteuse peut consulter au minimum 3 témoignages clients visibles sur les pages services.

### Découverte & Navigation

- **FR6:** Une visiteuse peut accéder à toutes les pages principales via une navigation persistante.
- **FR7:** Une visiteuse peut utiliser la navigation mobile d'une seule main avec des cibles tactiles de 44x44px minimum.
- **FR8:** Une visiteuse peut accéder à la page contact depuis chaque page principale via au moins un appel à l'action visible.
- **FR9:** Une visiteuse peut consulter la page À propos incluant biographie, formation et philosophie d'accompagnement.

### Prise de Contact

- **FR10:** Une visiteuse peut soumettre un formulaire avec nom, courriel et message lorsque les champs requis sont valides.
- **FR11:** Une visiteuse peut ajouter ses disponibilités de manière optionnelle dans le formulaire.
- **FR12:** Une visiteuse peut recevoir une confirmation de réception dans un délai maximal de 5 minutes après soumission valide.
- **FR13:** Pauline peut recevoir une notification contenant les détails de la demande dans un délai maximal de 5 minutes.

### Protection & Sécurité

- **FR14:** Le système peut rejeter automatiquement les soumissions de spam détectées sur le formulaire de contact.
- **FR15:** Le système peut limiter les soumissions à 3 tentatives par fenêtre de 15 minutes et par origine réseau.
- **FR16:** Le système peut valider et assainir 100% des entrées utilisateur avant traitement.

### Expérience Visuelle & Animations (Issue #186)

- **FR17:** Une visiteuse peut voir des animations d'entrée au scroll avec une durée comprise entre 150ms et 400ms sur les sections clés.
- **FR18:** Une visiteuse peut voir un changement visuel sur les boutons dans les états survol, focus et activation.
- **FR19:** Une visiteuse peut voir un changement visuel sur les cartes interactives au survol ou au focus.
- **FR20:** Une visiteuse peut bénéficier de transitions de page d'une durée comprise entre 150ms et 300ms sans blocage de navigation.
- **FR21:** Le système peut réduire ou désactiver les animations lorsque la préférence utilisateur de réduction de mouvement est active.

### SEO & Découvrabilité (Phase 2)

- **FR22:** Le site peut exposer sur chaque page publique un titre, une description et des métadonnées de partage social renseignées.
- **FR23:** Le site peut publier des données structurées de service local pour les moteurs de recherche.
- **FR24:** Le site peut publier des fichiers d'indexation et de directives d'exploration pour les moteurs de recherche.
- **FR25:** Le site peut rester indexable sans exécution JavaScript côté client.

### Monitoring & Opérations

- **FR26:** Le système peut exposer un signal de santé exploitable par la supervision opérationnelle.
- **FR27:** Flavius peut déclencher un déploiement production automatisé avec vérifications préalables et stratégie de retour arrière documentée.
- **FR28:** Le système peut remonter les erreurs serveur et client vers un service centralisé de monitoring en phase 2.

### Workflow de Développement (BMAD)

- **FR29:** Un agent IA peut consulter les artefacts BMAD requis (PRD, architecture, epics/stories) avec des droits de lecture explicites.
- **FR30:** Un agent IA peut implémenter une story en respectant les conventions de code et de test documentées.
- **FR31:** Le processus qualité peut bloquer l'intégration de changements lorsque les tests obligatoires échouent.
- **FR32:** Un agent IA peut implémenter une story complète avec au plus 2 demandes de clarification sur les artefacts fournis.
- **FR33:** Un nouveau contributeur (humain ou IA) peut démarrer le projet et expliquer l'architecture en ≤ 60 minutes à partir de la documentation.

### Stratégie de Test & Quality Gates (Epic 2)

- **FR34:** Le projet peut appliquer une pyramide de test documentée couvrant unit, integration, component, end-to-end et visual regression.
- **FR35:** Le processus qualité peut exécuter des vérifications visuelles en CI sans dépendance obligatoire à un outil fournisseur unique.
- **FR36:** Le processus qualité peut empêcher le merge lorsque les checks obligatoires de stratégie de test échouent.
- **FR37:** Flavius peut approuver et mettre à jour les baselines visuelles via un flux traçable en pull request.
- **FR38:** Le système peut produire des rapports exploitables sur la stabilité des tests (flakiness, durée, faux positifs) à chaque release.

## Non-Functional Requirements

### Performance

| NFR        | Cible                                                                                        | Mesure                                   |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **NFR-P1** | LCP < 2.5s sur la page d'accueil mobile en réseau 4G simulé (p75)                            | Lighthouse CI sur chaque release         |
| **NFR-P2** | INP < 200ms sur les interactions principales (navigation, CTA, formulaire) en p75            | Web Vitals terrain + audits synthétiques |
| **NFR-P3** | CLS < 0.1 sur toutes les pages publiques                                                     | Lighthouse CI + monitoring continu       |
| **NFR-P4** | TTFB ≤ 800ms pour 95% des requêtes depuis le Québec sur pages publiques                      | Monitoring applicatif mensuel            |
| **NFR-P5** | 100% des images de contenu livrées en format optimisé et dimensionnées au viewport           | Audit build mensuel + revue Lighthouse   |
| **NFR-P6** | 100% des routes non critiques chargées à la demande et bundle initial JS ≤ 250KB gzip (home) | Analyse bundle par release               |

### Sécurité & Conformité

| NFR        | Cible                                                                                                   | Mesure                                 |
| ---------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **NFR-S1** | 100% des connexions web sont chiffrées avec HTTPS en production                                         | Vérification automatique quotidienne   |
| **NFR-S2** | 0 conservation applicative des messages de contact sur le serveur applicatif                            | Audit code trimestriel                 |
| **NFR-S3** | 100% des entrées utilisateur sont validées et assainies avant traitement                                | Tests automatisés de sécurité          |
| **NFR-S4** | Les protections anti-spam maintiennent un taux d'abus < 2% des soumissions mensuelles                   | Journal d'événements + revue mensuelle |
| **NFR-S5** | 0 cookie non essentiel actif sans consentement explicite                                                | Audit navigateur mensuel               |
| **NFR-S6** | Politique de confidentialité publiée, versionnée et revue au minimum 1 fois par an                      | Revue conformité annuelle              |
| **NFR-S7** | Responsable des renseignements personnels nommé avec coordonnées validées tous les 90 jours sur le site | Vérification éditoriale trimestrielle  |

### Accessibilité

| NFR        | Cible                                                                                     | Mesure                                          |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **NFR-A1** | 0 violation critique WCAG 2.1 AA sur pages clés (home, accompagnement, contact, à propos) | Audits automatisés + revue manuelle par release |
| **NFR-A2** | 100% des textes et composants interactifs respectent les ratios de contraste AA           | Vérification design systématique                |
| **NFR-A3** | 100% des cibles tactiles interactives font au minimum 44×44px sur mobile                  | Inspection CSS automatisée                      |
| **NFR-A4** | 100% des parcours critiques sont réalisables au clavier avec focus visible                | Tests manuels mensuels                          |
| **NFR-A5** | 100% des animations non essentielles sont réduites ou désactivées avec préférence active  | Test navigateur sur chaque release              |
| **NFR-A6** | Attribut `lang="fr-CA"` présent sur 100% des pages publiques                              | Inspection DOM automatisée                      |

### Fiabilité

| NFR        | Cible                                                                                                    | Mesure                                    |
| ---------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **NFR-F1** | Disponibilité mensuelle ≥ 99.0% sur les pages publiques                                                  | Monitoring de disponibilité 24/7          |
| **NFR-F2** | En cas d'échec d'envoi de confirmation, alerte générée en ≤ 5 minutes et procédure de reprise déclenchée | Journal d'erreurs + alerte opérationnelle |
| **NFR-F3** | Déploiement production avec interruption perçue ≤ 60 secondes pour 95% des releases                      | Rapport de déploiement mensuel            |
| **NFR-F4** | Endpoint `/health` répond en < 500ms pour 95% des checks et retourne un statut exploitable               | Supervision HTTP continue                 |

### Qualité de la Plateforme de Test

| NFR        | Cible                                                                                    | Mesure                               |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| **NFR-T1** | Taux de flakiness ≤ 2% sur les suites critiques pendant 3 sprints consécutifs           | Historique CI et analyse des reruns  |
| **NFR-T2** | Temps médian de feedback des checks obligatoires sur PR ≤ 12 minutes                    | Mesure automatisée des workflows CI  |
| **NFR-T3** | ≤ 5% des échecs visuels sur PR sont classés comme faux positifs après triage mensuel    | Journal de triage des régressions    |
| **NFR-T4** | 100% des exécutions visuelles critiques utilisent un environnement de rendu déterministe | Configuration CI auditée par release |

## Appendix - LLM Spec Pack

### Scope

Ce pack formalise les exigences critiques de l'Epic 2 pour faciliter l'exécution agentique (planification, implémentation, QA) avec un format stable.

### Requirement Specs

#### FR34

- `id`: FR34
- `intent`: Appliquer une pyramide de test documentée couvrant unit, integration, component, end-to-end et visual regression.
- `acceptance`:
  - La documentation de stratégie de test couvre les 5 niveaux.
  - Chaque niveau a une responsabilité explicite et non redondante.
- `telemetry`:
  - Couverture des niveaux de test par release.
  - Taux d'échecs par niveau.
- `risk`: Sur-couverture redondante ou angles morts entre niveaux.
- `dependencies`: FR31, FR36, NFR-T1, NFR-T2

#### FR35

- `id`: FR35
- `intent`: Exécuter des vérifications visuelles en CI sans dépendance obligatoire à un fournisseur unique.
- `acceptance`:
  - La CI exécute les checks visuels sur les parcours critiques.
  - Le workflow reste opérable en cas de changement d'outil visuel.
- `telemetry`:
  - Taux d'échecs visuels par PR.
  - Volume de faux positifs visuels.
- `risk`: Couplage excessif à un outil ou bruit élevé de régression visuelle.
- `dependencies`: NFR-T3, NFR-T4

#### FR36

- `id`: FR36
- `intent`: Empêcher le merge si les quality gates de stratégie de test échouent.
- `acceptance`:
  - Les checks requis sont bloquants en PR.
  - Les règles de merge sont appliquées systématiquement.
- `telemetry`:
  - Taux de blocage PR par type de gate.
  - Délai moyen de résolution des échecs.
- `risk`: Contournement des gates ou règles incohérentes entre workflows.
- `dependencies`: FR31, NFR-T2

#### FR37

- `id`: FR37
- `intent`: Mettre à jour et approuver les baselines visuelles via un flux PR traçable.
- `acceptance`:
  - Toute mise à jour de baseline est liée à une PR.
  - L'approbation est explicite avant merge.
- `telemetry`:
  - Nombre de mises à jour baseline par sprint.
  - Temps médian de revue baseline.
- `risk`: Drift de baseline non contrôlé ou approbation implicite.
- `dependencies`: FR35, FR36, NFR-T3

#### FR38

- `id`: FR38
- `intent`: Produire des rapports exploitables sur la stabilité des tests à chaque release.
- `acceptance`:
  - Rapport release incluant flakiness, durée, faux positifs.
  - Les métriques sont comparables release à release.
- `telemetry`:
  - Flakiness trend.
  - Durée médiane des checks obligatoires.
  - Ratio faux positifs visuels.
- `risk`: Données incomplètes ou non comparables dans le temps.
- `dependencies`: NFR-T1, NFR-T2, NFR-T3

#### NFR-T1

- `id`: NFR-T1
- `intent`: Maintenir un taux de flakiness ≤ 2% sur suites critiques pendant 3 sprints.
- `acceptance`:
  - Seuil ≤ 2% respecté sur fenêtre glissante 3 sprints.
- `telemetry`:
  - Reruns / runs totaux (suites critiques).
- `risk`: Instabilité chronique des pipelines de test.
- `dependencies`: FR34, FR38

#### NFR-T2

- `id`: NFR-T2
- `intent`: Garder un temps médian de feedback des checks obligatoires ≤ 12 minutes sur PR.
- `acceptance`:
  - Médiane ≤ 12 minutes sur période mensuelle.
- `telemetry`:
  - Durée des workflows obligatoires par PR.
- `risk`: Boucle feedback trop lente, baisse de productivité.
- `dependencies`: FR36, FR38

#### NFR-T3

- `id`: NFR-T3
- `intent`: Maintenir ≤ 5% de faux positifs visuels après triage mensuel.
- `acceptance`:
  - Ratio faux positifs ≤ 5% par cycle de triage.
- `telemetry`:
  - Journal de triage des régressions visuelles.
- `risk`: Perte de confiance dans les checks visuels.
- `dependencies`: FR35, FR37, FR38

#### NFR-T4

- `id`: NFR-T4
- `intent`: Garantir un environnement de rendu déterministe pour 100% des exécutions visuelles critiques.
- `acceptance`:
  - Tous les jobs visuels critiques exécutent un environnement verrouillé et reproductible.
- `telemetry`:
  - Audit de configuration CI par release.
- `risk`: Faux écarts causés par dérive d'environnement.
- `dependencies`: FR35
