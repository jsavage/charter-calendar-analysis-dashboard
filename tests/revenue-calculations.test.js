describe('Revenue Calculations', () => {
    const testData = require('../data/test_calendar_data.json');

    test('Monthly revenue matches booking totals', () => {
        Object.entries(testData.monthly_stats).forEach(([month, yachtData]) => {
            const monthlyBookings = testData.bookings.filter(booking => 
                booking.start_date.startsWith(month.split(' ')[1]));
            
            const calculatedRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.price, 0);
            const reportedRevenue = Object.values(yachtData).reduce((sum, stats) => sum + stats.revenue, 0);
            
            expect(calculatedRevenue).toBe(reportedRevenue);
        });
    });
});