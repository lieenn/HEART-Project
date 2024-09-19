import json

def check_patient_file(patient_data):
    excluded_events = [
        "Long Length of Stay",
        "Short Length of Stay", # Corrected spelling
    ]
    
    for patient in patient_data:
        patient_name = patient.get('patientName', 'Unknown')
        patient_id = patient.get('patientId', 'Unknown')
        
        matching_events = []
        
        for event in patient.get('adverseEvents', []):
            risk_score = event.get('riskScore', 0)
            adverse_event_title = event.get('title', '')
            
            if risk_score > 0.6 and adverse_event_title not in excluded_events:
                matching_events.append((adverse_event_title, risk_score))
        
        if matching_events:
            print(f"Patient ID: {patient_id}, Name: {patient_name}")
            for event_title, event_score in matching_events:
                print(f"  Event: {event_title}, Risk Score: {event_score}")
            print()  # Add a blank line between patients for readability

# Example usage
with open('aggregatePatientsView.json', 'r') as file:
    patient_data = json.load(file)
    check_patient_file(patient_data)