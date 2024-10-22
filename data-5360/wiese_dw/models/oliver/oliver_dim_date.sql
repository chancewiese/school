{{ config(
    materialized = 'table',
    schema = 'dw_oliver'   
)}}

SELECT DISTINCT
    order_date as date_key,
    order_date as date_id,
    DAYOFWEEK(order_date) as dayofweek,
    DATE_PART('month', order_date) as month,
    DATE_PART('quarter', order_date) as quarter,
    DATE_PART('year', order_date) as year
FROM {{ source('oliver_landing', 'orders') }}