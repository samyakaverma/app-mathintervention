// Top-level curriculum profile switcher.
// Singapore Math uses the existing intervention app.
// Olympiad Math is intentionally sourced only from the user's Terry Chew Drive folder.

const TERRY_CHEW_FOLDER = 'https://drive.google.com/drive/folders/12UIyA3j7inhDnI-jaCIEj3BeXaG65HwM';
const singaporeHome = renderHome;

function renderProfiles(){
  screen.innerHTML = `
    <div class="eyebrow">MAYA MATH COACH</div>
    <h2>Choose a maths profile</h2>
    <p class="lead">These are separate teaching paths. Progress is kept separately by skill.</p>
    <div class="profile-grid">
      <button class="profile-tile" id="singaporeProfile">
        <span class="profile-kicker">Primary Mathematics</span>
        <strong>Singapore Math</strong>
        <span>Number sense, operations, measurement, fractions and more</span>
      </button>
      <button class="profile-tile" id="olympiadProfile">
        <span class="profile-kicker">Terry Chew</span>
        <strong>Olympiad Math</strong>
        <span>Problem-solving strategies and non-routine questions</span>
      </button>
    </div>`;

  document.getElementById('singaporeProfile').onclick = () => {
    singaporeHome();
    homeBtn.onclick = renderProfiles;
  };
  document.getElementById('olympiadProfile').onclick = renderOlympiadHome;
}

function renderOlympiadHome(){
  screen.innerHTML = `
    <div class="crumbs"><button class="text-link" id="backProfiles">Math profiles</button><span>›</span><span>Olympiad Math</span></div>
    <div class="eyebrow">TERRY CHEW</div>
    <h2>Olympiad Math</h2>
    <p class="lead">This profile will use only the books and problems in your Terry Chew folder, then turn them into the same parent-coach flow: teach a strategy, try a problem, tell me what Maya did, and route up/down/reteach.</p>
    <div class="card warn">
      <div class="label">SOURCE STATUS</div>
      <p class="script"><strong>I can see the Terry Chew folder, but it currently has no files visible inside it.</strong></p>
      <p class="mini" style="margin-top:8px">I have created the Olympiad Math profile now, but I have not invented chapters or strategies that are not in your source books.</p>
    </div>
    <div class="actions">
      <a class="primary page-link" href="${TERRY_CHEW_FOLDER}" target="_blank" rel="noopener">Open Terry Chew folder</a>
      <button class="secondary" id="backProfiles2">Back to profiles</button>
    </div>`;
  document.getElementById('backProfiles').onclick = renderProfiles;
  document.getElementById('backProfiles2').onclick = renderProfiles;
  homeBtn.onclick = renderProfiles;
}

homeBtn.onclick = renderProfiles;
renderProfiles();
