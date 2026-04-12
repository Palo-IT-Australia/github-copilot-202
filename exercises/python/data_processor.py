import csv
import statistics
from collections import defaultdict
from datetime import datetime


def load_sales(filepath):
    records = []
    with open(filepath, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            quantity = int(row['quantity'])
            unit_price = float(row['unit_price'])
            records.append({
                'date': datetime.strptime(row['date'], '%Y-%m-%d'),
                'product': row['product'],
                'region': row['region'],
                'quantity': quantity,
                'unit_price': unit_price,
                'revenue': quantity * unit_price,
            })
    return records


def summarise_by_region(records):
    buckets = defaultdict(list)
    for r in records:
        buckets[r['region']].append(r['revenue'])
    return {
        region: {
            'total': round(sum(vals), 2),
            'mean': round(statistics.mean(vals), 2),
            'transactions': len(vals),
        }
        for region, vals in buckets.items()
    }


def top_products(records, n=5):
    totals = defaultdict(float)
    for r in records:
        totals[r['product']] += r['revenue']
    ranked = sorted(totals.items(), key=lambda x: x[1], reverse=True)
    return [{'product': p, 'revenue': round(v, 2)} for p, v in ranked[:n]]


def monthly_trend(records):
    buckets = defaultdict(float)
    for r in records:
        key = r['date'].strftime('%Y-%m')
        buckets[key] += r['revenue']
    return {k: round(v, 2) for k, v in sorted(buckets.items())}


def generate_report(filepath):
    records = load_sales(filepath)
    total_revenue = sum(r['revenue'] for r in records)
    return {
        'total_records': len(records),
        'total_revenue': round(total_revenue, 2),
        'by_region': summarise_by_region(records),
        'top_products': top_products(records),
        'monthly_trend': monthly_trend(records),
    }
