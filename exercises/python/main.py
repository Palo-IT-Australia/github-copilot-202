import csv
import os
import tempfile
from data_processor import generate_report

PRODUCTS = ['Keyboard', 'Monitor', 'Mouse', 'Headset', 'Webcam']
REGIONS = ['APAC', 'EMEA', 'AMER']

def generate_sample_csv(path):
    import random
    from datetime import date, timedelta
    random.seed(42)
    rows = []
    start = date(2024, 1, 1)
    for i in range(200):
        d = start + timedelta(days=random.randint(0, 364))
        rows.append({
            'date': d.strftime('%Y-%m-%d'),
            'product': random.choice(PRODUCTS),
            'region': random.choice(REGIONS),
            'quantity': random.randint(1, 20),
            'unit_price': round(random.uniform(20, 500), 2),
        })
    with open(path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['date', 'product', 'region', 'quantity', 'unit_price'])
        writer.writeheader()
        writer.writerows(rows)

if __name__ == '__main__':
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False, mode='w') as f:
        csv_path = f.name

    try:
        generate_sample_csv(csv_path)
        report = generate_report(csv_path)

        print('=== Sales Report Demo ===\n')
        print(f"Total records : {report['total_records']}")
        print(f"Total revenue : ${report['total_revenue']:,.2f}")

        print('\nRevenue by region:')
        for region, stats in report['by_region'].items():
            print(f"  {region}: ${stats['total']:,.2f} ({stats['transactions']} transactions, avg ${stats['mean']:,.2f})")

        print('\nTop products:')
        for p in report['top_products']:
            print(f"  {p['product']}: ${p['revenue']:,.2f}")

        print('\nMonthly trend:')
        for month, revenue in report['monthly_trend'].items():
            print(f"  {month}: ${revenue:,.2f}")
    finally:
        os.unlink(csv_path)
