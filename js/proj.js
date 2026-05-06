const projects = [
  {
    category: "Web Design",
    name: "Project One",
    cover: "images/project1/cover.jpg",
    images: [
      "images/project1/img1.jpg",
      "images/project1/img2.jpg",
      "images/project1/img3.jpg"
    ]
  },
  {
    category: "Mobile App",
    name: "Project Two",
    cover: "images/project2/cover.jpg",
    images: [
      "images/project2/img1.jpg",
      "images/project2/img2.jpg"
    ]
  },

   {
    category: "Mobile App",
    name: "Project Two",
    cover: "images/project2/cover.jpg",
    images: [
      "images/project2/img1.jpg",
      "images/project2/img2.jpg"
    ]
  },

];

let currentProject = null, lbIndex = 0, zoomed = false;

// Build cards
const grid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('tabindex', '0');
  card.innerHTML = `
    <img src="${p.cover}" alt="${p.name}" loading="lazy"/>
    <div class="project-card-overlay">
      <div class="project-card-label">${p.category}</div>
      <div class="project-card-name">${p.name}</div>
      <div class="project-card-count">${p.images.length} images</div>
    </div>`;
  card.addEventListener('click', () => openModal(i));
  card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openModal(i); });
  grid.appendChild(card);
});

// Modal
const modal = document.getElementById('galleryModal');
function openModal(idx) {
  currentProject = projects[idx];
  document.getElementById('modalLabel').textContent = currentProject.category;
  document.getElementById('modalName').textContent = currentProject.name;
  const mg = document.getElementById('modalGrid');
  mg.innerHTML = '';
  currentProject.images.forEach((src, i) => {
    const t = document.createElement('div');
    t.className = 'modal-thumb';
    t.setAttribute('tabindex', '0');
    t.innerHTML = `<img src="${src}" alt="Image ${i+1}" loading="lazy"/>
                   <span class="modal-thumb-num">${String(i+1).padStart(2,'0')}</span>`;
    t.addEventListener('click', () => openLightbox(i));
    t.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openLightbox(i); });
    mg.appendChild(t);
  });
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
function closeModal() {
  modal.classList.remove('open');
  if(!document.getElementById('lightbox').classList.contains('open'))
    document.body.style.overflow = '';
}

// Lightbox
const lb = document.getElementById('lightbox');
const lbImgWrap = document.getElementById('lbImgWrap');
const lbImg = document.getElementById('lbImg');

function openLightbox(idx) {
  lbIndex = idx; zoomed = false;
  lbImgWrap.classList.remove('zoomed');
  updateLightbox();
  lb.classList.add('open');
}
function updateLightbox() {
  const imgs = currentProject.images;
  lbImg.src = imgs[lbIndex];
  lbImg.alt = `${currentProject.name} — image ${lbIndex+1}`;
  document.getElementById('lbCounter').textContent =
    `${String(lbIndex+1).padStart(2,'0')} / ${String(imgs.length).padStart(2,'0')}`;
  document.getElementById('lbDots').innerHTML =
    imgs.map((_,i) => `<div class="lbdot${i===lbIndex?' active':''}"></div>`).join('');
  document.getElementById('lbPrev').style.opacity = lbIndex===0 ? '0.3' : '1';
  document.getElementById('lbNext').style.opacity = lbIndex===imgs.length-1 ? '0.3' : '1';
}
lbImgWrap.addEventListener('click', () => {
  zoomed = !zoomed; lbImgWrap.classList.toggle('zoomed', zoomed);
});
document.getElementById('lbPrev').addEventListener('click', () => {
  if(lbIndex>0){ lbIndex--; zoomed=false; lbImgWrap.classList.remove('zoomed'); updateLightbox(); }
});
document.getElementById('lbNext').addEventListener('click', () => {
  if(lbIndex<currentProject.images.length-1){ lbIndex++; zoomed=false; lbImgWrap.classList.remove('zoomed'); updateLightbox(); }
});
document.getElementById('lbClose').addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if(e.target===lb) closeLightbox(); });
function closeLightbox() { lb.classList.remove('open'); }

document.addEventListener('keydown', e => {
  if(lb.classList.contains('open')) {
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowLeft' && lbIndex>0){ lbIndex--; zoomed=false; lbImgWrap.classList.remove('zoomed'); updateLightbox(); }
    if(e.key==='ArrowRight' && lbIndex<currentProject.images.length-1){ lbIndex++; zoomed=false; lbImgWrap.classList.remove('zoomed'); updateLightbox(); }
  } else if(modal.classList.contains('open')) {
    if(e.key==='Escape') closeModal();
  }
});