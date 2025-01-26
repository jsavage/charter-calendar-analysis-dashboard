const DashboardManager = require('../web/js/dashboard.js');

describe('Dashboard UI Components', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <nav class="main-nav">
                <div class="nav-links">
                    <a href="index.html">Overview</a>
                    <a href="bookings.html">Bookings</a>
                    <a href="utilization.html">Utilization</a>
                    <a href="skippers.html">Skippers</a>
                    <a href="revenue.html">Revenue</a>
                </div>
            </nav>
            <main id="dashboard"></main>
        `;
    });

    test('Navigation links are properly configured', () => {
        const links = document.querySelectorAll('.nav-links a');
        expect(links.length).toBe(5);
        expect(links[0].href).toContain('index.html');
    });
});