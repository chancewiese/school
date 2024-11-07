# Sam's Subs Data Warehouse Implementation

### Source Configuration

Create `_src_final.yml` to define source tables:

```yml
version: 2

sources:
   - name: raw_data
     database: GROUP8PROJECT
     schema: RAW_DATA
     tables:
        - name: "CUSTOMER"
        - name: "EMPLOYEE"
        - name: '"ORDER"'
        - name: "ORDER_LINE"
        - name: "PRODUCT"
        - name: "SANDWICH"
        - name: "STORE"
```

### Schema Configuration

Create `_schema_final.yml`:

```yaml
version: 2

models:
   - name: dim_customer
     description: "Customer Dimension"
     columns:
        - name: customer_id
          tests:
             - unique
             - not_null
        - name: first_name
        - name: last_name
        - name: birthdate
        - name: phone

   - name: dim_employee
     description: "Employee Dimension"
     columns:
        - name: employee_id
          tests:
             - unique
             - not_null
        - name: first_name
        - name: last_name
        - name: birthdate

   - name: dim_product
     description: "Product Dimension"
     columns:
        - name: product_id
          tests:
             - unique
             - not_null
        - name: type
        - name: name
        - name: cost
        - name: calories
        - name: sandwich_length
        - name: bread_type

   - name: dim_location
     description: "Location Dimension"
     columns:
        - name: location_id
          tests:
             - unique
             - not_null
        - name: location_type
        - name: address
        - name: state
        - name: zip

   - name: dim_order
     description: "Order Dimension"
     columns:
        - name: order_id
          tests:
             - unique
             - not_null
        - name: order_method

   - name: dim_date
     description: "Date Dimension"
     columns:
        - name: date_id
          tests:
             - unique
             - not_null
        - name: day
        - name: month
        - name: year
        - name: quarter
        - name: date

   - name: fact_order_lines
     description: "Order Line Fact"
     columns:
        - name: order_line_id
          tests:
             - unique
             - not_null
        - name: order_id
        - name: customer_id
        - name: employee_id
        - name: location_id
        - name: date_id
        - name: product_id
        - name: quantity
        - name: total_price
        - name: points_earned

   - name: fact_inventory_transaction
     description: "Inventory Transaction Fact"
     columns:
        - name: location_id
        - name: product_id
        - name: date_id
        - name: transaction_type_id
        - name: quantity
```

### Dimension Models

#### Customer Dimension

Create `dim_customer.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    customer_id,
    first_name,
    last_name,
    birthdate,
    phone
FROM {{ source('raw_data', 'CUSTOMER') }}
```

#### Product Dimension

Create `dim_product.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    p.product_id,
    p.type as product_type,
    p.name as product_name,
    p.cost as product_cost,
    p.calories as product_calories,
    s.length as sandwich_length,
    s.bread_type
FROM {{ source('raw_data', 'PRODUCT') }} p
LEFT JOIN {{ source('raw_data', 'SANDWICH') }} s
    ON p.product_id = s.product_id
```

#### Location Dimension

Create `dim_location.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    store_id as location_id,
    'STORE' as location_type,
    address,
    state,
    city,
    zip
FROM {{ source('raw_data', 'STORE') }}
```

#### Date Dimension

Create `dim_date.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT DISTINCT
    order_date as date_id,
    DAY(order_date) as day,
    MONTH(order_date) as month,
    YEAR(order_date) as year,
    QUARTER(order_date) as quarter,
    order_date as date
FROM {{ source('raw_data', '"ORDER"') }}
```

#### Order Dimension

Create `dim_order.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs') }}

SELECT DISTINCT
    order_number AS order_id,
    method AS order_method
FROM {{ source('raw_data', '"ORDER"') }}
```

#### Employee Dimension

Create `dim_employee.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    employee_id,
    first_name,
    last_name,
    birthdate
FROM {{ source('raw_data', 'EMPLOYEE') }}
```

### Fact Tables

#### Order Lines Fact

Create `fact_order_lines.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    ol.order_line_id,
    ol.order_number as order_id,
    o.customer_id,
    o.employee_id,
    o.store_id as location_id,
    o.order_date as date_id,
    ol.product_id,
    ol.quantity,
    ol.price as total_price,
    ol.price as points_earned
FROM {{ source('raw_data', 'ORDER_LINE') }} ol
JOIN {{ source('raw_data', '"ORDER"') }} o
    ON ol.order_number = o.order_number
```

#### Inventory Transaction Fact

Create `fact_inventory_transaction.sql`:

```sql
{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    store_id as location_id,
    product_id,
    CURRENT_DATE() as date_id,
    NULL as transaction_type_id,
    0 as quantity
FROM {{ source('raw_data', 'STORE') }}
CROSS JOIN {{ source('raw_data', 'PRODUCT') }}
WHERE 1=0
```

### Building the Models

Run these commands in sequence to build the models:

1. Test the dbt configuration:

```bash
dbt debug
```

2. Run all models:

```bash
dbt run
```

Or run individual models:

```bash
dbt run --models dim_customer
dbt run --models dim_product
dbt run --models dim_location
dbt run --models dim_date
dbt run --models dim_order
dbt run --models dim_employee
dbt run --models fact_order_lines
dbt run --models fact_inventory_transaction
```

3. Test the models:

```bash
dbt test
```
