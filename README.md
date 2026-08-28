# HR Chat - GitHub + Cloudflare

هذه نسخة دردشة حقيقية بسيطة تعتمد على Cloudflare Worker + D1.

الملفات:
- index.html واجهة الدردشة
- worker.js API
- schema.sql جدول الرسائل
- wrangler.toml إعداد Cloudflare

ملاحظة: هذه النسخة تستخدم اسم عضو يكتبه المستخدم، وليست مرتبطة بتسجيل دخول موقع HR بعد.
لا تضع أي مفاتيح سرية داخل GitHub.

بعد إنشاء D1 يجب وضع database_id في wrangler.toml ثم نشر المشروع.
