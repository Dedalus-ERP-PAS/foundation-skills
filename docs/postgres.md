# postgres

Requêtes SQL lecture seule sur PostgreSQL.

## Commandes

```bash
# Lister les bases configurées
python3 scripts/query.py --list

# Exécuter une requête
python3 scripts/query.py --db production --query "SELECT * FROM users LIMIT 10"

# Voir le schéma
python3 scripts/query.py --db production --schema
```

## Configuration

Créer `connections.json` à partir de `connections.example.json` :

```json
{
  "production": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb",
    "user": "readonly_user",
    "password": "secret"
  }
}
```

**Important :** Protéger le fichier avec `chmod 600 connections.json`.

## Sécurité

- Requêtes en lecture seule uniquement
- Pas de modifications de données
- Utiliser un utilisateur avec permissions limitées
