/*
  Script: Cookie UA 永久解锁 + 防校验
  Match: User-Agent contains "Cookie"
  Action: 强制 allaccess 永久有效 + 同步关键字段
*/

(() => {
  // 1. 环境检查
  if (typeof $task === 'undefined' && typeof $httpClient === 'undefined' && typeof $loon === 'undefined') {
    $done({});
    return;
  }

  // 2. 检查 User-Agent 是否包含 "Cookie"
  const ua = $request.headers['User-Agent'] || $request.headers['user-agent'] || '';
  if (!ua.includes('Cookie')) {
    $done({}); // 非 Cookie 请求直接放行
    return;
  }


  // 4. 构造完整响应体（保留原始结构 + 防校验）
  const modifiedBody = {
    "request_date_ms": 1761358768429,
    "request_date": "2025-10-25T02:19:28Z",
    "environment": "Production",  // 强制生产环境，防沙盒检测
    "subscriber": {
      "non_subscriptions": {},
      "first_seen": "2025-09-15T08:18:22Z",
      "original_application_version": "625",
      "other_purchases": {},
      "management_url": "https://apps.apple.com/account/subscriptions",
      "subscriptions": {
        "app.ft.Bookkeeping.month": {
          "original_purchase_date": "2025-10-19T02:58:00Z",
          "expires_date": 2099-12-31T23:59:59Z,
          "is_sandbox": false,
          "refunded_at": null,
          "store_transaction_id": "470002723862804",
          "unsubscribe_detected_at": null,           // 清除退订标记
          "grace_period_expires_date": null,        // 防止宽限期干扰
          "period_type": "normal",
          "price": { "amount": 6, "currency": "CNY" },
          "purchase_date": "2025-10-19T02:57:56Z",
          "display_name": null,
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
          "product_identifier": "app.ft.Bookkeeping.month",
          "expires_date": 2099-12-31T23:59:59Z                    // 关键：永久权限
        }
      },
      "original_purchase_date": "2025-10-19T02:58:00Z",
      "original_app_user_id": "_30d9b2f767d69f0ca4a60d921ab15a56",
      "last_seen": "2025-10-25T02:17:52Z"
    }
  };

  // 5. 返回修改后的完整 JSON
  console.log('Cookie UA：allaccess 已解锁');
  $done({
    body: JSON.stringify(modifiedBody)
  });

})();
