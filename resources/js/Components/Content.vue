<script setup>

const content = {
  "object": {
    "id": "in_1RGELWHUBkZCOWcvYded47oY",
    "object": "invoice",
    "account_country": "GB",
    "account_name": "lpf",
    "account_tax_ids": null,
    "amount_due": 6000,
    "amount_overpaid": 0,
    "amount_paid": 6000,
    "amount_remaining": 0,
    "amount_shipping": 0,
    "application": null,
    "application_fee_amount": null,
    "attempt_count": 1,
    "attempted": true,
    "auto_advance": false,
    "automatic_tax": {
      "disabled_reason": null,
      "enabled": false,
      "liability": null,
      "provider": null,
      "status": null
    },
    "automatically_finalizes_at": null,
    "billing_reason": "subscription_cycle",
    "charge": "ch_3RGELdHUBkZCOWcv0dSUnKbw",
    "collection_method": "charge_automatically",
    "created": 1745404812,
    "currency": "usd",
    "custom_fields": null,
    "customer": "cus_SAFno0lhXEoTo0",
    "customer_address": {
      "city": null,
      "country": "TW",
      "line1": null,
      "line2": null,
      "postal_code": null,
      "state": null
    },
    "customer_email": "dev@lepetitfourbakery.com",
    "customer_name": "442",
    "customer_phone": null,
    "customer_shipping": null,
    "customer_tax_exempt": "none",
    "customer_tax_ids": [
    ],
    "default_payment_method": null,
    "default_source": null,
    "default_tax_rates": [
    ],
    "description": null,
    "discount": null,
    "discounts": [
    ],
    "due_date": null,
    "effective_at": 1745408412,
    "ending_balance": 0,
    "footer": null,
    "from_invoice": null,
    "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1PLjGjHUBkZCOWcv/test_YWNjdF8xUExqR2pIVUJrWkNPV2N2LF9TQVpVRGFHblJPbk83SmkzQlBOTTJmNXB3VHl6MEY5LDEzNTc1OTY2MQ0200YXvKE8Cb?s=ap",
    "invoice_pdf": "https://pay.stripe.com/invoice/acct_1PLjGjHUBkZCOWcv/test_YWNjdF8xUExqR2pIVUJrWkNPV2N2LF9TQVpVRGFHblJPbk83SmkzQlBOTTJmNXB3VHl6MEY5LDEzNTc1OTY2MQ0200YXvKE8Cb/pdf?s=ap",
    "issuer": {
      "type": "self"
    },
    "last_finalization_error": null,
    "latest_revision": null,
    "lines": {
      "object": "list",
      "data": [
        {
          "id": "il_1RH0iuHUBkZCOWcvqlPH2GXa",
          "object": "line_item",
          "amount": 6000,
          "amount_excluding_tax": 6000,
          "currency": "usd",
          "description": "1 × Le Petit Four: Premium (biweekly delivery) (at $60.00 / every 2 weeks)",
          "discount_amounts": [
          ],
          "discountable": true,
          "discounts": [
          ],
          "invoice": "in_1RGELWHUBkZCOWcvYded47oY",
          "livemode": false,
          "metadata": {
            "subscription_uid": "1c3b812e-4781-4af4-8d0a-b2555011b4b3"
          },
          "parent": {
            "invoice_item_details": null,
            "subscription_item_details": {
              "invoice_item": null,
              "proration": false,
              "proration_details": {
                "credited_items": null
              },
              "subscription": "sub_1RFvIGHUBkZCOWcvoOmVqhte",
              "subscription_item": "si_SAFngigu0RFGf1"
            },
            "type": "subscription_item_details"
          },
          "period": {
            "end": 1746614412,
            "start": 1745404812
          },
          "plan": {
            "id": "price_1RFvHeHUBkZCOWcvIfwLaKju",
            "object": "plan",
            "active": false,
            "aggregate_usage": null,
            "amount": 6000,
            "amount_decimal": "6000",
            "billing_scheme": "per_unit",
            "created": 1745145574,
            "currency": "usd",
            "interval": "week",
            "interval_count": 2,
            "livemode": false,
            "metadata": {
            },
            "meter": null,
            "nickname": null,
            "product": "prod_QnuyfmjxxELlPQ",
            "tiers_mode": null,
            "transform_usage": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "pretax_credit_amounts": [
          ],
          "price": {
            "id": "price_1RFvHeHUBkZCOWcvIfwLaKju",
            "object": "price",
            "active": false,
            "billing_scheme": "per_unit",
            "created": 1745145574,
            "currency": "usd",
            "custom_unit_amount": null,
            "livemode": false,
            "lookup_key": null,
            "metadata": {
            },
            "nickname": null,
            "product": "prod_QnuyfmjxxELlPQ",
            "recurring": {
              "aggregate_usage": null,
              "interval": "week",
              "interval_count": 2,
              "meter": null,
              "trial_period_days": null,
              "usage_type": "licensed"
            },
            "tax_behavior": "unspecified",
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 6000,
            "unit_amount_decimal": "6000"
          },
          "pricing": {
            "price_details": {
              "price": "price_1RFvHeHUBkZCOWcvIfwLaKju",
              "product": "prod_QnuyfmjxxELlPQ"
            },
            "type": "price_details",
            "unit_amount_decimal": "6000"
          },
          "proration": false,
          "proration_details": {
            "credited_items": null
          },
          "quantity": 1,
          "subscription": "sub_1RFvIGHUBkZCOWcvoOmVqhte",
          "subscription_item": "si_SAFngigu0RFGf1",
          "tax_amounts": [
          ],
          "tax_rates": [
          ],
          "taxes": [
          ],
          "type": "subscription",
          "unit_amount_excluding_tax": "6000"
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/invoices/in_1RGELWHUBkZCOWcvYded47oY/lines"
    },
    "livemode": false,
    "metadata": {
    },
    "next_payment_attempt": null,
    "number": "450B17DC-0002",
    "on_behalf_of": null,
    "paid": true,
    "paid_out_of_band": false,
    "parent": {
      "quote_details": null,
      "subscription_details": {
        "metadata": {
          "subscription_uid": "1c3b812e-4781-4af4-8d0a-b2555011b4b3"
        },
        "subscription": "sub_1RFvIGHUBkZCOWcvoOmVqhte"
      },
      "type": "subscription_details"
    },
    "payment_intent": "pi_3RGELdHUBkZCOWcv0qh9lB8j",
    "payment_settings": {
      "default_mandate": null,
      "payment_method_options": {
        "acss_debit": null,
        "bancontact": null,
        "card": {
          "request_three_d_secure": "automatic"
        },
        "customer_balance": null,
        "konbini": null,
        "sepa_debit": null,
        "us_bank_account": null
      },
      "payment_method_types": [
        "card"
      ]
    },
    "period_end": 1745404812,
    "period_start": 1745145612,
    "post_payment_credit_notes_amount": 0,
    "pre_payment_credit_notes_amount": 0,
    "quote": null,
    "receipt_number": null,
    "rendering": null,
    "shipping_cost": null,
    "shipping_details": null,
    "starting_balance": 0,
    "statement_descriptor": null,
    "status": "paid",
    "status_transitions": {
      "finalized_at": 1745408412,
      "marked_uncollectible_at": null,
      "paid_at": 1745408412,
      "voided_at": null
    },
    "subscription": "sub_1RFvIGHUBkZCOWcvoOmVqhte",
    "subscription_details": {
      "metadata": {
        "subscription_uid": "1c3b812e-4781-4af4-8d0a-b2555011b4b3"
      }
    },
    "subtotal": 6000,
    "subtotal_excluding_tax": 6000,
    "tax": null,
    "test_clock": "clock_1RGE1CHUBkZCOWcvSRTAhcj8",
    "total": 6000,
    "total_discount_amounts": [
    ],
    "total_excluding_tax": 6000,
    "total_pretax_credit_amounts": [
    ],
    "total_tax_amounts": [
    ],
    "total_taxes": [
    ],
    "transfer_data": null,
    "webhooks_delivered_at": 1745404812
  }
};

</script>

<template>

  <div>

    <slot />

  </div>

</template>
