import json

def check_patient_file(filename):
    # Load the JSON file
    with open(filename, 'r') as file:
        patient = json.load(file)

    # Iterate through the adverse events
    for event in patient.get('adverseEvents', []):
        riskscore = event.get('riskScore', 0)
        confidenceInterval = event.get('confidenceInterval', {}).get('high', 0)
        adverseevent = event.get('title', '')

        # Check the conditions
        if (riskscore > 0.4 or confidenceInterval > 0.4) and adverseevent not in ["Long Length of Stay", "Short Length of Stay"]:
            print(f"Patient: {patient.get('patientName', 'Unknown')}, Adverse Event: {adverseevent}, Risk Score: {riskscore}, Confidence Interval: {confidenceInterval}")

# Example usage
check_patient_file('singlePatientsView_573.json')
