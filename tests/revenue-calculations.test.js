const testData = require('../data/calendar_data.json');

describe('Revenue Calculations', () => {
    test('Monthly revenue matches booking totals', () => {
        // Use April 2024 data for our test
        const monthlyBookings = testData.bookings.filter(b => b.start_date.startsWith('2024-04'));
        const yachtData = testData.monthly_stats['April 2024'];
        
        const calculatedRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.price, 0);
        const reportedRevenue = Object.values(yachtData).reduce((sum, stats) => sum + stats.revenue, 0);
        expect(calculatedRevenue).toBe(reportedRevenue);
    });
});