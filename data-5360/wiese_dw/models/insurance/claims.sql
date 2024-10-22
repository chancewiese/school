{{ config(
    materialized = 'table',
    schema = 'dw_insurance'   
)}}

SELECT
    c.firstname as customer_first_name,
    c.lastname as customer_last_name,
    c.dob as customer_dob,
    c.zipcode as customer_zipcode,
    a.firstname as agent_first_name,
    a.lastname as agent_last_name,
    d.date_day as date_of_claim,
    f.claimamount
FROM {{ ref('fact_claim') }} f
LEFT JOIN {{ ref('dim_agent') }} a ON f.agent_key = a.agent_key
LEFT JOIN {{ ref('dim_customer') }} c ON f.customer_key = c.customer_key
LEFT JOIN {{ ref('dim_date') }} d ON f.date_key = d.date_key