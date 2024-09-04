import csv
import json

filename = "Testing/Hostel_details.csv"
hostel_data = []

with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    fields = next(csvreader)
    for idx, row in enumerate(csvreader, start=1):
        hostel = {
            "id": idx,
            "hostel_name": row[1],
            "owner_name": row[2],
            "price": row[16] if row[16] else row[13] if row[13] else "N/A",
            "contact_no": row[3],
            "whatsapp_no": row[4],
            "food": row[19],
            "deposit": row[5],
            "distance": f"{row[6]}km",
            "gender": row[8],
            "seats": {"boys": row[9] if row[9] else "0", "girls": row[10] if row[10] else "0"},
            "images": [i.strip() for i in row[18].split(";")],
            "links": [i.strip() for i in row[7].split(",")],
            "common_details": {
                "wifi": "Yes" if "Wifi" in row[11] else "No",
                "washing_machines": "Yes" if "Washing Machine" in row[11] else "No",
                "filtered_water": "Yes" if "Filtered Water" in row[11] else "No",
                "hot_water": "Yes" if "Hot Water" in row[11] else "No",
                "parking": "Yes" if "Parking" in row[11] else "No",
                "security": "Yes" if "Security" in row[11] else "No",
                "cctv": "Yes" if "CCTV" in row[11] else "No",
                "iron_box": "Yes" if "Iron box" in row[11] else "No",
                "common_bathroom": "Yes" if "Common Bathroom" in row[11] else "No",
                "NOTA": "Yes" if "None of the Above" in row[11] else "No"
            },
            "single_room": {
                "available": "Yes" if row[12] == "Yes" else "No",
                "price": row[13] if row[13] else "N/A",
                "bed_type": {
                    "single": {"available": "Yes" if "Single Bed" in row[12].split(";") else "No"},
                    "double": {"available": "Yes" if "Double Bed" in row[12].split(";") else "No"}
                },
                "options_available": {
                    "ac": "Yes" if "AC" in row[14] else "No",
                    "furniture": "Yes" if "Furniture" in row[14] else "No",
                    "private_bathroom": "Yes" if "Attached Bathroom" in row[14] else "No"
                }
            },
            "shared_room": {
                "available": "Yes" if row[15] == "Yes" else "No",
                "price": row[16] if row[16] else "N/A",
                "bed_type": {
                    "single": {"available": "Yes" if "Single Bed" in row[17].split(";") else "No"},
                    "double": {"available": "Yes" if "Double Bed" in row[17].split(";") else "No"}
                },
                "options_available": {
                    "ac": "Yes" if "AC" in row[17] else "No",
                    "furniture": "Yes" if "Furniture" in row[17] else "No",
                    "private_bathroom": "Yes" if "Attached Bathroom" in row[17] else "No"
                }
            }
        }
        hostel_data.append(hostel)

# Output JSON data
with open("hostel_details.json", 'w') as jsonfile:
    json.dump(hostel_data, jsonfile, indent=4)

print(f"JSON data successfully written to hostel_details.json")
