# Guide de Coordination des Agents pour GitHub Issues

Ce document définit les protocoles de travail collaboratif entre les agents spécialisés pour traiter efficacement les GitHub issues.

## 🎯 Principes Fondamentaux

- **Un seul agent leader** par issue à tout moment
- **Handoffs explicites** entre agents avec documentation
- **Validation croisée** pour les changements critiques
- **Communication transparente** via les commentaires GitHub

## 🌿 Git Workflow (OBLIGATOIRE)

**⚠️ RÈGLES ABSOLUES - AUCUNE EXCEPTION**

### Branching Practices
- **JAMAIS de travail direct sur `main`** - la branche principale est protégée
- **Toujours créer une feature branch** pour chaque GitHub issue
- **Une branche = une issue** - pas de mélange de fonctionnalités

### Conventions de Nommage des Branches
```
feature/issue-[numéro]-[description-courte]
bugfix/issue-[numéro]-[description-courte]  
hotfix/issue-[numéro]-[description-courte]
```

**Exemples**:
- `feature/issue-123-add-yoga-booking-form`
- `bugfix/issue-456-fix-mobile-navigation`
- `hotfix/issue-789-security-vulnerability-patch`

### Workflow Standard
1. **Créer la branche** à partir de `main` mise à jour
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/issue-123-description
   ```

2. **Développer** sur la feature branch
   - Commits atomiques avec messages descriptifs
   - Référencer l'issue dans les commits: `#123`

3. **Pull Request obligatoire**
   - Jamais de merge direct
   - Title: `[Issue #123] Description claire`
   - Lier la PR à l'issue GitHub
   - Reviews requises selon la matrice de validation

4. **Merge et nettoyage**
   - Merge via GitHub après approbation
   - **Suppression immédiate** de la feature branch
   - Mise à jour des labels et clôture de l'issue

### Responsabilités par Agent
- **General-Purpose**: Création des branches, commits réguliers
- **Technical Lead**: Review des PRs critiques, merge final
- **Project Manager**: Suivi des branches orphelines, nettoyage
- **Tous les agents**: Respect absolu des règles de branching

## 👥 Rôles des Agents Spécialisés

### 🔧 General-Purpose Agent
- **Responsabilités**: Analyse initiale, coordination générale, recherche de code
- **Handoff vers**: Agents spécialisés selon le type d'issue
- **Validation**: Code reviews basiques, tests de fonctionnement

### 🏗️ Technical Lead
- **Responsabilités**: Décisions architecturales, revues de code complexes, stratégie technique
- **Handoff depuis**: General-purpose pour les issues architecturales
- **Validation**: Architecture, performance, sécurité, standards d'équipe

### 🎨 UI/UX Designer  
- **Responsabilités**: Design d'interfaces, expérience utilisateur, accessibilité
- **Handoff depuis**: General-purpose pour les issues UI/UX
- **Validation**: Guidelines design, responsive, accessibilité WCAG

### 📋 Project Manager
- **Responsabilités**: Planification, suivi des délais, coordination équipe
- **Handoff depuis**: N'importe quel agent pour les blocages ou coordination
- **Validation**: Timeline, dépendances, livraison

### 🔒 Security Advisor
- **Responsabilités**: Analyses sécuritaire, vulnérabilités, bonnes pratiques
- **Handoff depuis**: N'importe quel agent pour les aspects sécuritaires
- **Validation**: Audits sécurité, conformité, tests de pénétration

## 🔄 Workflow Standard par Type d'Issue

### 🐛 Bug Report
1. **General-Purpose**: Reproduction du bug, analyse initiale
2. **Technical Lead**: Si bug complexe ou architectural
3. **Security Advisor**: Si implications sécuritaires
4. **General-Purpose**: Implémentation du fix
5. **Technical Lead**: Code review finale

### ✨ Feature Request
1. **General-Purpose**: Analyse des besoins
2. **UI/UX Designer**: Si interface utilisateur requise
3. **Technical Lead**: Design technique et architecture
4. **General-Purpose**: Implémentation
5. **UI/UX Designer**: Validation design finale
6. **Technical Lead**: Code review et validation

### 🔧 Technical Debt
1. **Technical Lead**: Évaluation et priorisation
2. **Project Manager**: Planification et impact
3. **General-Purpose**: Implémentation des améliorations
4. **Technical Lead**: Validation technique finale

### 🔒 Security Issue  
1. **Security Advisor**: Analyse approfondie et évaluation des risques
2. **Technical Lead**: Design de la solution sécurisée
3. **General-Purpose**: Implémentation
4. **Security Advisor**: Audit de sécurité finale

## 📝 Templates de Communication

### Handoff entre Agents
```markdown
## 🔄 Handoff vers @[Agent-Type]

**Contexte**: [Résumé de ce qui a été fait]
**Besoin**: [Ce qui est attendu du prochain agent]
**Contraintes**: [Limitations ou requirements spéciaux]
**Artefacts**: [Liens vers code, designs, docs pertinents]

**État actuel**: 
- [ ] Analyse terminée
- [ ] Décisions prises
- [ ] Implémentation partielle
- [ ] Tests requis

/cc @[next-agent]
```

### Validation et Approbation
```markdown
## ✅ Validation [Agent-Type]

**Critères validés**:
- [ ] Fonctionnalité
- [ ] Performance  
- [ ] Sécurité
- [ ] Standards de code
- [ ] Tests passés
- [ ] Documentation à jour

**Notes**: [Commentaires spécifiques]

**Status**: ✅ APPROUVÉ / ⚠️ AVEC RÉSERVES / ❌ REFUSÉ
```

## 🚦 Protocoles de Décision

### Décisions Critiques (Architecture, Sécurité)
- Requiert validation du **Technical Lead** ET **Security Advisor**
- Documentation obligatoire dans l'issue
- Timeline de 24h minimum pour review

### Décisions Design
- **UI/UX Designer** a autorité finale sur l'interface
- Validation croisée avec **Technical Lead** pour faisabilité

### Conflits entre Agents
1. Discussion ouverte dans l'issue
2. Si pas de consensus → escalade vers **Project Manager**
3. Décision finale documentée avec rationale

## 📊 Métriques de Qualité

### KPIs par Agent
- **General-Purpose**: Temps de résolution, qualité du code
- **Technical Lead**: Respect architecture, performance
- **UI/UX Designer**: Score accessibilité, satisfaction utilisateur  
- **Project Manager**: Respect des délais, coordination
- **Security Advisor**: Zéro vulnérabilité critique

### Reviews Obligatoires
- [ ] Code review par **Technical Lead** (si changements > 100 lignes)
- [ ] Security review par **Security Advisor** (si données sensibles)
- [ ] UX review par **UI/UX Designer** (si changements UI)

## 🔧 Outils et Intégrations

### Labels GitHub Standards
- `agent:general-purpose`
- `agent:technical-lead`  
- `agent:ui-ux-designer`
- `agent:project-manager`
- `agent:security-advisor`
- `status:handoff-pending`
- `status:validation-required`

### Automatisations
- Auto-assignment selon les labels
- Notifications de handoff
- Checklist de validation automatique
- Reports de métriques hebdomadaires

## 📚 Bonnes Pratiques

### Communication
- Toujours taguer le prochain agent dans les handoffs
- Utiliser les templates pour la consistance
- Documenter toutes les décisions importantes
- Mettre à jour les labels GitHub appropriés

### Qualité
- Tests obligatoires avant validation finale
- Code review croisé pour changements critiques
- Documentation mise à jour en parallèle du code
- Rollback plan pour les features majeures

### Efficacité  
- Paralléliser quand possible (design + développement)
- Anticiper les besoins des autres agents
- Utiliser les templates pour accélérer
- Maintenir une communication proactive

---

*Ce document est vivant et doit être mis à jour selon l'évolution de l'équipe et des processus.*