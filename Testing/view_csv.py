import csv

filename = "Testing/Hostel_details.csv"
fields = []
rows = []
with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    fields = next(csvreader)
    for row in csvreader:
        rows.append(row)
    print("Total no. of rows: %d" % (csvreader.line_num-4))
for row in rows:
    for n, col in enumerate(row[1:-1], start=1):
        print(n, end=": ")
        if col.strip() != "":
            print("%5s" % col, end=" ")
        else: print("%5s" % 0, end=" ")
    print('\n')