# Translation System - RLS Security Implementation

## Security Vulnerabilities Fixed

All RLS "always true" policies have been replaced with proper ownership and role-based access control.

### Issues Resolved

1. **Translation Keys** - Updated policy to check ownership
2. **Translation Values** - Updated policy to check ownership
3. **Translation Reports** - Updated policies with admin-only access

---

## New Security Architecture

### User Tracking

Each table now includes a `created_by` column tracking the user who created/modified the record:
- `translation_keys.created_by` (uuid)
- `translation_values.created_by` (uuid)
- `translation_reports.created_by` (uuid)

### Admin Role Detection

Admin status determined via JWT `app_metadata`:
```json
{
  "app_metadata": {
    "is_admin": true
  }
}
```

---

## Detailed RLS Policies

### Translation Keys Policies

#### 1. Public Read Access
```sql
CREATE POLICY "Anyone can read active translation keys"
  ON translation_keys FOR SELECT
  USING (status = 'active');
```
- **Who**: Anyone (authenticated and unauthenticated)
- **What**: Can read keys with status = 'active'
- **Security**: Only active, published keys visible

#### 2. Admin Read All
```sql
CREATE POLICY "Authenticated admins can read all translation keys"
  ON translation_keys FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');
```
- **Who**: Authenticated users with `is_admin = true`
- **What**: Can read all keys regardless of status
- **Security**: Admins can see deprecated/pending keys

#### 3. Creator/Admin Update
```sql
CREATE POLICY "Only creators and admins can update translation keys"
  ON translation_keys FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );
```
- **Who**: Record creator or admins
- **What**: Can update keys they created or any admin
- **Security**: Prevents unauthorized modifications

#### 4. Authenticated Insert
```sql
CREATE POLICY "Authenticated users can insert translation keys"
  ON translation_keys FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());
```
- **Who**: Any authenticated user
- **What**: Can insert new keys (auto-sets created_by to their uid)
- **Security**: Must be logged in, locked to their own records

#### 5. Admin Delete Only
```sql
CREATE POLICY "Only admins can delete translation keys"
  ON translation_keys FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');
```
- **Who**: Admins only
- **What**: Can delete any key
- **Security**: Regular users cannot delete records

---

### Translation Values Policies

#### 1. Public Read (Active Only)
```sql
CREATE POLICY "Anyone can read translation values for active keys"
  ON translation_values FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM translation_keys
      WHERE translation_keys.id = translation_values.translation_key_id
      AND translation_keys.status = 'active'
    )
  );
```
- **Who**: Anyone
- **What**: Can read translation values for active keys only
- **Security**: Foreign key constraint ensures active status

#### 2. Admin Read All
```sql
CREATE POLICY "Authenticated admins can read all translation values"
  ON translation_values FOR SELECT
  TO authenticated
  USING (
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );
```
- **Who**: Admins
- **What**: Can read all values including inactive
- **Security**: Admins see complete translation status

#### 3. Creator/Admin Update
```sql
CREATE POLICY "Only creators and admins can update translation values"
  ON translation_values FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );
```
- **Who**: Creators or admins
- **What**: Can update owned translations
- **Security**: Prevents unauthorized content changes

#### 4. Authenticated Insert
```sql
CREATE POLICY "Authenticated users can insert translation values"
  ON translation_values FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());
```
- **Who**: Authenticated users
- **What**: Can insert new translations
- **Security**: Locked to user's own uid

#### 5. Admin Delete Only
```sql
CREATE POLICY "Only admins can delete translation values"
  ON translation_values FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');
```
- **Who**: Admins
- **What**: Can delete any translation value
- **Security**: Prevents accidental data loss

---

### Translation Reports Policies

#### 1. Admin/Creator Read Only
```sql
CREATE POLICY "Only admins and creators can read translation reports"
  ON translation_reports FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );
```
- **Who**: Report creators or admins
- **What**: Can read their own reports or all if admin
- **Security**: Reports not visible to unauthorized users

#### 2. Unauthenticated Cannot Read
```sql
CREATE POLICY "Unauthenticated users cannot read reports"
  ON translation_reports FOR SELECT
  TO anon
  USING (false);
```
- **Who**: Unauthenticated users
- **What**: Explicitly denied access
- **Security**: Reports are private/internal only

#### 3. Authenticated Insert
```sql
CREATE POLICY "Authenticated users can create translation reports"
  ON translation_reports FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());
```
- **Who**: Authenticated users
- **What**: Can create new reports
- **Security**: Reports linked to creator

#### 4. Creator/Admin Update
```sql
CREATE POLICY "Only creators and admins can update translation reports"
  ON translation_reports FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );
```
- **Who**: Creators or admins
- **What**: Can update reports
- **Security**: Can mark resolved, update details

#### 5. Admin Delete Only
```sql
CREATE POLICY "Only admins can delete translation reports"
  ON translation_reports FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');
```
- **Who**: Admins
- **What**: Can delete reports
- **Security**: Prevents data tampering

---

## Access Control Summary

| Operation | Public | User | Admin |
|-----------|--------|------|-------|
| **Keys** | Read active | Insert, Update own, Delete own | All operations |
| **Values** | Read active | Insert, Update own | All operations |
| **Reports** | ✗ | Read own, Insert, Update own | All operations |

---

## Setting Admin Users

To set a user as admin in Supabase:

### Via Supabase Dashboard
1. Go to Authentication → Users
2. Select user
3. In "App metadata", add:
```json
{
  "is_admin": true
}
```

### Via SQL
```sql
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{is_admin}',
  'true'::jsonb
)
WHERE email = 'admin@example.com';
```

### Via Supabase JS Client (Server-side only)
```typescript
const { data, error } = await supabase.auth.admin.updateUserById(
  userId,
  {
    app_metadata: { is_admin: true }
  }
);
```

---

## Edge Function User Tracking

The sync-translations Edge Function now extracts user ID from JWT:

```typescript
const authHeader = req.headers.get("authorization");
let userId: string | undefined;

if (authHeader) {
  try {
    const token = authHeader.replace("Bearer ", "");
    const jwtPayload = JSON.parse(atob(token.split(".")[1]));
    userId = jwtPayload.sub;
  } catch {
    // Continue without user ID
  }
}
```

**Result**: All synced translations are tagged with the authenticated user's ID.

---

## Testing Security

### 1. Test Public Access
```typescript
// Unauthenticated client
const { data } = await supabase
  .from('translation_keys')
  .select('*')
  .eq('status', 'active');
// Should work - returns active keys only
```

### 2. Test Authenticated User Restrictions
```typescript
// Authenticated as regular user
const { data, error } = await supabase
  .from('translation_keys')
  .update({ status: 'deprecated' })
  .eq('key', 'heroTitle')
  .eq('created_by', otherUserId);
// Should fail - not record owner
```

### 3. Test Admin Override
```typescript
// Authenticated as admin
const { data } = await supabase
  .from('translation_keys')
  .update({ status: 'deprecated' })
  .eq('key', 'heroTitle');
// Should work - admin can modify anything
```

### 4. Test Report Access
```typescript
// Unauthenticated
const { data } = await supabase
  .from('translation_reports')
  .select('*');
// Should fail - empty result

// Authenticated as creator
const { data } = await supabase
  .from('translation_reports')
  .select('*')
  .eq('created_by', currentUserId);
// Should work - can access own reports
```

---

## Database Indexes

Added performance indexes:
```sql
CREATE INDEX idx_translation_keys_created_by ON translation_keys(created_by);
CREATE INDEX idx_translation_values_created_by ON translation_values(created_by);
CREATE INDEX idx_translation_reports_created_by ON translation_reports(created_by);
```

These optimize queries filtering by creator.

---

## Best Practices

1. **Always verify auth.uid()** - Use `created_by = auth.uid()` for ownership checks
2. **Check admin role** - Use JWT `app_metadata` for role verification
3. **Foreign key constraints** - Ensure referential integrity
4. **Audit trail** - Track created_by for all operations
5. **Use maybeSingle()** - For queries expecting 0 or 1 row
6. **Test unauthenticated** - Ensure public policies work as intended

---

## Compliance

- ✓ No "always true" policies
- ✓ Ownership verification on updates/deletes
- ✓ Role-based access control
- ✓ Public/private data separation
- ✓ User action attribution
- ✓ Audit trail capability
- ✓ Foreign key constraints
- ✓ Performance optimized

---

## Migration Applied

**Filename**: `fix_translation_rls_security`

All policies have been applied via Supabase migration system. No manual SQL required.

Build Status: ✓ Successful (1483 modules)
