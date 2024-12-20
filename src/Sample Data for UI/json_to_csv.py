import json
import os
import logging
import csv
from typing import Dict, List

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def read_json_file(filepath: str) -> dict:
    """Read and parse a JSON file."""
    logger.info(f"Reading file: {filepath}")
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"File not found: {filepath}")
        raise
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON in file: {filepath}")
        raise
    except Exception as e:
        logger.error(f"Error reading file {filepath}: {str(e)}")
        raise

def flatten_patient_data(patient_data: dict) -> List[dict]:
    """
    Flatten patient data for CSV format.
    Each adverse event will become a separate row.
    """
    flattened_data = []
    
    for event in patient_data['adverseEvents']:
        row = {
            'patientId': patient_data['patientId'],
            'patientName': patient_data['patientName'],
            'roomNumber': patient_data['roomNumber'],
            'timeStamp': patient_data['timeStamp'],
            'adverseEventTitle': event['title'],
            'riskScore': event['riskScore']
        }
        
        # Add confidence interval if it exists
        if 'confidenceInterval' in event:
            row['confidenceInterval_low'] = event['confidenceInterval']['low']
            row['confidenceInterval_high'] = event['confidenceInterval']['high']
        else:
            row['confidenceInterval_low'] = ''
            row['confidenceInterval_high'] = ''
            
        flattened_data.append(row)
    
    return flattened_data

def process_patient_data(
    aggregate_filepath: str,
    single_patient_dir: str,
    output_json_filepath: str,
    output_csv_filepath: str
) -> None:
    """
    Process patient data to combine aggregate view with confidence intervals
    from individual patient files and output both JSON and CSV formats.
    """
    try:
        # Verify paths exist
        if not os.path.exists(aggregate_filepath):
            raise FileNotFoundError(f"Aggregate file not found: {aggregate_filepath}")
        if not os.path.exists(single_patient_dir):
            raise FileNotFoundError(f"Patient directory not found: {single_patient_dir}")
        
        logger.info(f"Reading aggregate data from: {aggregate_filepath}")
        aggregate_data = read_json_file(aggregate_filepath)
        
        # Create a mapping of patient IDs to their detailed files
        patient_files = {}
        logger.info(f"Scanning directory: {single_patient_dir}")
        for filename in os.listdir(single_patient_dir):
            if filename.startswith('singlePatientsView_') and filename.endswith('.json'):
                patient_id = filename.replace('singlePatientsView_', '').replace('.json', '')
                patient_files[patient_id] = os.path.join(single_patient_dir, filename)
        
        logger.info(f"Found {len(patient_files)} patient files")
        
        # Process each patient in the aggregate view
        processed_count = 0
        flattened_data = []
        
        for patient in aggregate_data:
            patient_id = str(patient['patientId'])
            logger.info(f"Processing patient {patient_id}")
            
            if patient_id not in patient_files:
                logger.warning(f"No detailed file found for patient {patient_id}")
                continue
                
            detailed_data = read_json_file(patient_files[patient_id])
            
            # Create a mapping of adverse events to their confidence intervals
            confidence_intervals = {}
            for event in detailed_data.get('adverseEvents', []):
                if 'title' in event and 'confidenceInterval' in event:
                    confidence_intervals[event['title']] = event['confidenceInterval']
            
            # Update each adverse event in the aggregate view with its confidence interval
            for event in patient['adverseEvents']:
                if event['title'] in confidence_intervals:
                    event['confidenceInterval'] = confidence_intervals[event['title']]
            
            # Flatten the data for CSV
            flattened_data.extend(flatten_patient_data(patient))
            
            processed_count += 1
            if processed_count % 10 == 0:
                logger.info(f"Processed {processed_count} patients")
        
        # Write JSON output
        logger.info(f"Writing JSON output to: {output_json_filepath}")
        with open(output_json_filepath, 'w') as f:
            json.dump(aggregate_data, f, indent=2)
        
        # Write CSV output
        logger.info(f"Writing CSV output to: {output_csv_filepath}")
        if flattened_data:
            fieldnames = flattened_data[0].keys()
            with open(output_csv_filepath, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(flattened_data)
            
        logger.info("Processing complete!")
        logger.info(f"Processed {processed_count} patients total")
        
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}")
        raise

if __name__ == '__main__':
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set up file paths relative to the current directory
    aggregate_filepath = os.path.join(current_dir, 'aggregatePatientsView.json')
    single_patient_dir = current_dir  # assuming patient files are in the same directory
    output_json_filepath = os.path.join(current_dir, 'enhanced_patients_view.json')
    output_csv_filepath = os.path.join(current_dir, 'enhanced_patients_view.csv')
    
    logger.info("Starting patient data processing")
    logger.info(f"Current directory: {current_dir}")
    logger.info(f"Aggregate file: {aggregate_filepath}")
    logger.info(f"Patient directory: {single_patient_dir}")
    logger.info(f"JSON output file: {output_json_filepath}")
    logger.info(f"CSV output file: {output_csv_filepath}")
    
    process_patient_data(
        aggregate_filepath=aggregate_filepath,
        single_patient_dir=single_patient_dir,
        output_json_filepath=output_json_filepath,
        output_csv_filepath=output_csv_filepath
    )