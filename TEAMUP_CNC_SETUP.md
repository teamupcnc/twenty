# TeamUp CNC Twenty Setup

This fork is prepared to host Twenty for TeamUp CNC on Render.

## What This Setup Is For

Use Twenty as the CRM system of record for:

- student contacts
- follow-up tasks
- notes and history
- pipeline views
- email workflows

Keep Pinnacle for:

- intake
- intent scoring
- source processing
- operator workflows

## Files Added For This Fork

- [render.yaml](/home/teamupcnc/Desktop/twenty/render.yaml)
- [render/server.Dockerfile](/home/teamupcnc/Desktop/twenty/render/server.Dockerfile)
- [render/worker.Dockerfile](/home/teamupcnc/Desktop/twenty/render/worker.Dockerfile)

## Render Architecture

This setup creates:

1. `teamup-twenty-server`
2. `teamup-twenty-worker`
3. `teamup-twenty-db`
4. `teamup-twenty-redis`

## Deploy Steps

1. Fork this repo to your GitHub.
2. In Render, create a new Blueprint from the fork.
3. During setup, provide `SERVER_URL` as your Render app URL.
4. Let Render create the web service, worker, Postgres, and Key Value instances.
5. Open the Twenty app and complete workspace setup.

## Important Notes

- This starter uses the official `twentycrm/twenty:latest` image through thin Docker wrappers.
- It is intentionally simpler than building the whole monorepo on Render.
- `STORAGE_TYPE=local` is acceptable for first setup, but file-heavy workflows should move to object storage later.
- If you want Gmail sending inside Twenty, configure it in Twenty after deploy.

## TeamUp CNC Data Flow

Recommended flow:

1. Collect and score leads in Pinnacle.
2. Export students from Pinnacle:
   `python launcher.py export-twenty-people`
3. Import that CSV into Twenty `People`.
4. Manage ongoing relationship history and follow-up in Twenty.

## Recommended Custom Fields In Twenty

Create these on the `People` object before importing:

- `Lead Source`
- `Student Status`
- `Student Priority`
- `Follow Up Date`
- `Intent Score`
- `Preferred Contact Method`
- `Consent Status`
- `Next Outreach Step`
- `Pinnacle Notes`
- `Latest Signal`
