// دالة لتوليد التوقيع الرقمي لبايننس
async function generateSignature(queryString, secretKey) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw", encoder.encode(secretKey),
        { name: "HMAC", hash: "SHA-512" },
        false, ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(queryString));
    return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 1. عند فتح الرابط المباشر للموقع - عرض الواجهة البنفسجية الاحترافية مع خيار الـ 5 دولار
        if (url.pathname === "/" || request.method === "GET") {
            const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KXTRM - الدفع والاشتراك</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #0f0c1b; color: #ffffff; text-align: center; padding: 40px 20px; margin: 0; }
        .card { background: linear-gradient(145deg, #1d1836, #130f24); padding: 35px 25px; border-radius: 20px; display: inline-block; width: 100%; max-width: 380px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #3d2f75; }
        .brand { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #a29bfe; font-size: 16px; margin-bottom: 20px; }
        .amount-tag { background-color: #1e1b4b; border: 1px dashed #6c5ce7; padding: 12px; border-radius: 10px; font-size: 18px; font-weight: bold; color: #00ffcc; margin-bottom: 25px; }
        .input-group { margin-bottom: 20px; text-align: right; }
        label { display: block; margin-bottom: 8px; color: #b2bec3; font-size: 14px; }
        input[type="text"] { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #4a3f85; background-color: #141026; color: #fff; box-sizing: border-box; font-size: 16px; }
        .btn-payment { background: linear-gradient(90deg, #6c5ce7, #a29bfe); color: white; border: none; padding: 15px; width: 100%; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 10px; }
        .footer-text { margin-top: 25px; font-size: 12px; color: #636e72; }
    </style>
</head>
<body>
    <div class="card">
        <div class="brand">KXTRM</div>
        <div class="subtitle">إنشاء حساب جديد للمتابعة وتشغيل الخدمة</div>
        <div class="amount-tag">💵 قيمة الإيداع: 5.00 USDT</div>
        <form id="paymentForm">
            <div class="input-group">
                <label for="username">الاسم أو البريد الإلكتروني</label>
                <input type="text" id="username" placeholder="أدخل بريدك الإلكتروني هنا" required>
            </div>
            <button type="submit" class="btn-payment">💳 إيداع 5$ والانتقال للدفع</button>
        </form>
        <div class="footer-text">WATCH AND EARN USD</div>
    </div>

    <script>
        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const button = document.querySelector('.btn-payment');
            button.innerText = "جاري تحضير الدفع...";
            button.disabled = true;

            try {
                const response = await fetch('/api/pay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username })
                });
                const data = await response.json();
                if (data.checkoutUrl) {
                    window.location.href = data.checkoutUrl;
                } else {
                    alert("خطأ: " + (data.error || "فشل توليد رابط الفاتورة الحقيقية"));
                    button.innerText = "💳 إيداع 5$ والانتقال للدفع";
                    button.disabled = false;
                }
            } catch (error) {
                alert("حدث خطأ في الاتصال بنظام الدفع الخلفي.");
                button.innerText = "💳 إيداع 5$ والانتقال للدفع";
                button.disabled = false;
            }
        });
    </script>
</body>
</html>
`;
            return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }

        // 2. معالجة طلب الدفع الفعلي بقيمة 5 دولار بالاعتماد على المفاتيح التي وضعتها في لوحة تحكم Cloudflare
        if (url.pathname === "/api/pay" && request.method === "POST") {
            try {
                const { username } = await request.json();
                const apiKey = env.BINANCE_API_KEY;
                const secretKey = env.BINANCE_SECRET_KEY;

                if (!apiKey || !secretKey) {
                    return new Response(JSON.stringify({ error: "مفاتيح الدفع غير مهيأة بالسيرفر" }), { status: 500 });
                }

                const nonce = Math.random().toString(36).substring(2, 17);
                const timestamp = Date.now().toString();
                
                const bodyPayload = {
                    env: { terminalType: "WEB" },
                    orderAmount: "5.00",
                    currency: "USDT",
                    goods: {
                        goodsType: "01",
                        goodsCategory: "Z000",
                        referenceGoodsId: `deposit_${nonce}`,
                        goodsName: `إيداع حساب - ${username}`
                    }
                };

                const jsonBody = JSON.stringify(bodyPayload);
                const signaturePayload = `${timestamp}\n${nonce}\n${jsonBody}\n`;
                const signature = await generateSignature(signaturePayload, secretKey);

                const binanceResponse = await fetch("https://binance.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "BinancePay-Timestamp": timestamp,
                        "BinancePay-Nonce": nonce,
                        "BinancePay-Certificate-SN": apiKey,
                        "BinancePay-Signature": signature
                    },
                    body: jsonBody
                });

                const binanceData = await binanceResponse.json();

                if (binanceData.status === "SUCCESS" && binanceData.data && binanceData.data.checkoutUrl) {
                    return new Response(JSON.stringify({ checkoutUrl: binanceData.data.checkoutUrl }), {
                        headers: { "Content-Type": "application/json" }
                    });
                } else {
                    return new Response(JSON.stringify({ error: binanceData.errorMessage || "فشل إنشاء الفاتورة من بايننس" }), { status: 400 });
                }
            } catch (err) {
                return new Response(JSON.stringify({ error: err.message }), { status: 500 });
            }
        }

        return new Response("Not Found", { status: 404 });
    }
};
            
