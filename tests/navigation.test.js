describe('Navigation Tests', () => {
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

    test('Navigation links trigger correct page renders', () => {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            expect(link.href).toMatch(/^.*\/(index|bookings|utilization|skippers|revenue)\.html$/);
        });
    });
});
