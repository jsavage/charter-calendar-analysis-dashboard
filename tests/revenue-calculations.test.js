const testData = require('../data/calendar_data.json');

describe('Revenue Calculations', () => {
    test('Monthly revenue matches booking totals', () => {
        // Get April bookings
        const monthlyBookings = testData.bookings.filter(booking => 
            booking.start_date.startsWith('2024-04')
        );
        
        // Calculate total from bookings
        const calculatedRevenue = monthlyBookings.reduce((sum, booking) => 
            sum + booking.price, 0
        );
        
        // Get monthly stats for April
        const monthStats = testData.monthly_stats['April 2024'];
        const reportedRevenue = monthStats ? 
            Object.values(monthStats).reduce((sum, stats) => sum + stats.revenue, 0) : 0;
        
        expect(calculatedRevenue).toBe(reportedRevenue);
    });
});