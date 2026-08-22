(async function () {
  const user = await requireAuth();
  if (!user) return;

  const casesList = document.getElementById("casesList");

  const { data: cases, error } = await supabaseClient
    .from("crime_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    casesList.innerHTML = `<p class="error-msg">Error loading cases: ${error.message}</p>`;
    return;
  }

  if (!cases || cases.length === 0) {
    casesList.innerHTML = `<p style="color:var(--muted)">You haven't reported any cases yet. <a href="report.html" style="color:var(--accent)">Report one now</a>.</p>`;
    return;
  }

  casesList.innerHTML = cases.map(c => `
    <div class="case-item">
      <div class="info">
        <div class="case-title">${escapeHtml(c.title)}</div>
        <div class="case-meta">${escapeHtml(c.crime_type)} • ${escapeHtml(c.location)} • ${c.incident_date}</div>
      </div>
      <span class="status-badge status-${c.status}">${c.status}</span>
    </div>
  `).join("");
})();

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
