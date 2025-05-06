 Supabase Notes Backend

A minimal backend for personal notes using Supabase Edge Functions.

--------------------------------------------------------------------

 Schema Design

Why?
- `uuid` ensures secure, unique identifiers.
- `title` is required; `content` is optional.
- `created_at` and `updated_at` make it easy to sort and audit notes.

------------------------------------------------------------------------------
 API Endpoints

 `POST /notes`
- Why: POST is used to create a new note.
- Reads from: Request body.

 `GET /notes`
- Why: GET is used to retrieve notes.
- Reads from: Authorization header (user context).

-------------------------------------------------------------

Setup & Deployment

1. Create a Supabase project.
2. Enable Edge Functions in your Supabase dashboard.
3. Clone this repo and deploy functions:
   ```bash
   supabase login
   supabase functions deploy post_notes
   supabase functions deploy get_notes
   ```
4. Add environment variables via Supabase dashboard or CLI:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

-----------------------------------------------------------------------

 Demo
 
 Create a Note

```bash
curl -X POST https://<project>.functions.supabase.co/post_notes \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note", "content":"This is a test."}'
```

Expected Response:
```json
{
  "data": [
    {
      "id": "generated-id",
      "user_id": "user-id",
      "title": "Test Note",
      "content": "This is a test.",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "error": null
}
```

---

List Notes

```bash
curl -X GET https://<project>.functions.supabase.co/get_notes \
  -H "Authorization: Bearer <your-access-token>"
```

Expected Response:
```json
{
  "data": [
    {
      "id": "note-id",
      "user_id": "user-id",
      "title": "Test Note",
      "content": "This is a test.",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "error": null
}
```

---

Project Structure

```
supabase-notes-backend/
├── functions/
│   ├── get_notes.ts
│   └── post_notes.ts
├── schema.sql
├── README.md
└── .env.example
```

---

## 👤 Author

[Pranshu](https://github.com/pranshu210599)
