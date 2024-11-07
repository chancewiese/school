{{ config(materialized = 'table', schema = 'dw_sams_subs') }}

SELECT DISTINCT
    order_number AS order_id,
    method AS order_method
FROM {{ source('raw_data', '"ORDER"') }}