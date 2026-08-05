# Cursor → GitHub → Vercel

## 1. Open in Cursor

Unzip the package and open the `capital-constitution` folder.

## 2. Verify

```bash
node scripts/check.mjs
python3 -m http.server 3000
```

Open `http://localhost:3000`.

## 3. Create GitHub repository

```bash
git init
git add .
git commit -m "Launch CAPITAL//CONSTITUTION"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## 4. Import into Vercel

- New Project
- Import the GitHub repository
- Framework preset: Other
- Root directory: repository root
- Build command: leave empty
- Output directory: leave empty

## 5. Environment variables

```text
OPENAI_API_KEY
OPENAI_MODEL=gpt-5
ELEVENLABS_API_KEY
ELEVENLABS_VOICE_ID
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

## 6. Recommended public identity

Project name:

```text
capital-constitution-authority
```

Primary route:

```text
/institution/meridian/command
```

The final Vercel URL will depend on project-name availability and your Vercel account/team namespace.
