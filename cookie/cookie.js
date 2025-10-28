// @name   cccc

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];

if (ua.includes("Cookie")) {
  const obj = {
    "request_date_ms": 1761358768429,
    "request_date": "2025-10-25T02:19:28Z",
    "environment": "Production",
    "subscriber": {
      "non_subscriptions": {},
      "first_seen": "2025-09-15T08:18:22Z",
      "original_application_version": "625",
      "other_purchases": {},
      "management_url": "https://apps.apple.com/account/subscriptions",
      "subscriptions": {
        "app.ft.Bookkeeping.lifetime": {
          "original_purchase_date": "2025-10-19T02:58:00Z",
          "expires_date": null,
          "is_sandbox": false,
          "refunded_at": null,
          "store_transaction_id": "470002723862804",
          "unsubscribe_detected_at": null,
          "grace_period_expires_date": null,
          "period_type": "lifetime",
          "price": {
            "amount": 98,
            "currency": "CNY"
          },
          "purchase_date": "2025-10-19T02:57:56Z",
          "display_name": "Lifetime Access",
          "billing_issues_detected_at": null,
          "ownership_type": "PURCHASED",
          "store": "app_store",
          "auto_resume_date": null
        }
      },
      "entitlements": {
        "allaccess": {
          "grace_period_expires_date": null,
          "purchase_date": "2025-10-19T02:57:56Z",
          "product_identifier": "app.ft.Bookkeeping.lifetime",
          "expires_date": null
        }
      },
      "original_purchase_date": "2025-10-19T02:58:00Z",
      "original_app_user_id": "_30d9b2f767d69f0ca4a60d921ab15a56",
      "last_seen": "2025-10-25T02:17:52Z"
    }
  };

  $done({
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj)
  });
} else {
  $done({});
}
