(async function () {
  const user = await requireAuth();
  if (!user) return;

  const form = document.getElementById("reportForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg");
    msg.innerHTML = "";

    const title = document.getElementById("title").value;
    const crimeType = document.getElementById("crimeType").value;
    const location = document.getElementById("location").value;
    const incidentDate = document.getElementById("incidentDate").value;
    const description = document.getElementById("description").value;

    const { error } = await supabaseClient.from("crime_reports").insert({
      user_id: user.id,
      title,
      crime_type: crimeType,
      location,
      incident_date: incidentDate,
      description,
      status: "Pending"
    });

    if (error) {
      msg.innerHTML = `<p class="error-msg">${error.message}</p>`;
      return;
    }

    msg.innerHTML = `<p class="success-msg">Report submitted successfully!</p>`;
    form.reset();
    setTimeout(() => window.location.href = "dashboard.html", 1200);
  });
})();
