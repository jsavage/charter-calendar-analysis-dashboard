describe('Dashboard Calculations', () => {
    test('Utilization percentage calculation', () => {
        const testData = {
            booked: 7,
            available: 31
        };
        const utilization = (testData.booked / testData.available) * 100;
        expect(utilization).toBeCloseTo(22.58, 2);
    });
});