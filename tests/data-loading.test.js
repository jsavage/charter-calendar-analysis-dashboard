const fs = require('fs');
const path = require('path');
const DashboardManager = require('../web/js/dashboard.js');

describe('Data Loading and Refresh', () => {
    test('Successful JSON data loading', () => {
        const filePath = path.join(process.cwd(), 'data', 'calendar_data.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        expect(data).toHaveProperty('bookings');
        expect(data).toHaveProperty('monthly_stats');
    });

    test('Data refresh functionality', async () => {
        const dashboard = new DashboardManager();
        await dashboard.loadData();
        expect(dashboard.data).toBeDefined();
        expect(dashboard.data.bookings).toBeInstanceOf(Array);
        expect(dashboard.data.monthly_stats).toBeDefined();
        expect(dashboard.data.skipper_stats).toBeDefined();
    });
});