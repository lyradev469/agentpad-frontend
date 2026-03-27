# Remote Key Manager Database Setup

## Overview
The backend uses SQLite for storing passkey credentials. This guide covers setup, schema, and migration.

## Schema

### `users` Table
```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### `passkeys` Table
```sql
CREATE TABLE passkeys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  credential_id TEXT UNIQUE NOT NULL,
  public_key TEXT NOT NULL,
  counter INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Migration History

### v1.0.0 (Initial)
- Created `users` and `passkeys` tables
- Added auto-increment primary keys
- Included timestamps for auditing

## Backup Strategy

### Automated backup (cron)
```bash
# Daily backup at 2 AM
0 2 * * * cp /path/to/passkeys.db /path/to/backup/passkeys_$(date +\%Y\%m\%d).db
```

### Manual backup
```bash
# Stop backend
# Copy database
cp passkeys.db passkeys.backup.db
# Start backend
```

##恢复 (Recovery)

If database is corrupted:
1. Stop the backend
2. Replace `passkeys.db` with backup
3. Restart backend
4. Verify with `GET /health`

## Production Considerations

### Database Encryption
For sensitive deployments, encrypt SQLite:
```bash
# Use SQLCipher
npm install sqlcipher
```

### Read Replicas
For high availability:
- Primary: Write operations
- Replica: Read operations
- Sync every 5 minutes

### Connection Pooling
SQLite is file-based, no pooling needed for <1000 req/min.

## Monitoring

### Key Metrics
- Total users: `SELECT COUNT(*) FROM users`
- Total passkeys: `SELECT COUNT(*) FROM passkeys`
- Last activity: `SELECT last_used FROM passkeys ORDER BY last_used DESC LIMIT 1`

### Alerts
Set up alerts for:
- Database growth > 1GB
- Failed writes > 5%
- Latency > 100ms

## Cleanup

### Remove stale passkeys (>1 year unused)
```sql
DELETE FROM passkeys 
WHERE last_used < datetime('now', '-1 year')
AND user_id NOT IN (
  SELECT user_id FROM users WHERE created_at > datetime('now', '-1 month')
)
```

### Archive deleted users
```sql
-- Before deleting, backup
CREATE TABLE users_archive AS 
SELECT * FROM users WHERE user_id = 'to-delete';
```

---

**Last Updated**: 2026-03-27  
**Version**: 1.0.0
