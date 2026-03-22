// Main JavaScript for Digital Cultural Heritage Platform

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initAnimations();
    initMap();
    initCounters();
    initMobileMenu();
    initHeritageSites();
});

// 1. Sticky Navbar & Mobile Menu
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// 2. Scroll Animations (Intersection Observer)
function initAnimations() {
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Put this if you want it to animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// 3. Leaflet Map Initialization
function initMap() {
    const mapContainer = document.getElementById('heritage-map');
    if (!mapContainer) return;

    // Center map on India with better zoom for light theme
    const map = L.map('heritage-map', {
        scrollWheelZoom: false
    }).setView([22.5937, 78.9629], 5);

    // Use Esri NatGeo World Map for Educational/Physical look
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
    }).addTo(map);

    // Heritage Sites Data with Types and Images
    const sites = [
        {
            name: "Taj Mahal",
            coords: [27.1751, 78.0421],
            info: "Agra, Uttar Pradesh",
            type: "cultural",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=300&auto=format&fit=crop"
        },
        {
            name: "Hampi",
            coords: [15.3350, 76.4600],
            info: "Vijayanagara, Karnataka",
            type: "cultural",
            image: "https://images.unsplash.com/photo-1628269550302-6027376c9ad2?q=80&w=300&auto=format&fit=crop"
        },
        {
            name: "Konark Sun Temple",
            coords: [19.8876, 86.0945],
            info: "Konark, Odisha",
            type: "cultural",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Konark_Sun_Temple_-_Odisha.jpg"
        },
        {
            name: "Kaziranga National Park",
            coords: [26.5775, 93.1711],
            info: "Assam (Natural Heritage)",
            type: "natural",
            image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=300&auto=format&fit=crop"
        },
        {
            name: "Western Ghats",
            coords: [10.1340, 77.0600],
            info: "Kerala/Tamil Nadu (Natural)",
            type: "natural",
            image: "https://images.unsplash.com/photo-1624522262078-4a1e9c5a14d5?q=80&w=300&auto=format&fit=crop"
        },
        {
            name: "Ajanta Caves",
            coords: [20.5519, 75.7033],
            info: "Aurangabad, Maharashtra",
            type: "cultural",
            image: "https://images.unsplash.com/photo-1582298538104-fe2e74c2ae44?q=80&w=300&auto=format&fit=crop"
        }
    ];

    sites.forEach(site => {
        // Create Custom Marker Icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin marker-${site.type}"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const marker = L.marker(site.coords, { icon: customIcon }).addTo(map);

        // Custom Popup Content
        const popupContent = `
            <div class="popup-card">
                <div class="popup-img" style="background-image: url('${site.image}');"></div>
                <div class="popup-info">
                    <h4>${site.name}</h4>
                    <span class="popup-tag">UNESCO World ${site.type === 'cultural' ? 'Cultural' : 'Natural'} Heritage</span>
                    <a href="#" class="btn-popup">Explore</a>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent);
    });
}

// 4. Animated Stats Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Lower inc to slow and higher to slow
                    const inc = target / speed;

                    if (count < target) {
                        // Check if it's the decimal one or integer
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// 5. Heritage Sites Logic (Data & Detail View)
const heritageSites = [
    {
        id: "unesco-taj",
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        type: "unesco",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
        fullImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop",
        description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife, the Taj Mahal is the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage.",
        importance: "The Taj Mahal is considered to be the greatest architectural achievement in the whole range of Indo-Islamic architecture. Its recognised architecutral beauty has a rhythmic combination of solids and voids, concave and convex and light shadow; such as arches and domes further increases the aesthetic aspect.",
        facts: { built: "1632-1653", architect: "Ustad Ahmad Lahori", visitors: "6 Million+ / Year" }
    },
    {
        id: "unesco-konark",
        name: "Konark Sun Temple",
        location: "Konark, Odisha",
        type: "unesco",
        image: "https://imgs.search.brave.com/VGapbcJxtQALrJh4feNsajW_1VzsZm4p7q1y-5J8U4A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWx0aHJpdmVodWIu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI1LzEwL3N1bl90/ZW1wbGVfYXRfa29u/YXJrMS1lMTc0NjQy/OTAxNDU5OS5qcGc",
        fullImage: "https://imgs.search.brave.com/VGapbcJxtQALrJh4feNsajW_1VzsZm4p7q1y-5J8U4A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWx0aHJpdmVodWIu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI1LzEwL3N1bl90/ZW1wbGVfYXRfa29u/YXJrMS1lMTc0NjQy/OTAxNDU5OS5qcGc",
        description: "The Konark Sun Temple is a 13th-century CE Sun Temple at Konark about 35 kilometres northeast of Puri on the coastline of Odisha, India.",
        importance: "Built in the 13th century, it was conceived as a gigantic chariot of the Sun God, with twelve pairs of exquisitely ornamented wheels pulled by seven horses.",
        facts: { built: "1250 CE", architect: "Narasimhadeva I", visitors: "2.5 Million+ / Year" }
    },
    {
        id: "unesco-manas",
        name: "Manas Wildlife Sanctuary",
        location: "Assam, India",
        type: "unesco",
        image: "https://imgs.search.brave.com/80KsMc9lndWcsVh9scQdpiwY-AL9xZq7vHIObn_BCTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxpZ2h0aW5kaWEu/Y29tL2Nkbi91cGxv/YWRzL3Bvc3RpbWFn/ZXMvTUVESVVNL01h/bmFzJTIwJTIwV29y/ZHp6LS02N2E2ODgu/anBlZw",
        fullImage: "https://imgs.search.brave.com/80KsMc9lndWcsVh9scQdpiwY-AL9xZq7vHIObn_BCTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxpZ2h0aW5kaWEu/Y29tL2Nkbi91cGxv/YWRzL3Bvc3RpbWFn/ZXMvTUVESVVNL01h/bmFzJTIwJTIwV29y/ZHp6LS02N2E2ODgu/anBlZw",
        description: "Verify Manas Wildlife Sanctuary is a biodiversity hotspot, spanning the Manas river and bounded to the north by the forests of Bhutan. It includes a tiger reserve, an elephant reserve and a biosphere reserve.",
        importance: "It provides habitat for 22 of India’s most threatened species of mammals. In total, there are nearly 60 species of mammals, 42 species of reptiles, 7 amphibians and 500 species of birds.",
        facts: { built: "Natural Site", architect: "N/A", visitors: "30k+ / Year" }
    },
    {
        id: "unesco-ajanta",
        name: "Ajanta Caves",
        location: "Aurangabad, Maharashtra",
        type: "unesco",
        image: "https://imgs.search.brave.com/W8f8dTos10EwQ2jObG0Oz7DI6oEKlKzsRCWLnJeRXfE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/bGQueWF0cmEuY29t/L3l0aW1hZ2VzL2lt/YWdlL3VwbG9hZC90/X21vbnVtZW50c19k/ZXRhaWxzbGFyZ2Vp/bWcvdjE1MTQwMTQy/ODMvTW9udW1lbnRz/L2F1cmFuZ2FiYWQv/MjI1YWQ3N2EtMDgx/Zi00YzE2LWIyNTUt/YzE5ODE0MDdkYWQw/LzNfWnUwN0d3Lmpw/Zw",
        fullImage: "https://imgs.search.brave.com/W8f8dTos10EwQ2jObG0Oz7DI6oEKlKzsRCWLnJeRXfE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDI2NDMxNjM5ODMt/ZWQwYmFiYzM5Nzk3/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhhbUZw/Y0hWeUpUSXdZMmww/ZVh4bGJud3dmSHd3/Zkh4OE1BPT0",
        description: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BCE to about 480 CE. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.",
        importance: "The Ajanta Caves constitute ancient monasteries and worship-halls of different Buddhist traditions carved into a 75-metre wall of rock. The paintings and sculptures are masterpieces of Buddhist religious art, with figures of the Buddha and depictions of the Jataka tales.",
        facts: { built: "2nd Century BCE", architect: "Satavahana Dynasty", visitors: "400k+ / Year" }
    },
    {
        id: "unesco-jaipur",
        name: "Jaipur City",
        location: "Rajasthan, India",
        type: "unesco",
        image: "https://imgs.search.brave.com/aiR0wZAoEzUuXXfMdSMOyI7VnBg88tMP_t7MAHMoIDs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDI2NDMxNjM5ODMt/ZWQwYmFiYzM5Nzk3/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhhbUZw/Y0hWeUpUSXdZMmww/ZVh4bGJud3dmSHd3/Zkh4OE1BPT0",
        fullImage: "https://imgs.search.brave.com/aiR0wZAoEzUuXXfMdSMOyI7VnBg88tMP_t7MAHMoIDs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDI2NDMxNjM5ODMt/ZWQwYmFiYzM5Nzk3/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhhbUZw/Y0hWeUpUSXdZMmww/ZVh4bGJud3dmSHd3/Zkh4OE1BPT0",
        description: "The Pink City of Jaipur was founded in 1727 by Sawai Jai Singh II. It is an exceptional example of a late medieval trade town in South Asia and planned according to Vedic architecture.",
        importance: "Known for its grid-like urban plan, iconic pink facades, and grand palaces like Hawa Mahal and City Palace.",
        facts: { built: "1727", architect: "Vidyadhar Bhattacharya", visitors: "Millions / Year" }
    },
    {
        id: "unesco-nalanda",
        name: "Nalanda Mahavihara",
        location: "Bihar, India",
        type: "unesco",
        image: "https://imgs.search.brave.com/lpFCdm4u9uk-c0JW_aK8Z1rui_csj6xqnn0QLnTIyCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/OTM5ODk4L3Bob3Rv/L2ZpcnN0LXVuaXZl/cnNpdHkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUx3T2lX/WHBBREw1T3hnd2wz/R2FKMTBybVdjQWpM/NzV6eGVZelhiZldN/M0U9",
        fullImage: "https://imgs.search.brave.com/lpFCdm4u9uk-c0JW_aK8Z1rui_csj6xqnn0QLnTIyCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/OTM5ODk4L3Bob3Rv/L2ZpcnN0LXVuaXZl/cnNpdHkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUx3T2lX/WHBBREw1T3hnd2wz/R2FKMTBybVdjQWpM/NzV6eGVZelhiZldN/M0U9",
        description: "The Archaeological Site of Nalanda Mahavihara comprises the archaeological remains of a monastic and scholastic institution dating from the 3rd century BCE to the 13th century CE.",
        importance: "It was one of the most ancient universities in the Indian Subcontinent, attracting scholars from across Asia.",
        facts: { built: "5th Century CE", architect: "Gupta Empire", visitors: "200k+ / Year" }
    },
    {
        id: "unesco-western-ghats",
        name: "Western Ghats",
        location: "Western India",
        type: "unesco",
        image: "https://imgs.search.brave.com/HVJQcHVTGNg0E-sS_N0lZNh_oVN1E9OIPG78T7-PVWY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWFr/dmlzb3IuY29tL3Bo/b3RvL1NEL1dlc3Rl/cm4tR2hhdHMtSW5k/aWEtS2VyYWxhLW1v/dW50YWlucy1sYW5k/c2NhcGUuanBn",
        fullImage: "https://imgs.search.brave.com/HVJQcHVTGNg0E-sS_N0lZNh_oVN1E9OIPG78T7-PVWY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWFr/dmlzb3IuY29tL3Bo/b3RvL1NEL1dlc3Rl/cm4tR2hhdHMtSW5k/aWEtS2VyYWxhLW1v/dW50YWlucy1sYW5k/c2NhcGUuanBn",
        description: "Older than the Himalayas, the Western Ghats mountain chain represents geomorphic features of immense importance with unique biophysical and ecological processes.",
        importance: "One of the world's eight 'hottest hotspots' of biological diversity.",
        facts: { built: "Natural Site", architect: "Nature", visitors: "High Tourism" }
    },
    {
        id: "unesco-red-fort",
        name: "Red Fort Complex",
        location: "Delhi, India",
        type: "unesco",
        image: "https://imgs.search.brave.com/U-Vl_VtlnDp3mawfvNNgUfCqdn8SGnrfWNajJ5_98tI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA1/MjAzNzE1Mi9waG90/by9yZWQtZm9ydC1u/ZXctZGVsaGktaW5k/aWEtdHJpY29sb3It/ZmxhZy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9bU1Dbmx5/UkRFZmpkVTZkV3Bx/QmF6NWd3RzR0d2Yt/YWpPYlNCVVhhWXVp/dz0",
        fullImage: "https://imgs.search.brave.com/U-Vl_VtlnDp3mawfvNNgUfCqdn8SGnrfWNajJ5_98tI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA1/MjAzNzE1Mi9waG90/by9yZWQtZm9ydC1u/ZXctZGVsaGktaW5k/aWEtdHJpY29sb3It/ZmxhZy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9bU1Dbmx5/UkRFZmpkVTZkV3Bx/QmF6NWd3RzR0d2Yt/YWpPYlNCVVhhWXVp/dz0",
        description: "The Red Fort Complex was built as the palace fort of Shahjahanabad – the new capital of the fifth Mughal Emperor of India, Shah Jahan.",
        importance: "Named for its massive enclosing walls of red sandstone, it represents the zenith of Mughal creativity.",
        facts: { built: "1648", architect: "Ustad Ahmad Lahori", visitors: "Millions / Year" }
    },
    {
        id: "unesco-moidams",
        name: "Charaideo Moidams",
        location: "Assam, India",
        type: "unesco",
        image: "https://imgs.search.brave.com/l7gThJ7ZxaIJq7wXhJTNIQlbGHiiR0RA1yQHva2uoXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGluZHVzdGFu/dGltZXMuY29tL2lt/Zy8yMDI0LzA3LzI3/LzU1MHgzMDkvUFRJ/MDctMjYtMjAyNC0w/MDA0OTRCLTBfMTcy/MjA1ODg4MDE5M18x/NzIyMDU4OTA0OTAz/LmpwZw",
        fullImage: "https://imgs.search.brave.com/l7gThJ7ZxaIJq7wXhJTNIQlbGHiiR0RA1yQHva2uoXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGluZHVzdGFu/dGltZXMuY29tL2lt/Zy8yMDI0LzA3LzI3/LzU1MHgzMDkvUFRJ/MDctMjYtMjAyNC0w/MDA0OTRCLTBfMTcy/MjA1ODg4MDE5M18x/NzIyMDU4OTA0OTAz/LmpwZw",
        description: "The Moidams are the mound-burial system of the Ahom dynasty who ruled Assam for 600 years. They are sacred burial grounds.",
        importance: "India's latest UNESCO World Heritage Site (2024), effectively the 'Pyramids of Assam'.",
        facts: { built: "13th-19th Century", architect: "Ahom Dynasty", visitors: "Growing Interest" }
    },
    
    {
        id: "other-india-gate",
        name: "India Gate",
        location: "New Delhi",
        type: "other",
        image: "https://imgs.search.brave.com/fl541sZgn2agVomwWwbJeC3xbezUT9yf9GkOHzRIj-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzA4LzI0LzA2/LzM2MF9GXzkwODI0/MDY3MV9MS3hrd3Ji/TnJQdTlrNFRwVTBG/TzZPanJaQlB0YTZa/Qy5qcGc",
        fullImage: "https://imgs.search.brave.com/fl541sZgn2agVomwWwbJeC3xbezUT9yf9GkOHzRIj-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzA4LzI0LzA2/LzM2MF9GXzkwODI0/MDY3MV9MS3hrd3Ji/TnJQdTlrNFRwVTBG/TzZPanJaQlB0YTZa/Qy5qcGc",
        description: "The India Gate is a war memorial located astride the Rajpath. It stands as a memorial to 70,000 soldiers of the British Indian Army who died in between 1914 and 1921 in the First World War.",
        importance: "A symbol of sacrifice and national pride, it is one of the largest war memorials in the country. The Amar Jawan Jyoti, an eternal flame, was added later to honor soldiers of the 1971 war.",
        facts: { built: "1931", architect: "Sir Edwin Lutyens", visitors: "Daily Thousands" }
    },
    {
        id: "other-mysore",
        name: "Mysore Palace",
        location: "Mysore, Karnataka",
        type: "other",
        image: "https://imgs.search.brave.com/RFw1QgMrqD3FUEDeulzlKrlTE64VVg4GzA5qLCsJVLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZW1v/dGV0cmF2ZWxlci5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTQvMTAvTXlzb3Jl/LVBhbGFjZTIuanBn",
        fullImage: "https://imgs.search.brave.com/RFw1QgMrqD3FUEDeulzlKrlTE64VVg4GzA5qLCsJVLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZW1v/dGV0cmF2ZWxlci5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTQvMTAvTXlzb3Jl/LVBhbGFjZTIuanBn",
        description: "The Palace of Mysore is a historical palace and a royal residence. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.",
        importance: "Known for its Indo-Saracenic style of architecture, it blends Hindu, Muslim, Rajput, and Gothic styles. It is one of the most famous tourist attractions in India using a kaleidoscope of stained glass and mirrors.",
        facts: { built: "1912", architect: "Henry Irwin", visitors: "6 Million / Year" }
    }
];

function initHeritageSites() {
    const unescoGrid = document.getElementById('unesco-grid');
    const otherGrid = document.getElementById('other-grid');

    if (!unescoGrid || !otherGrid) return; // Not on Heritage page

    // Clear existing
    unescoGrid.innerHTML = '';
    otherGrid.innerHTML = '';

    heritageSites.forEach(site => {
        const card = document.createElement('div');
        card.className = 'site-card fade-in';
        card.onclick = () => openDetail(site.id);

        const badgeClass = site.type === 'unesco' ? 'unesco' : 'national';
        const badgeText = site.type === 'unesco' ? 'UNESCO' : 'National';

        card.innerHTML = `
            <div class="site-img-small" style="background-image: url('${site.image}');"></div>
            <div class="site-badge ${badgeClass}">${badgeText}</div>
            <div class="site-content">
                <h3>${site.name}</h3>
                <span class="site-location">${site.location}</span>
                <span class="btn-link">View Details &rarr;</span>
            </div>
        `;

        if (site.type === 'unesco') {
            unescoGrid.appendChild(card);
        } else {
            otherGrid.appendChild(card);
        }
    });

    // Re-trigger animations for new elements
    setTimeout(() => {
        const cards = document.querySelectorAll('.site-card');
        cards.forEach(card => card.classList.add('visible'));
    }, 100);

    // Overlay Close Logic
    const closeBtn = document.getElementById('close-overlay');
    if (closeBtn) closeBtn.onclick = closeDetail;
}

function openDetail(id) {
    const site = heritageSites.find(s => s.id === id);
    if (!site) return;

    const overlay = document.getElementById('detail-overlay');

    // Populate Data
    document.getElementById('detail-hero').style.backgroundImage = `url('${site.fullImage}')`;
    document.getElementById('detail-title').innerText = site.name;
    document.getElementById('detail-location').innerHTML = `<i class="location-icon"></i> ${site.location}`;
    document.getElementById('detail-description').innerText = site.description;
    document.getElementById('detail-importance').innerText = site.importance;

    document.getElementById('detail-built').innerText = site.facts.built;
    document.getElementById('detail-architect').innerText = site.facts.architect;
    document.getElementById('detail-visitors').innerText = site.facts.visitors;

    const badge = document.getElementById('detail-badge');
    if (site.type === 'unesco') {
        badge.innerText = "UNESCO World Heritage";
        badge.style.color = "#D35400";
        badge.style.background = "#FFEFD5";
    } else {
        badge.innerText = "National Heritage Site";
        badge.style.color = "#27AE60";
        badge.style.background = "#E8F8F5";
    }

    // Show Overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeDetail() {
    document.getElementById('detail-overlay').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
}
