{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT
    employee_id,
    first_name,
    last_name,
    birthdate
FROM {{ source('raw_data', 'EMPLOYEE') }}