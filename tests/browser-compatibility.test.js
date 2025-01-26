describe('Browser Compatibility', () => {
    test('Responsive design breakpoints', () => {
        const viewports = [
            { width: 320, height: 568 },  // Mobile
            { width: 768, height: 1024 }, // Tablet
            { width: 1920, height: 1080 } // Desktop
        ];

        viewports.forEach(size => {
            Object.defineProperty(window, 'innerWidth', { value: size.width });
            Object.defineProperty(window, 'innerHeight', { value: size.height });
            window.dispatchEvent(new Event('resize'));
            
            const dashboard = document.getElementById('dashboard');
            const computed = window.getComputedStyle(dashboard);
            expect(computed.display).toBe('block');
        });
    });

    test('Cross-browser feature detection', () => {
        expect(typeof window.fetch).toBe('function');
        expect(typeof document.querySelector).toBe('function');
        expect(typeof window.localStorage).toBe('object');
    });
});
