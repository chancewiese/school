{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

-- Placeholder because we don't have inventory data
SELECT
    store_id as location_id,
    product_id,
    CURRENT_DATE() as date_id,
    NULL as transaction_type_id,
    0 as quantity
FROM {{ source('raw_data', 'STORE') }}
CROSS JOIN {{ source('raw_data', 'PRODUCT') }}
WHERE 1=0  -- Return empty because it's a placeholder