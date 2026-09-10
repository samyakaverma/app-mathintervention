// Top-level curriculum profile switcher.
const singaporeHome = renderHome;

function renderProfiles(){
  screen.innerHTML = `
    <div class="eyebrow">MATH INTERVENTION COACH</div>
    <h2>Choose a maths profile</h2>
    <p class="lead">Separate teaching paths for different learners. The site coaches the parent; the child works with you and the source material.</p>
    <div class="profile-grid">
      <button class="profile-tile" id="singaporeProfile">
        <span class="profile-kicker">Maya · Primary Mathematics</span>
        <strong>Singapore Math</strong>
        <span>Number sense, operations, measurement, fractions and more</span>
      </button>
      <button class="profile-tile" id="olympiadProfile">
        <span class="profile-kicker">Zara · Terry Chew</span>
        <strong>Olympiad Math</strong>
        <span>Problem-solving strategies and non-routine questions</span>
      </button>
      <button class="profile-tile" id="calculusProfile">
        <span class="profile-kicker">Zara · Learning by Discovery</span>
        <strong>Discovery Calculus</strong>
        <span>Graph, predict, experiment and explain calculus ideas</span>
      </button>
    </div>`;

  document.getElementById('singaporeProfile').onclick = () => {
    singaporeHome();
    homeBtn.onclick = renderProfiles;
  };
  document.getElementById('olympiadProfile').onclick = () => window.renderOlympiadHome();
  document.getElementById('calculusProfile').onclick = () => window.renderCalculusHome();
}

homeBtn.onclick = renderProfiles;
renderProfiles();
