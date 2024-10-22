{{ config(
    materialized = 'table',
    schema = 'dw_oliver'   
)}}

SELECT 
    ol.order_line_id,
    o.customer_id as cust_key,
    o.order_date as date_key,
    o.store_id as store_key,
    ol.product_id as product_key,
    o.employee_id as employee_key,
    ol.quantity,
    ol.unit_price,
    (ol.quantity * ol.unit_price) as dollars_sold
FROM {{ source('oliver_landing', 'orders') }} o
JOIN {{ source('oliver_landing', 'orderline') }} ol ON o.order_id = ol.order_id