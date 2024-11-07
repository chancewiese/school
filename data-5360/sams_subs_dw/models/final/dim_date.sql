{{ config(materialized = 'table', schema = 'dw_sams_subs')}}

SELECT DISTINCT
    order_date as date_id,
    DAY(order_date) as day,
    MONTH(order_date) as month,
    YEAR(order_date) as year,
    QUARTER(order_date) as quarter,
    order_date as date
FROM {{ source('raw_data', '"ORDER"') }}