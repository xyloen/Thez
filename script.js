const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const modal = document.getElementById('coachModal');
const coachInput = document.getElementById('coach');
const packageSelect = document.getElementById('package');
const toast = document.getElementById('toast');
const coachForm = document.getElementById('coachForm');

const packs = {
    Beerck: [
        '1 Hora de Coaching Básico - $12', 
        '2 Horas de Coaching Intensivo - $20', 
        '3 Horas + Sparring & Técnicas Avanzadas - $35'
    ],
    wSrun: [
        '1 Hora de Coaching Básico - $10', 
        '2 Horas de Coaching Intensivo - $15', 
        '3 Horas + Sparring & Técnicas Avanzadas - $30'
    ],
    Space: [
        '1 Hora de Coaching Básico - $15', 
        '2 Horas de Coaching Intensivo - $30', 
        '3 Horas + Sparring & Técnicas Avanzadas - $50'
    ],
    Hanabi: [
        '1 Hora de Coaching Básico - $15', 
        '2 Horas de Coaching Intensivo - $30', 
        '3 Horas + Sparring & Técnicas Avanzadas - $50'
    ],
     Milka: [
        '1 Hora de Coaching Básico - $12', 
        '2 Horas de Coaching Intensivo - $20', 
        '3 Horas + Sparring & Técnicas Avanzadas - $35'
    ]
};

const players = [
    { name: 'Zomber', elo: 2900, main: 'Val' },
    { name: 'Hanabi', elo: 2900, main: 'Hattori' },
    { name: 'Space', elo: 2700, main: 'Wu Shang' },
    { name: 'Milka', elo: 2600, main: 'Caspian' },
    { name: 'Beerck', elo: 2500, main: 'Tezca' },
    { name: 'Wsrun', elo: 2500, main: 'Ulgrim' },
    { name: 'Cocaine', elo: 2400, main: 'Orión' },
    { name: 'Perzival', elo: 2300, main: 'Brynn' },
    { name: 'El Bicho', elo: 2300, main: 'Diana' },
    { name: 'Johnny', elo: 2200, main: 'Mordex' },
    { name: 'Topurio', elo: 2200, main: 'Teros' },
    { name: 'MA-TA-BASTA-RDAS', elo: 2000, main: 'Scarlet' },
    { name: 'Pirulo', elo: 2000, main: 'Mordex' },
    { name: 'Cold G', elo: 2000, main: 'Mordex' },
    { name: 'Plátano', elo: 2000, main: 'Ónix' },
    { name: 'Rex', elo: 2000, main: 'Wu Shang' },
    { name: 'La bestia', elo: 2000, main: 'Mordex' },
    { name: 'Pontuloco', elo: 2000, main: 'Scarlet' },
    { name: 'Mxnopla', elo: 2000, main: 'Nix' },
    { name: 'Waka', elo: 2000, main: 'Tezca' },
];

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

const closeModal = () => {
    modal.classList.remove('active');
};

window.closeModal = closeModal;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navbarLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

navbarLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            gsap.to(window, {
                duration: 1.1,
                scrollTo: target,
                ease: 'power3.inOut'
            });
        }

        if (navbarToggle && navbarMenu) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });
});

const revealTargets = document.querySelectorAll('.about-card, .founder-card, .service-card-modern, .leaderboard-panel, .maps-panel');

gsap.set(revealTargets, { opacity: 0, y: 24 });

ScrollTrigger.batch(revealTargets, {
    start: 'top 85%',
    batchMax: 8,
    onEnter: (batch) => {
        gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: {
                each: 0.08,
                from: 'start'
            }
        });
    }
});

const heroSection = document.querySelector('.hero-section');

if (heroSection) {
    gsap.from(heroSection, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out'
    });
}

document.querySelectorAll('.btn-book').forEach((button) => {
    button.addEventListener('click', (event) => {
        const card = event.currentTarget.closest('.service-card-modern');

        if (card) {
            coachInput.value = card.dataset.coach;
        }

        packageSelect.innerHTML = '';

        packs[coachInput.value].forEach((pack) => {
            const option = document.createElement('option');
            option.textContent = pack;
            packageSelect.appendChild(option);
        });

        modal.classList.add('active');
    });
});

function getEloClass(elo) {
    if (elo >= 2700) return 'elo-high';
    if (elo >= 2400) return 'elo-mid';
    return 'elo-low';
}

function renderTable(data) {
    const body = document.getElementById('leaderboardBody');

    body.innerHTML = '';

    data.forEach((player, index) => {
        body.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${player.name}</td>
                <td class="${getEloClass(player.elo)}">${player.elo}</td>
                <td>${player.main}</td>
            </tr>
        `;
    });
}

function updateTable() {
    const search = document.getElementById('searchPlayer').value.toLowerCase();
    const filter = document.getElementById('filterMain').value;
    const sort = document.getElementById('sortElo').value;

    let data = [...players];

    if (search) {
        data = data.filter((player) => player.name.toLowerCase().includes(search) || player.main.toLowerCase().includes(search));
    }

    if (filter !== 'all') {
        data = data.filter((player) => player.main === filter);
    }

    data.sort((first, second) => sort === 'asc' ? first.elo - second.elo : second.elo - first.elo);

    renderTable(data);
}

['searchPlayer', 'filterMain', 'sortElo'].forEach((elementId) => {
    document.getElementById(elementId).addEventListener('input', updateTable);
    document.getElementById(elementId).addEventListener('change', updateTable);
});

updateTable();

// --- LÓGICA DE ENVÍO DE FORMULARIO (SEGURO) ---
coachForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // 1. SISTEMA ANTI-SPAM (Máximo 3 peticiones cada 3 horas)
    const now = Date.now();
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    
    // Obtenemos el registro de envíos del navegador
    let requestHistory = JSON.parse(localStorage.getItem('coachRequests') || '[]');
    // Limpiamos los intentos que sean más viejos de 3 horas
    requestHistory = requestHistory.filter(timestamp => now - timestamp < threeHoursInMs);

    if (requestHistory.length >= 3) {
        toast.textContent = '❌ Límite de solicitudes alcanzado. Intenta más tarde.';
        toast.style.background = '#ff4444'; // Color de error
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); toast.style.background = ''; }, 4000);
        return; // Detenemos la ejecución aquí
    }

    // 2. RECOPILACIÓN DE DATOS (Con .trim() para limpiar espacios vacíos extra)
    const data = {
        user: coachForm.elements.user.value.trim(),
        discord: coachForm.elements.discord.value.trim(),
        coach: coachForm.elements.coach.value,
        package: coachForm.elements.package.value,
        elo: coachForm.elements.elo.value,
        goal: coachForm.elements.goal.value.trim()
    };

    // Cambiamos el botón a estado de carga
    const submitBtn = coachForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;

    try {
        // 3. ENVIAMOS LOS DATOS A NUESTRA FUNCIÓN OCULTA DE NETLIFY
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Error en el servidor');

        // Registramos este envío exitoso en el navegador para el anti-spam
        requestHistory.push(now);
        localStorage.setItem('coachRequests', JSON.stringify(requestHistory));

        modal.classList.remove('active');
        toast.textContent = '✔ Solicitud enviada correctamente';
        toast.style.background = '#4CAF50'; // Color de éxito
        toast.classList.add('show');
        coachForm.reset();

    } catch (error) {
        toast.textContent = '❌ No se pudo enviar la solicitud';
        toast.style.background = '#ff4444';
        toast.classList.add('show');
    } finally {
        // Restauramos el botón pase lo que pase
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        setTimeout(() => { 
            toast.classList.remove('show'); 
            toast.style.background = ''; 
        }, 3000);
    }
});