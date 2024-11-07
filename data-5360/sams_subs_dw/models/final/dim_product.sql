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