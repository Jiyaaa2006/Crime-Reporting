# SafeReport — Crime Reporting & Case Tracking

A simple website to report crimes and track case status, built with plain HTML/CSS/JS + Supabase (database & login) + Netlify (hosting) + GitHub (code storage & auto-deploy).

## Full Setup — GitHub + Supabase + Netlify

### 1. Supabase (database)
1. Go to supabase.com → New Project → wait for it to finish setting up
2. SQL Editor → New query → paste all of `supabase-setup.sql` → Run
3. Project Settings → API → copy **Project URL** and **anon public key**
4. Paste them into `js/supabase-config.js`

### 2. GitHub (store your code) — use GitHub Desktop, not browser upload
1. Download GitHub Desktop from desktop.github.com, install, sign in
2. File → Add Local Repository → choose this folder → "create a repository"
3. Confirm `css` and `js` show as folders in the left panel (not missing)
4. Write a commit message → Commit to main → Publish repository

### 3. Netlify (hosting, connected to GitHub)
1. netlify.com → Sign up with GitHub
2. Add new site → Import an existing project → Deploy with GitHub
3. Select your repo → leave build settings blank → Deploy site
4. You get a live URL like `random-name.netlify.app`

### 4. Make yourself admin
1. Sign up on your live site
2. Supabase → SQL Editor → run (with your real email):
```sql
update profiles set is_admin = true
where id = (select id from auth.users where email = 'your-email@example.com');
```
3. Visit `yoursite.netlify.app/admin.html` to manage all cases

## Making changes later
1. Edit files locally
2. GitHub Desktop → Commit → Push origin
3. Netlify redeploys automatically within ~30 seconds

## Project structure
```
crime-reporting-site/
├── index.html
├── login.html
├── signup.html
├── dashboard.html
├── report.html
├── admin.html
├── css/style.css
├── js/
│   ├── supabase-config.js   <- put your keys here
│   ├── auth.js
│   ├── common.js
│   ├── dashboard.js
│   ├── report.js
│   └── admin.js
├── supabase-setup.sql
└── netlify.toml
```
