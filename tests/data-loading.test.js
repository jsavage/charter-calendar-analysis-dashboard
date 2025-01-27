describe('Data Loading and Refresh', () => {
    test('Successful JSON data loading', async () => {
        const response = await fetch('data/calendar_data.json');
        const data = await response.json();
        expect(data).toHaveProperty('bookings');
        expect(data).toHaveProperty('monthly_stats');
    });

    test('Data refresh functionality', async () => {
        const dashboard = new DashboardManager();
        await dashboard.loadData();
        expect(dashboard.data).toBeDefined();
        expect(dashboard.data.bookings).toBeInstanceOf(Array);
    });
});

const fetch = require('node-fetch');
const DashboardManager = require('../web/js/dashboard.js');