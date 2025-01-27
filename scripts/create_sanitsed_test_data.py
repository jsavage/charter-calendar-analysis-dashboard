import json

# Helper function to truncate strings and add ellipsis
def truncate_string(s, length=6):
    """Truncates string to specified length and adds '...' if truncated"""
    return s[:length] + '...' if len(s) > length else s

# Load the original calendar data from JSON file
with open('data/calendar_data.json', 'r') as f:
    source_data = json.load(f)

# Create new test data structure with truncated personal information
test_data = {
    # Process each booking, truncating personal data while preserving other fields
    'bookings': [{
        **booking,  # Spread operator to copy all existing booking fields
        'customer_name': truncate_string(booking['customer_name']),
        'customer_phone': truncate_string(booking['customer_phone']),
        'skipper_details': truncate_string(booking['skipper_details'])
    } for booking in source_data['bookings']],  # List comprehension for all bookings
    
    # Keep monthly statistics unchanged as they contain no personal data
    'monthly_stats': source_data['monthly_stats'],
    
    # Create new skipper stats with truncated skipper names as keys
    'skipper_stats': {
        truncate_string(skipper): stats  # Truncate skipper names
        for skipper, stats in source_data['skipper_stats'].items()
    }
}

# Write the transformed data to sanitised_calendar_data.json with pretty printing
with open('data/sanitised_calendar_data.json', 'w') as f:
    json.dump(test_data, f, indent=2)  # indent=2 for readable formatting
