{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    customer_id,
    first_name,
    last_name,
    birthdate,
    phone
FROM {{ source('raw_data', 'CUSTOMER') }}