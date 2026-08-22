(async function () {
  const user = await requireAuth();
  if (!user) return;

  const casesList = document.getElementById("casesList");
  const statuses = ["Pending", "Investigating", "Resolved", "Closed"];

  async function loadCases() {
    const { data: cases, error } = await supabaseClient
      .from("crime_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      casesList.innerHTML = `<p class="error-msg">Error: ${error.message}. (This page is only for admin accounts — see README to make yourself an admin.)</p>`;
      return;
    }

    if (!cases || cases.length === 0) {
      casesList.innerHTML = `<p style="color:var(--muted)">No cases reported yet.</p>`;
      return;
    }

    casesList.innerHTML = cases.map(c => `
      <div class="case-item">
        <div class="info">
          <div class="case-title">${escapeHtml(c.title)}</div>
          <div class="case-meta">${escapeHtml(c.crime_type)} • ${escapeHtml(c.location)} • ${c.incident_date}</div>
          <div class="case-meta">${escapeHtml(c.description)}</div>
        </div>
        <select data-id="${c.id}" class="statusSelect" style="width:auto;margin-bottom:0;">
          ${statuses.map(s => `<option value="${s}" ${s === c.status ? "selected" : ""}>${s}</option>`).join("")}
        </select>
      </div>
    `).join("");

    document.querySelectorAll(".statusSelect").forEach(sel => {
      sel.addEventListener("change", async (e) => {
        const id = e.target.getAttribute("data-id");
        const newStatus = e.target.value;
        await supabaseClient.from("crime_reports").update({ status: newStatus }).eq("id", id);
      });
    });
  }

  loadCases();
})();

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
