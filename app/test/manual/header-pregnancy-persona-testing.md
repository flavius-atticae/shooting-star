# Manuel de Tests - Composant Header avec Personas de Grossesse

## Vue d'ensemble

Ce document fournit un guide complet pour tester manuellement le composant Header avec des scénarios spécifiques aux utilisatrices enceintes et nouvelles mamans du Québec. 

Les tests sont organisés par persona pour refléter les différents besoins et défis rencontrés pendant la grossesse.

---

## 🎯 Objectifs des Tests Manuels

- **Validation de l'expérience utilisateur** pregnancy-safe
- **Vérification des patterns d'accessibilité** spécifiques à la grossesse
- **Tests de performance perçue** par des utilisatrices fatiguées
- **Validation culturelle** pour le marché québécois
- **Tests de stress** avec des conditions physiologiques simulées

---

## 👥 Personas de Test

### Marie Dubois - Première Grossesse
- **Profil** : 28 ans, première grossesse (20 semaines)
- **Localisation** : Montréal, QC
- **Langue** : Français (Québec)
- **Caractéristiques** : Anxieuse, prudente, recherche de réassurance
- **Appareils** : iPhone 12 Pro, iPad
- **Préférences** : Motion réduite activée, navigation lente et réfléchie

### Sophie Tremblay - Maman Expérimentée  
- **Profil** : 35 ans, 2 enfants, post-partum récent
- **Localisation** : Ville de Québec, QC  
- **Langue** : Français (bilingue)
- **Caractéristiques** : Efficace, pressée, multitâche
- **Appareils** : iPad Pro, iPhone
- **Préférences** : Contraste élevé, navigation rapide

### Alexandra Johnson - Grossesse à Risque
- **Profil** : 32 ans, grossesse à risque (28 semaines)
- **Localisation** : Montréal, QC
- **Langue** : Anglais (comprend français)
- **Caractéristiques** : Prudente, stress élevé, fatigue importante
- **Appareils** : MacBook Pro, iPhone
- **Préférences** : Accessibilité maximale, design rassurant

---

## 📱 Configuration de Test

### Appareils de Test Recommandés

**Mobile**
- iPhone SE (320px) - Taille minimum supportée
- iPhone 12 Pro (390px) - Standard de l'industrie  
- Pixel 5 (393px) - Android de référence

**Tablette**
- iPad Pro (768px) - Populaire chez les femmes enceintes
- iPad Mini (744px) - Plus portable pendant la grossesse

**Desktop**
- MacBook Pro 13" (1280px) - Standard professionnel
- Desktop 1440px (1440px) - Taille optimale
- Large Display (1920px) - Accessibilité visuelle

### Conditions de Test Spéciales

**Simulation de Fatigue de Grossesse**
- Utiliser des gants épais pour simuler les doigts enflés
- Réduire la précision des clics de 10-15%
- Ajouter des pauses de 2-3 secondes entre les interactions

**Simulation de Nausées Matinales**
- Éviter les mouvements rapides de souris
- Tester avec animations réduites
- Observer les réactions aux changements visuels brusques

---

## 🧪 Scénarios de Test par Persona

### Persona 1: Marie Dubois (Première Grossesse)

#### Scénario M1: Premier Contact avec le Site
**Objectif** : Évaluer le caractère rassurant du design

**Étapes** :
1. Naviguer vers `http://localhost:5173`
2. Observer la première impression (3 secondes)
3. Identifier le nom "Pauline Roussel" dans le header
4. Vérifier la couleur apaisante (vert #618462)

**Critères de Succès** :
- [ ] Header visible immédiatement
- [ ] Couleur vert calme/professionnelle perçue positivement
- [ ] Nom "Pauline Roussel" clairement identifiable
- [ ] Aucune animation agressive ou flashy
- [ ] Sensation générale de calme et professionnalisme

**Notes d'Observation** :
```
Réaction initiale : ___________________________
Couleurs perçues : ____________________________  
Niveau de stress (1-10) : _____________________
Commentaires : ________________________________
```

#### Scénario M2: Navigation Mobile Prudente
**Objectif** : Tester l'utilisation mobile avec anxiété

**Configuration** : iPhone 12 Pro, connexion lente simulée

**Étapes** :
1. Ouvrir le site sur mobile
2. Toucher délicatement le bouton menu (coin supérieur gauche)
3. Observer l'animation d'ouverture
4. Lire chaque item de navigation lentement
5. Toucher "Doula" puis observer le changement

**Critères de Succès** :
- [ ] Bouton menu facilement identifiable et touchable
- [ ] Animation douce et non nauséabonde (≤200ms)
- [ ] Texte français clair et rassurant
- [ ] Descriptions aident à comprendre les services
- [ ] Navigation réactive malgré la prudence

**Script de Test** :
```
"Je suis enceinte pour la première fois et je recherche 
des services de doula. Je ne suis pas très à l'aise 
avec la technologie et je veux être sûre de comprendre 
ce que propose Pauline."
```

#### Scénario M3: Recherche d'Information Rassurante
**Objectif** : Valider le contenu informatif et rassurant

**Étapes** :
1. Ouvrir menu mobile
2. Lire attentivement chaque description :
   - "Accompagnement de doula"
   - "Enseignement du yoga"  
   - "Le féminin sacré - ateliers variés"
   - "Pauline Roussel, Doula et professeure de Yoga"
3. Chercher des éléments rassurants
4. Tester le bouton "CONTACTEZ-MOI"

**Critères de Succès** :
- [ ] Descriptions claires et informatives en français québécois
- [ ] Langage professionnel mais chaleureux
- [ ] Bouton contact bien visible et accessible
- [ ] Aucun jargon médical anxiogène
- [ ] Informations suffisantes pour prendre une décision

### Persona 2: Sophie Tremblay (Maman Expérimentée)

#### Scénario S1: Navigation Efficace sur Tablette
**Objectif** : Tester la rapidité d'accès à l'information

**Configuration** : iPad Pro, mode paysage

**Étapes** :
1. Accéder au site rapidement
2. Utiliser le menu burger (pas de bouton desktop sur tablette)  
3. Naviguer directement vers "Yoga"
4. Retourner et tester "À propos"
5. Utiliser le bouton contact dans le menu

**Critères de Succès** :
- [ ] Menu burger visible et réactif sur tablette
- [ ] Navigation rapide sans attente
- [ ] Bouton contact accessible dans le menu mobile
- [ ] Layout adapté au format tablette
- [ ] Efficacité perçue élevée

**Timing Attendu** :
- Ouverture menu : <200ms
- Navigation entre sections : <100ms  
- Chargement pages : <1s

#### Scénario S2: Multitâche avec Enfants
**Objectif** : Tester la robustesse avec interruptions

**Configuration** : iPhone, interruptions simulées

**Étapes** :
1. Commencer à naviguer sur le site
2. **INTERRUPTION** : Lâcher le téléphone 10 secondes
3. Reprendre la navigation
4. Ouvrir le menu rapidement
5. **INTERRUPTION** : Toucher par erreur l'écran plusieurs fois
6. Reprendre et compléter la tâche

**Critères de Succès** :
- [ ] État préservé après interruption
- [ ] Pas de perte de contexte
- [ ] Robuste aux touches accidentelles
- [ ] Navigation reste fluide après perturbations
- [ ] Menu fonctionne correctement après erreurs

### Persona 3: Alexandra Johnson (Grossesse à Risque)

#### Scénario A1: Accessibilité Maximale sur Desktop
**Objectif** : Valider l'expérience accessibilité complète

**Configuration** : MacBook Pro, contraste élevé, motion réduite

**Étapes** :
1. Activer les préférences d'accessibilité système
2. Naviguer avec le clavier uniquement (Tab)
3. Utiliser le lecteur d'écran (VoiceOver)
4. Tester le zoom jusqu'à 200%
5. Vérifier tous les états de focus

**Critères de Succès** :
- [ ] Navigation clavier complète et logique
- [ ] Focus visible sur tous les éléments
- [ ] Lecteur d'écran lit correctement en français
- [ ] Contraste suffisant même en mode haute accessibilité
- [ ] Zoom n'interfère pas avec la fonctionnalité
- [ ] Aucune animation avec motion réduite

**Tests Clavier Spécifiques** :
```
Tab 1: _______ (élément focusé)
Tab 2: _______ (élément focusé)  
Tab 3: _______ (élément focusé)
Enter: _______ (action déclenchée)
Escape (si menu ouvert): _______ (résultat)
```

#### Scénario A2: Design Rassurant pour Stress Élevé
**Objectif** : Évaluer l'impact émotionnel du design

**Étapes** :
1. Observer le header avec un état d'esprit anxieux
2. Noter tous les éléments qui pourraient causer du stress
3. Vérifier l'absence de couleurs "médicales" (rouge)
4. Évaluer la stabilité visuelle (pas de changements brusques)
5. Tester les interactions hover très doucement

**Critères de Succès** :
- [ ] Couleurs apaisantes (vert, beige, pas de rouge)
- [ ] Aucun élément clignotant ou flash
- [ ] Animations très douces (<200ms)  
- [ ] Design stable et prévisible
- [ ] Feeling global de sécurité et professionnalisme

---

## 🔄 Tests de Robustesse Transversaux

### Test R1: Doigts Enflés (Toutes Personas)
**Objectif** : Valider les touch targets pour l'œdème de grossesse

**Méthode** : Utiliser des gants épais ou bout de doigt moins précis

**Éléments à Tester** :
- [ ] Logo "Pauline Roussel" (minimum 44x44px)
- [ ] Bouton menu burger (minimum 44x44px)  
- [ ] Bouton "CONTACTEZ-MOI" (minimum 48x48px recommandé)
- [ ] Liens de navigation dans le menu

**Critères** : Tous les éléments doivent être touchables avec 95% de réussite

### Test R2: Fatigue et Pregnancy Brain
**Objectif** : Simuler les défis cognitifs de la grossesse

**Méthode** : Ralentir délibérément, faire des pauses, simuler l'hésitation

**Scénario** :
1. Arriver sur le site et hésiter 5-10 secondes
2. Ouvrir le menu puis attendre 3 secondes avant de choisir
3. Fermer par erreur et rouvrir
4. Naviguer lentement en lisant tout

**Critères de Succès** :
- [ ] Aucun timeout ou perte d'état
- [ ] Interface reste compréhensible avec navigation lente
- [ ] Pas de frustration due à l'attente
- [ ] Récupération gracieuse des erreurs

### Test R3: Conditions de Réseau Difficiles
**Objectif** : Tester avec connexion lente (nausées matinales = pas sortir)

**Configuration** : Throttling réseau à 3G lent

**Tests** :
- [ ] Header apparaît rapidement même en 3G
- [ ] Fonctionnalité de base accessible avant chargement complet
- [ ] Pas de layout shift pendant le chargement
- [ ] Menu responsive même avec ressources partiellement chargées

---

## 📊 Grille d'Évaluation Globale

### Critères Pregnancy-Safe (Échelle 1-5)

| Critère | Marie | Sophie | Alexandra | Notes |
|---------|-------|--------|-----------|-------|
| **Toucher Facile** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Min 44px |
| **Lisibilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Contraste >4.5:1 |
| **Navigation Claire** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Français clair |
| **Pas de Nausée** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Animations <200ms |
| **Réassurance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Couleurs apaisantes |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | <2.5s LCP |

### Critères d'Accessibilité WCAG 2.1 AA

- [ ] **Contraste des couleurs** : Minimum 4.5:1
- [ ] **Touch targets** : Minimum 44x44px  
- [ ] **Navigation clavier** : 100% accessible
- [ ] **Lecteur d'écran** : Tout le contenu lisible
- [ ] **Zoom** : Fonctionnel jusqu'à 200%
- [ ] **Motion** : Respecte prefers-reduced-motion

### Critères Culturels Québécois  

- [ ] **Français en premier** : Tous les textes
- [ ] **Terminologie locale** : "Contactez" vs "Appelez"
- [ ] **Références culturelles** : Appropriées au contexte québécois
- [ ] **Sensibilité santé** : Évite le jargon médical anxiogène

---

## 🚨 Signaux d'Alerte à Surveiller

### Signaux Visuels
- ❌ **Clignotements** ou flashs
- ❌ **Couleurs médicales** (rouge vif, blanc hôpital)
- ❌ **Contrastes insuffisants**
- ❌ **Texte trop petit** (<16px)

### Signaux d'Interaction  
- ❌ **Boutons trop petits** (<44px)
- ❌ **Réponses lentes** (>300ms)
- ❌ **Erreurs fréquentes** de toucher
- ❌ **Navigation confuse**

### Signaux Emotionnels
- ❌ **Stress** ou anxiété lors de l'utilisation
- ❌ **Frustration** avec les interactions
- ❌ **Hésitation** excessive
- ❌ **Évitement** de certaines zones

---

## 📋 Protocole de Documentation des Tests

### Feuille de Test par Session

**Date** : ________________
**Testeur** : ______________  
**Persona** : ______________
**Appareil** : ______________
**Conditions spéciales** : _______________

### Observations Détaillées

**Performance Perçue** :
```
Temps de chargement ressenti : _____ secondes
Fluidité des animations : ⭐⭐⭐⭐⭐
Réactivité au touch : ⭐⭐⭐⭐⭐
```

**Expérience Émotionnelle** :
```
Première impression : _________________________
Niveau de confiance (1-10) : __________________  
Sentiment de sécurité : _______________________
Probabilité de retour : _______________________
```

**Problèmes Identifiés** :
```
Critique (bloquant) : _________________________
Majeur (gênant) : ____________________________
Mineur (amélioration) : ______________________
```

### Recommendations Post-Test

**Améliorations Immédiates** :
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

**Améliorations Futures** :
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

---

## 🎯 Métriques de Succès Target

### Quantitatives
- **Taux de réussite des tâches** : >95%
- **Temps moyen par tâche** : <30 secondes  
- **Taux d'erreur** : <5%
- **Score SUS (System Usability Scale)** : >80

### Qualitatives  
- **Sentiment de sécurité** : >8/10
- **Clarté du contenu** : >8/10
- **Facilité d'utilisation** : >8/10
- **Intention de retour** : >8/10

---

## 📞 Contacts et Ressources

**Lead QA** : [Nom du responsable QA]
**UX Designer** : [Nom du UX designer]  
**Tech Lead** : [Nom du tech lead]

**Ressources Utiles** :
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Pregnancy UX Guidelines](internal-link)
- [Quebec Accessibility Standards](internal-link)

---

*Ce document est un guide vivant et doit être mis à jour en fonction des retours utilisateurs et des évolutions du produit.*