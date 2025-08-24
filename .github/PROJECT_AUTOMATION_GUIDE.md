# Guide d'Automatisation du GitHub Project Board

Ce guide explique comment configurer et utiliser l'automatisation pour le projet Shooting Star.

## 🏗️ Configuration Initiale

### 1. Exécuter le Script de Configuration des Labels

```bash
# Depuis la racine du projet
./.github/scripts/setup-labels.sh
```

Ce script créera automatiquement tous les labels nécessaires pour l'automatisation.

### 2. Configuration du Project Board

Dans GitHub, configurez votre project board avec les colonnes suivantes (dans cet ordre) :

1. **Backlog** - Nouvelles issues en attente de priorisation
2. **À Faire** - Issues priorisées et assignées
3. **En Cours** - Développement actif
4. **Review** - Code review en cours
5. **Testing** - Tests et validation
6. **Done** - Terminé et déployé
7. **Released** - Publié en production

### 3. Configuration des Branches de Protection

Dans Settings > Branches, configurez la protection de la branche `main` :

- ✅ Require a pull request before merging
- ✅ Require approvals (1 minimum)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging

Status checks requis :
- `Code Quality Check`
- `Security Scan`
- `Performance Check`

## 🔄 Flux d'Automatisation

### Transitions Automatiques

#### Backlog → À Faire
**Déclencheurs :**
- Issue assignée à quelqu'un
- Label `priority/high` ou `priority/critical` ajouté
- Issue ajoutée à un milestone

**Actions automatiques :**
- Déplacement vers "À Faire"
- Ajout du label `status/ready`
- Commentaire de confirmation

#### À Faire → En Cours
**Déclencheurs :**
- Création d'une branche avec le numéro de l'issue
- Ouverture d'une PR liée à l'issue
- Commit référençant l'issue

**Actions automatiques :**
- Déplacement vers "En Cours"
- Ajout du label `status/in-development`
- Suppression du label `status/ready`

#### En Cours → Review
**Déclencheurs :**
- PR marquée "Ready for review"
- PR draft convertie en PR normale

**Actions automatiques :**
- Déplacement vers "Review"
- Ajout du label `status/needs-review`
- Demande de reviewers automatique

#### Review → Testing
**Déclencheurs :**
- PR approuvée par au moins 1 reviewer
- Tous les checks CI passent au vert

**Conditions requises :**
- Aucun "Changes requested" actif
- Pas de conflits de merge
- Toutes les vérifications qualité réussies

**Actions automatiques :**
- Déplacement vers "Testing"
- Ajout du label `status/ready-for-testing`
- Commentaire avec instructions de test

#### Testing → Done
**Déclencheurs :**
- PR mergée avec succès
- Déploiement staging réussi

**Actions automatiques :**
- Déplacement vers "Done"
- Fermeture de l'issue liée
- Ajout du label `status/completed`

#### Done → Released
**Déclencheurs :**
- Publication d'une release
- Déploiement production réussi

**Actions automatiques :**
- Déplacement vers "Released"
- Ajout du label `status/released`
- Mise à jour des notes de release

## 🏷️ Système de Labels

### Labels de Priorité
- `priority/low` - Priorité basse
- `priority/medium` - Priorité moyenne  
- `priority/high` - Priorité haute
- `priority/critical` - Priorité critique (déplacement automatique vers À Faire)

### Labels de Type
- `type/bug` - Correction de bug
- `type/feature` - Nouvelle fonctionnalité
- `type/enhancement` - Amélioration existante
- `type/documentation` - Documentation

### Labels de Statut (gérés automatiquement)
- `status/triage` - Nécessite un triage
- `status/ready` - Prêt pour développement
- `status/in-development` - En développement
- `status/needs-review` - Attend une review
- `status/ready-for-testing` - Prêt pour test
- `status/completed` - Terminé
- `status/released` - Publié

### Labels Spéciaux
- `hotfix` - Correctif critique (bypass certaines étapes)
- `emergency` - Urgence (attention immédiate requise)
- `manual-control` - Désactive l'automatisation
- `good-first-issue` - Bon pour débutants

## 🛡️ Quality Gates

### Vérifications Obligatoires (Bloquantes)
1. **Type checking** - `npm run typecheck`
2. **Build** - `npm run build`
3. **Security audit** - Vérification des dépendances
4. **Fichiers sensibles** - Détection de secrets

### Vérifications Optionnelles (Non-bloquantes)
1. **Performance** - Taille du bundle
2. **Accessibilité** - Tests axe-core
3. **Linting** - Qualité du code

## 🚀 Déploiements Automatiques

### Staging
- **Déclencheur :** Push sur `main`
- **Environnement :** Staging
- **Actions :** Build + déploiement automatique

### Production
- **Déclencheur :** Publication d'une release
- **Environnement :** Production
- **Actions :** Build + déploiement + health checks

## 📊 Métriques Trackées

- **Cycle Time** - Temps de À Faire à Done
- **Lead Time** - Temps de Backlog à Released
- **Review Time** - Temps passé en Review
- **Deployment Frequency** - Fréquence des déploiements
- **Failure Rate** - Taux d'échec des déploiements

## 🔧 Utilisation Quotidienne

### Pour les Issues
1. **Créer une issue** → Automatiquement ajoutée au Backlog avec label `status/triage`
2. **Assigner et prioriser** → Déplacée automatiquement vers À Faire
3. **Commencer le travail** → Créer une branche → Déplacée vers En Cours
4. **Ouvrir une PR** → Déplacée vers Review
5. **Merger** → Déplacée vers Done

### Pour les Pull Requests
1. **Ouvrir en draft** → Reste En Cours
2. **Marquer "Ready for review"** → Déplacée vers Review
3. **Approuver + CI vert** → Déplacée vers Testing
4. **Merger** → Déplacée vers Done

### Commandes Utiles

```bash
# Créer une issue avec labels appropriés
gh issue create --title "Fix login bug" --body "Description..." --label "type/bug,priority/high"

# Créer une branche liée à une issue
git checkout -b fix-issue-123

# Créer une PR liée à une issue
gh pr create --title "Fix issue #123" --body "Fixes #123"
```

## 🚨 Situations d'Urgence

### Hotfixes
1. Ajouter le label `hotfix` à l'issue
2. Cela bypass certaines vérifications
3. Nécessite l'approbation du repository owner

### Désactiver l'Automatisation
- Ajouter le label `manual-control` pour désactiver l'automatisation sur un item spécifique

## 📝 Bonnes Pratiques

1. **Toujours lier les PRs aux issues** avec "Fixes #123"
2. **Utiliser des titres descriptifs** pour issues et PRs
3. **Ajouter les labels appropriés** lors de la création
4. **Respecter les conventions de nommage** pour les branches
5. **Faire des reviews constructives** et complètes
6. **Tester localement** avant de marquer ready for review

## 🔍 Dépannage

### Issue Bloquée dans une Colonne
1. Vérifier les labels appliqués
2. Vérifier les conditions requises
3. Consulter les logs des GitHub Actions
4. Utiliser le label `manual-control` si nécessaire

### Automation Ne Fonctionne Pas
1. Vérifier les permissions GitHub Actions
2. Vérifier la configuration du Project Board
3. Consulter les logs des workflows
4. Vérifier la syntaxe des fichiers YAML

### Support
Pour toute question ou problème, ouvrir une issue avec le label `type/question`.