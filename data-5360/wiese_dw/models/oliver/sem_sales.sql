{{ config(
    materialized = 'table',
    schema = 'dw_oliver'   
)}}

SELECT 
    f.order_line_id,
    CONCAT(c.firstname, ' ', c.lastname) as customer_name,
    c.email as customer_email,
    c.state as customer_state,
    d.date_key as sale_date,
    d.month as sale_month,
    d.quarter as sale_quarter,
    d.year as sale_year,
    CONCAT(e.firstname, ' ', e.lastname) as employee_name,
    e.position as employee_position,
    p.product_name,
    p.description as product_description,
    s.store_name,
    s.city as store_city,
    s.state as store_state,
    f.quantity,
    f.unit_price,
    f.dollars_sold as total_amount
FROM {{ ref('fact_sales') }} f
JOIN {{ ref('oliver_dim_customer') }} c ON f.cust_key = c.cust_key
JOIN {{ ref('oliver_dim_date') }} d ON f.date_key = d.date_key
JOIN {{ ref('oliver_dim_employee') }} e ON f.employee_key = e.employee_key
JOIN {{ ref('oliver_dim_product') }} p ON f.product_key = p.product_key
JOIN {{ ref('oliver_dim_store') }} s ON f.store_key = s.store_key