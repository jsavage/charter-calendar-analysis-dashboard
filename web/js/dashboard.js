class DashboardManager {
    constructor() {
        console.log('DashboardManager initialized');
        this.data = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderCurrentPage();
    }

    async loadData() {
        try {
            const response = await fetch('data/calendar_data.json');
            this.data = await response.json();
            console.log('Loaded data:', this.data);
        } catch (error) {
            console.log('Error loading data:', error);
        }
    }

    renderCurrentPage() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data || !dashboard) {
            console.log('Data or dashboard element not ready');
            return;
        }

        const path = window.location.pathname.toLowerCase();
        console.log('Current path:', path);

        if (path.endsWith('index.html') || path === '/') {
            this.renderOverview();
        } else if (path.endsWith('revenue.html')) {
            this.renderRevenue();
        } else if (path.endsWith('utilization.html')) {
            this.renderUtilization();
        } else if (path.endsWith('skippers.html')) {
            this.renderSkippers();
        } else if (path.endsWith('bookings.html')) {
            this.renderBookings();
        } else {
            this.renderOverview();
        }
    }

    renderOverview() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data) return;
        
        dashboard.innerHTML = `
            <div class="stats-grid">
                ${this.generateUtilizationSummary()}
                ${this.generateRevenueSummary()}
                ${this.generateSkipperSummary()}
                ${this.generateUpcomingBookings()}
            </div>
        `;
    }

    generateUtilizationSummary() {
        if (!this.data || !this.data.monthly_stats) return '';
        
        let totalUtilization = 0;
        let count = 0;
        
        Object.values(this.data.monthly_stats).forEach(monthData => {
            Object.values(monthData).forEach(yachtData => {
                const utilization = (yachtData.booked / yachtData.available) * 100;
                if (!isNaN(utilization)) {
                    totalUtilization += utilization;
                    count++;
                }
            });
        });

        const averageUtilization = (totalUtilization / count).toFixed(1);

        return `
            <div class="stat-card">
                <h3>Fleet Utilization</h3>
                <div class="stat-value">${averageUtilization}%</div>
                <div class="stat-trend">Average across all yachts</div>
            </div>
        `;
    }

    generateRevenueSummary() {
        if (!this.data || !this.data.monthly_stats) return '';
        
        let totalRevenue = 0;
        Object.values(this.data.monthly_stats).forEach(monthData => {
            Object.values(monthData).forEach(yachtData => {
                totalRevenue += yachtData.revenue;
            });
        });

        return `
            <div class="stat-card">
                <h3>Total Revenue</h3>
                <div class="stat-value">£${totalRevenue.toLocaleString()}</div>
                <div class="stat-trend">Projected revenue</div>
            </div>
        `;
    }

    generateSkipperSummary() {
        if (!this.data || !this.data.skipper_stats) return '';
        
        const skipperCount = Object.keys(this.data.skipper_stats).length;
        let totalDays = 0;
        Object.values(this.data.skipper_stats).forEach(skipper => {
            totalDays += skipper.total_days;
        });

        return `
            <div class="stat-card">
                <h3>Skipper Activity</h3>
                <div class="stat-value">${skipperCount} Skippers</div>
                <div class="stat-trend">${totalDays} total sailing days</div>
            </div>
        `;
    }

    generateUpcomingBookings() {
        if (!this.data || !this.data.bookings) return '';
        
        const upcomingCount = this.data.bookings.length;
        return `
            <div class="stat-card">
                <h3>Upcoming Bookings</h3>
                <div class="stat-value">${upcomingCount}</div>
                <div class="stat-trend">Active bookings</div>
            </div>
        `;
    }

    renderUtilization() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data) return;
        
        dashboard.innerHTML = `
            <div class="utilization-charts">
                <h2>Monthly Utilization by Yacht</h2>
                ${this.generateUtilizationTable()}
            </div>
        `;
    }

    generateUtilizationTable() {
        if (!this.data || !this.data.monthly_stats) return '';
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Yacht</th>
                        <th>Available Days</th>
                        <th>Booked Days</th>
                        <th>Utilization</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.entries(this.data.monthly_stats).forEach(([month, monthData]) => {
            Object.entries(monthData).forEach(([yacht, yachtData]) => {
                const utilization = ((yachtData.booked / yachtData.available) * 100).toFixed(1);
                tableHTML += `
                    <tr>
                        <td>${month}</td>
                        <td>${yacht}</td>
                        <td>${yachtData.available}</td>
                        <td>${yachtData.booked}</td>
                        <td>${utilization}%</td>
                    </tr>
                `;
            });
        });

        tableHTML += '</tbody></table>';
        return tableHTML;
    }

    renderRevenue() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data) return;
        
        dashboard.innerHTML = `
            <div class="revenue-analysis">
                <h2>Revenue by Month</h2>
                ${this.generateRevenueTable()}
            </div>
        `;
    }

    generateRevenueTable() {
        if (!this.data || !this.data.monthly_stats) return '';
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Yacht</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let monthlyTotals = {};
        let yachtTotals = {};
        let grandTotal = 0;

        Object.entries(this.data.monthly_stats).forEach(([month, monthData]) => {
            monthlyTotals[month] = 0;
            Object.entries(monthData).forEach(([yacht, yachtData]) => {
                const revenue = yachtData.revenue;
                monthlyTotals[month] += revenue;
                yachtTotals[yacht] = (yachtTotals[yacht] || 0) + revenue;
                grandTotal += revenue;
                
                tableHTML += `
                    <tr>
                        <td>${month}</td>
                        <td>${yacht}</td>
                        <td>£${revenue.toLocaleString()}</td>
                    </tr>
                `;
            });
        });

        tableHTML += `
            </tbody>
            <tfoot>
                <tr><td colspan="3"><strong>Monthly Totals</strong></td></tr>
        `;
        Object.entries(monthlyTotals).forEach(([month, total]) => {
            tableHTML += `
                <tr>
                    <td>${month}</td>
                    <td>Total</td>
                    <td>£${total.toLocaleString()}</td>
                </tr>
            `;
        });

        tableHTML += `
            <tr><td colspan="3"><strong>Yacht Totals</strong></td></tr>
        `;
        Object.entries(yachtTotals).forEach(([yacht, total]) => {
            tableHTML += `
                <tr>
                    <td colspan="2">${yacht}</td>
                    <td>£${total.toLocaleString()}</td>
                </tr>
            `;
        });

        tableHTML += `
            <tr>
                <td colspan="2"><strong>Grand Total</strong></td>
                <td><strong>£${grandTotal.toLocaleString()}</strong></td>
            </tr>
            </tfoot>
        `;

        return tableHTML;
    }

    renderSkippers() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data) return;
        
        dashboard.innerHTML = `
            <div class="skipper-stats">
                <h2>Skipper Activity</h2>
                ${this.generateSkipperTable()}
            </div>
        `;
    }

    generateSkipperTable() {
        if (!this.data || !this.data.skipper_stats) return '';
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Skipper</th>
                        <th>Total Days</th>
                        <th>Yachts</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let totalDays = 0;
        Object.entries(this.data.skipper_stats).sort().forEach(([skipper, stats]) => {
            const yachtDetails = Object.entries(stats.yachts)
                .map(([yacht, days]) => `${yacht}: ${days}d`)
                .join(', ');
            
            totalDays += stats.total_days;
            tableHTML += `
                <tr>
                    <td>${skipper}</td>
                    <td>${stats.total_days}</td>
                    <td>${yachtDetails}</td>
                </tr>
            `;
        });

        tableHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Total Skipper Days</strong></td>
                    <td><strong>${totalDays}</strong></td>
                    <td></td>
                </tr>
            </tfoot>
            </table>
        `;

        return tableHTML;
    }

    renderBookings() {
        const dashboard = document.querySelector('#dashboard');
        if (!this.data) return;
        
        dashboard.innerHTML = `
            <div class="bookings-list">
                <h2>All Bookings</h2>
                ${this.generateBookingsTable()}
            </div>
        `;
    }

    generateBookingsTable() {
        if (!this.data || !this.data.bookings) return '';
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Yacht</th>
                        <th>Booking Ref</th>
                        <th>Customer</th>
                        <th>Dates</th>
                        <th>Skipper</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.data.bookings.forEach(booking => {
            tableHTML += `
                <tr>
                    <td>${booking.yacht_name}</td>
                    <td>${booking.booking_ref}</td>
                    <td>${booking.customer_name}</td>
                    <td>${booking.start_date} to ${booking.end_date}</td>
                    <td>${booking.skipper_details}</td>
                    <td>£${booking.price.toLocaleString()} (${booking.price_explanation})</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        return tableHTML;
    }
}

// Initialize the dashboard
const dashboard = new DashboardManager();