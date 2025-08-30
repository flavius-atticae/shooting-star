# Test PR Status Automation

Ce fichier sert à tester l'automation des statuts lors de l'ouverture d'une PR.

## Test Case
- PR liée à l'issue #38
- Doit automatiquement changer le statut de l'issue à `status/needs-review`
- Doit déplacer l'issue vers la colonne "Review" dans le projet

## Expected Behavior
1. Issue #38 passe de `status/in-development` à `status/needs-review`
2. Colonne du projet passe de "En Cours" à "Review"
3. Labels conflictuels supprimés automatiquement