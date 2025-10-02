        const projects = [
            {
                title: 'Php, MySQL, HTML, CSS, JavaScript, Bootstrap',
                description: 'WEB-BASE APPLICATION AND MONITORING SYSTEM FOR THE GOVERNMENT HOUSING PROJECT',
                cover: 'images/8.png',
                images: [
                    'images/8.png',
                    'images/5.png',
                    'images/2.png',
                    'images/3.png',
                    'images/6.png',
                    'images/7.png',
                    'images/9.png', 
                    'images/10.png', 
                    'images/11.png', 
                    'images/12.png', 
                    'images/13.png', 
                ]
            },
            {
                title: 'React Native , MongoDB Native Wind',
                description: 'KARGAMOTO ANGKAS MOBILE APP FOR BACOLOD CITY',
                cover: 'images/35.png',
                images: [
                    'images/14.png',
                    'images/15.png',
                    'images/32.png',
                    'images/16.png',
                    'images/17.png',
                    'images/18.png',
                    'images/31.png',
                    'images/19.png',
                    'images/20.png',
                    'images/21.png',
                    'images/33.png',
                    'images/34.png',
                ]
            },
            {
                title: 'Node.js JavaScript, Express.js, MongoDB, EJS, HTML, CSS, Bootstrap',
                description: 'Geographic Information System for the City of Silay LGU',
                cover: 'images/22.png',
                images: [
                    'images/22.png',
                    'images/23.png',
                    'images/24.png',
                    'images/25.png',
                    'images/26.png',
                    'images/27.png',
                    'images/28.png',
                    'images/29.png',
                    'images/30.png',
                ]
            },
        ];

        let currentProjectImages = [];
        let currentImageIndex = 0;

        // Generate gallery
        const gallery = document.getElementById('gallery');
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => openProject(index);
            item.innerHTML = `
                <img src="${project.cover}" alt="${project.title}">
                <div class="image-count">${project.images.length} photos</div>
                <div class="overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
            gallery.appendChild(item);
        });

        function openProject(projectIndex) {
            const project = projects[projectIndex];
            currentProjectImages = project.images;
            currentImageIndex = 0;
            
            const lightbox = document.getElementById('lightbox');
            const img = document.getElementById('lightboxImage');
            const desc = document.getElementById('lightboxDesc');

            img.src = currentProjectImages[0];
            img.alt = project.title;
            img.classList.remove('zoomed');
            desc.textContent = `Image 1 of ${currentProjectImages.length}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function toggleZoom() {
            const img = document.getElementById('lightboxImage');
            img.classList.toggle('zoomed');
        }

        function navigateImage(direction) {
            currentImageIndex = (currentImageIndex + direction + currentProjectImages.length) % currentProjectImages.length;
            const img = document.getElementById('lightboxImage');
            const desc = document.getElementById('lightboxDesc');

            img.classList.remove('zoomed');
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.src = currentProjectImages[currentImageIndex];
                desc.textContent = `Image ${currentImageIndex + 1} of ${currentProjectImages.length}`;
                img.style.opacity = '1';
            }, 150);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateImage(-1);
            if (e.key === 'ArrowRight') navigateImage(1);
        });

        // Close on background click
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') closeLightbox();
        });

        // Smooth image transition
        document.getElementById('lightboxImage').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
