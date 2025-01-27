const testData = require('../data/sanitized_calendar_data.json');

describe('Revenue Calculations', () => {
    test('Monthly revenue matches booking totals', () => {
        // Use actual bookings and monthly stats from test data
        const monthlyBookings = testData.bookings;
        const yachtData = testData.monthly_stats.June;
        
        const calculatedRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.price, 0);
        const reportedRevenue = Object.values(yachtData).reduce((sum, stats) => sum + stats.revenue, 0);
        expect(calculatedRevenue).toBe(reportedRevenue);
    });
});