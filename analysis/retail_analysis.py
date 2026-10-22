import pandas as pd
import random
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

random.seed(42)


# -----------------------------
# PRODUCTS
# -----------------------------

products = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Headphones",
    "Printer",
    "External Hard Drive",
    "Webcam"
]


categories = [
    "Computing",
    "Mobile",
    "Mobile",
    "Computing",
    "Accessories",
    "Accessories",
    "Accessories",
    "Office",
    "Storage",
    "Accessories"
]


# -----------------------------
# LOCATIONS
# -----------------------------

locations = {
    "Gauteng": [
        "Johannesburg",
        "Pretoria",
        "Soweto",
        "Benoni"
    ],
    "KwaZulu-Natal": [
        "Durban",
        "Pietermaritzburg",
        "Richards Bay"
    ],
    "Western Cape": [
        "Cape Town",
        "Stellenbosch",
        "George"
    ],
    "Eastern Cape": [
        "Gqeberha",
        "East London",
        "Mthatha"
    ],
    "Limpopo": [
        "Polokwane",
        "Thohoyandou",
        "Tzaneen"
    ],
    "Mpumalanga": [
        "Mbombela",
        "Nelspruit",
        "Secunda"
    ],
    "North West": [
        "Rustenburg",
        "Mahikeng",
        "Klerksdorp"
    ],
    "Free State": [
        "Bloemfontein",
        "Welkom",
        "Bethlehem"
    ],
    "Northern Cape": [
        "Kimberley",
        "Upington",
        "Kuruman"
    ]
}


# -----------------------------
# CUSTOMER SEGMENTS
# -----------------------------

customer_segments = [
    "Consumer",
    "Corporate",
    "Small Business"
]


# -----------------------------
# PRODUCT PRICES
# -----------------------------

prices = {
    "Laptop": 12500,
    "Smartphone": 8500,
    "Tablet": 5500,
    "Monitor": 4200,
    "Keyboard": 850,
    "Mouse": 450,
    "Headphones": 1200,
    "Printer": 2800,
    "External Hard Drive": 1800,
    "Webcam": 950
}


# -----------------------------
# PRODUCT COSTS
# -----------------------------

costs = {
    "Laptop": 9000,
    "Smartphone": 6200,
    "Tablet": 3900,
    "Monitor": 2900,
    "Keyboard": 500,
    "Mouse": 250,
    "Headphones": 700,
    "Printer": 1900,
    "External Hard Drive": 1100,
    "Webcam": 550
}


# -----------------------------
# DATE RANGE
# -----------------------------

start_date = datetime(2025, 1, 1)
end_date = datetime(2025, 12, 31)

number_of_orders = 2000

orders = []


# -----------------------------
# GENERATE ORDERS
# -----------------------------

for order_number in range(1, number_of_orders + 1):

    product = random.choice(products)

    category = categories[products.index(product)]

    province = random.choice(list(locations.keys()))

    city = random.choice(locations[province])

    customer_segment = random.choice(customer_segments)

    quantity = random.randint(1, 5)

    order_id = f"ORD-{order_number:05d}"

    customer_id = f"CUST-{random.randint(1, 500):04d}"

    days_between = (end_date - start_date).days

    random_days = random.randint(0, days_between)

    order_date = start_date + timedelta(days=random_days)

    unit_price = prices[product]

    unit_cost = costs[product]

    sales = unit_price * quantity

    total_cost = unit_cost * quantity

    profit = sales - total_cost

    order = {
        "Order ID": order_id,
        "Order Date": order_date,
        "Customer ID": customer_id,
        "Customer Segment": customer_segment,
        "Product": product,
        "Category": category,
        "Province": province,
        "City": city,
        "Quantity": quantity,
        "Sales": sales,
        "Cost": total_cost,
        "Profit": profit
    }

    orders.append(order)


# -----------------------------
# CREATE DATAFRAME
# -----------------------------

df = pd.DataFrame(orders)


# -----------------------------
# SAVE DATASET
# -----------------------------

df.to_csv("data/retail_sales.csv", index=False)

print(f"Dataset created successfully: {len(df)} orders")


# -----------------------------
# READ DATASET
# -----------------------------

df = pd.read_csv(
    "data/retail_sales.csv",
    parse_dates=["Order Date"]
)


print(df.head())


# -----------------------------
# OVERALL PERFORMANCE
# -----------------------------

total_sales = df["Sales"].sum()

print(f"Total Sales: R{total_sales:,.2f}")


total_profit = df["Profit"].sum()

print(f"Total Profit: R{total_profit:,.2f}")


profit_margin = (total_profit / total_sales) * 100

print(f"Overall Profit Margin: {profit_margin:.2f}%")


# -----------------------------
# SALES BY PRODUCT
# -----------------------------

sales_by_product = (
    df.groupby("Product")["Sales"]
    .sum()
    .sort_values(ascending=False)
)

print("\nSales by Product:")

print(sales_by_product)


# -----------------------------
# PROFIT BY PRODUCT
# -----------------------------

profit_by_product = (
    df.groupby("Product")["Profit"]
    .sum()
    .sort_values(ascending=False)
)

print("\nProfit by Product:")

print(profit_by_product)


# -----------------------------
# MONTHLY SALES
# -----------------------------

monthly_sales = (
    df.groupby(
        df["Order Date"].dt.to_period("M")
    )["Sales"]
    .sum()
)

print("\nMonthly Sales:")

print(monthly_sales)

# -----------------------------
# MONTHLY SALES CHART
# -----------------------------

monthly_sales.index = monthly_sales.index.astype(str)

plt.figure(figsize=(10, 5))

plt.plot(
    monthly_sales.index,
    monthly_sales.values,
    marker="o"
)

plt.title("ASEIX DATA HOUSE | Monthly Sales Performance")
plt.xlabel("Month")
plt.ylabel("Sales (R)")

plt.xticks(rotation=45)

plt.tight_layout()

plt.savefig(
    "analysis/monthly_sales.png",
    dpi=150,
    bbox_inches="tight"
)

print("\nMonthly sales chart saved to analysis/monthly_sales.png")

# -----------------------------
# SALES BY CUSTOMER SEGMENT
# -----------------------------

sales_by_segment = (
    df.groupby("Customer Segment")["Sales"]
    .sum()
    .sort_values(ascending=False)
)

print("\nSales by Customer Segment:")

print(sales_by_segment)


# -----------------------------
# PROFIT BY CUSTOMER SEGMENT
# -----------------------------

profit_by_segment = (
    df.groupby("Customer Segment")["Profit"]
    .sum()
    .sort_values(ascending=False)
)

print("\nProfit by Customer Segment:")

print(profit_by_segment)


# -----------------------------
# SALES BY PROVINCE
# -----------------------------

sales_by_province = (
    df.groupby("Province")["Sales"]
    .sum()
    .sort_values(ascending=False)
)

print("\nSales by Province:")

print(sales_by_province)


# -----------------------------
# PROFIT BY PROVINCE
# -----------------------------

profit_by_province = (
    df.groupby("Province")["Profit"]
    .sum()
    .sort_values(ascending=False)
)

print("\nProfit by Province:")

print(profit_by_province)


# -----------------------------
# PROFIT MARGIN BY PRODUCT
# -----------------------------

profit_margin_by_product = (
    df.groupby("Product")
    .agg(
        Sales=("Sales", "sum"),
        Profit=("Profit", "sum")
    )
)


profit_margin_by_product["Profit Margin"] = (
    profit_margin_by_product["Profit"]
    / profit_margin_by_product["Sales"]
    * 100
)


profit_margin_by_product = (
    profit_margin_by_product
    .sort_values(
        "Profit Margin",
        ascending=False
    )
)


print("\nProfit Margin by Product:")

print(profit_margin_by_product)

# -----------------------------
# EXPORT DASHBOARD DATA
# -----------------------------

import json
from pathlib import Path


# Calculate key performance indicators

total_orders = len(df)

total_customers = df["Customer ID"].nunique()

total_products = df["Product"].nunique()

total_provinces = df["Province"].nunique()


# Calculate monthly sales for the dashboard

monthly_sales_data = (
    df.groupby(df["Order Date"].dt.month)["Sales"]
    .sum()
    .reset_index()
)

monthly_sales_data.columns = ["month", "sales"]


# Calculate sales by product

sales_by_product_data = (
    df.groupby("Product")["Sales"]
    .sum()
    .sort_values(ascending=False)
    .reset_index()
)

sales_by_product_data.columns = ["product", "sales"]


# Calculate profit by product

profit_by_product_data = (
    df.groupby("Product")["Profit"]
    .sum()
    .sort_values(ascending=False)
    .reset_index()
)

profit_by_product_data.columns = ["product", "profit"]


# Calculate sales by province

sales_by_province_data = (
    df.groupby("Province")["Sales"]
    .sum()
    .sort_values(ascending=False)
    .reset_index()
)

sales_by_province_data.columns = ["province", "sales"]


# Calculate sales by customer segment

sales_by_segment_data = (
    df.groupby("Customer Segment")["Sales"]
    .sum()
    .sort_values(ascending=False)
    .reset_index()
)

sales_by_segment_data.columns = ["segment", "sales"]


# Build the dashboard data structure

dashboard_data = {
    "summary": {
        "totalSales": round(float(total_sales), 2),
        "totalProfit": round(float(total_profit), 2),
        "profitMargin": round(float(profit_margin), 2),
        "totalOrders": int(total_orders),
        "totalCustomers": int(total_customers),
        "totalProducts": int(total_products),
        "totalProvinces": int(total_provinces)
    },

    "monthlySales": monthly_sales_data.to_dict(orient="records"),

    "salesByProduct": sales_by_product_data.to_dict(orient="records"),

    "profitByProduct": profit_by_product_data.to_dict(orient="records"),

    "salesByProvince": sales_by_province_data.to_dict(orient="records"),

    "salesBySegment": sales_by_segment_data.to_dict(orient="records")
}


# Create the output folder if necessary

output_path = Path("public/data/retail_dashboard.json")

output_path.parent.mkdir(parents=True, exist_ok=True)


# Export the dashboard data

with output_path.open("w", encoding="utf-8") as file:
    json.dump(dashboard_data, file, indent=2)


print(f"\nDashboard data exported successfully: {output_path}")