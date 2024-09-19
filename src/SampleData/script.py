import json

def calculate_confidence_band(low, high):
    return high - low

def add_confidence_band(source_data, target_data):
    # Create a dictionary of confidence intervals from source data
    confidence_intervals = {
        event['title']: event['confidenceInterval']
        for patient in source_data
        for event in patient['adverseEvents']
    }

    # Add confidence band to target data
    for patient in target_data:
        for event in patient['adverseEvents']:
            if event['title'] in confidence_intervals:
                ci = confidence_intervals[event['title']]
                confidence_band = calculate_confidence_band(ci['low'], ci['high'])
                event['confidenceBand'] = round(confidence_band, 2)

    return target_data

def load_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def save_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=2)

# Load source data from patientView.json
source_data = load_json('patientView.json')

# Load target data from aggregate.json
target_data = load_json('aggregate.json')

# Add confidence band to target data
updated_data = add_confidence_band(source_data, target_data)

# Save the updated data to a new JSON file
save_json(updated_data, 'updated_aggregate.json')

print("Updated data has been saved to 'updated_aggregate.json'")