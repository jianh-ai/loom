// ========================== 核心配置（仅Bookkeeping，适配Cookie/630） ==========================
const TARGET_APP = 'Cookie'; // 关键修改：匹配User-Agent中的“Cookie”
const BOOKKEEPING_SUBS = {
  productId: 'app.ft.Bookkeeping.month',
  entitlementKey: 'allaccess',
  expireDate: '2099-12-31T23:59:59Z' // 远期到期=永久有效
};

// ========================== 核心逻辑 ==========================
// 1. 环境校验（防止报错）
if (!window.$request || !window.$response) {
  $done({});
  return;
}

// 2. 匹配目标App（识别Cookie/630的请求）
const userAgent = $request.headers['User-Agent'] || $request['user-agent'];
if (!userAgent.includes(TARGET_APP)) {
  $done($response); // 非Cookie标识的请求，返回原始响应
  return;
}

// 3. 构造模拟订阅数据（和你原订阅格式一致）
const mockSubData = {
  original_purchase_date: '2025-10-19T02:58:00Z',
  expires_date: BOOKKEEPING_SUBS.expireDate,
  is_sandbox: false,
  refunded_at: null,
  store_transaction_id: '470002723862804',
  unsubscribe_detected_at: null, // 取消“已取消”状态，持续有效
  grace_period_expires_date: null,
  period_type: 'normal',
  price: { amount: 6, currency: 'CNY' },
  purchase_date: '2025-10-19T02:57:56Z',
  display_name: null,
  billing_issues_detected_at: null,
  ownership_type: 'PURCHASED',
  store: 'app_store',
  auto_resume_date: null
};

// 4. 注入模拟订阅到响应
let responseData = JSON.parse($response.body);
responseData.subscriptions[BOOKKEEPING_SUBS.productId] = mockSubData;
responseData.subscriber.subscriptions[BOOKKEEPING_SUBS.entitlementKey] = mockSubData;
responseData.subscriber.entitlements[BOOKKEEPING_SUBS.entitlementKey] = {
  grace_period_expires_date: null,
  purchase_date: '2025-10-19T02:57:56Z',
  product_identifier: BOOKKEEPING_SUBS.productId,
  expires_date: BOOKKEEPING_SUBS.expireDate
};

// 5. 返回修改后的响应
console.log('Bookkeeping订阅（Cookie/630）已模拟生效');
$done({ body: JSON.stringify(responseData) });
