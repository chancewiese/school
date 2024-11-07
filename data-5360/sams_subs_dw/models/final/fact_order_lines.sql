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
    ol.price as points_earned -- Feedback suggested points earned should be equal to amount spent
FROM {{ source('raw_data', 'ORDER_LINE') }} ol
JOIN {{ source('raw_data', '"ORDER"') }} o 
    ON ol.order_number = o.order_number