// ======================================================
// STEP: Paste your own Supabase keys here (see README)
// ======================================================
const SUPABASE_URL = "https://aksccmuulrtwlmegizso.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrc2NjbXV1bHJ0d2xtZWdpenNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNjk3MTEsImV4cCI6MjEwMjk0NTcxMX0.PSGCGJn_XX2bCXOYYteUSNuIEcGlbSlZYogUvl5EXoo";

// This creates the connection to your database. Don't touch below this line.
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
