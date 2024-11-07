{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    store_id as location_id,
    'STORE' as location_type,
    address,
    state,
    city,
    zip
FROM {{ source('raw_data', 'STORE') }}