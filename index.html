<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء حساب وتسجيل الدخول</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #121212; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { background-color: #1e1e1e; padding: 30px; border-radius: 10px; width: 320px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #333; border-radius: 5px; background-color: #2a2a2a; color: #fff; box-sizing: border-box; }
        button { width: 100%; padding: 10px; margin: 5px 0; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
        #loginBtn { background-color: #007bff; color: white; }
        #createBtn { background-color: #28a745; color: white; }
        #loading { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); justify-content: center; align-items: center; z-index: 1000; }
        #countryCode { margin-left: 5px; font-weight: bold; }
    </style>
</head>
<body>

<div class="container">
    <h2>إنشاء حساب / دخول</h2>
    
    <div style="display: flex; align-items: center;">
        <span id="countryCode"></span>
        <input type="text" id="phone" placeholder="البريد الإلكتروني أو رقم الهاتف">
    </div>
    
    <input type="password" id="password" placeholder="كلمة المرور">
    <input type="text" id="inviteCode" placeholder="رمز الدعوة">
    
    <button id="loginBtn">تسجيل الدخول</button>
    <button id="createBtn">إنشاء حساب</button>
</div>

<!-- واجهة اللودينج -->
<div id="loading"></div>

<!-- تشغيل الـ Firebase والمنطق البرمجي مدمج بالكامل لسهولة النسخ والنشر -->
<script type="module">
    // 1. استيراد حزم Firebase الأساسية بالروابط الصحيحة والكاملة من خوادم Google
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
    import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    // 2. إعدادات مشروعك المصححة بالكامل والمربوطة بمشروعك
    const firebaseConfig = {
        apiKey: "AIzaSyAs7tvPA4OUA_D7_3DEyBL_SEbwTZ8KJaI",
        authDomain: "mywebproject-2c548.firebaseapp.com",
        projectId: "mywebproject-2c548",
        storageBucket: "mywebproject-2c548.firebasestorage.app",
        messagingSenderId: "864322797605",
        appId: "1:864322797605:web:6e99a72ee5a0e7e9eb3fcc",
        measurementId: "G-341N04ERR3"
    };

    // 3. تشغيل Firebase وقاعدة البيانات السحابية
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    // جلب العناصر بدقة عبر الـ IDs الخاصة بها لتفادي أي تداخل في الترتيب
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const inviteCode = document.getElementById("inviteCode");
    const code = document.getElementById("countryCode");
    const loginBtn = document.getElementById("loginBtn");
    const createBtn = document.getElementById("createBtn");
    const loading = document.getElementById("loading");

    // دالة التحقق من مقدمة الهاتف وعلم العراق
    if(phone && code) {
        phone.addEventListener("input", function() {
            if (this.value.startsWith("077")) {
                code.innerHTML = "🇮🇶 +964";
            } else {
                code.innerHTML = "";
            }
        });
    }

    // 🔑 زر تسجيل الدخول: يتحقق من البيانات المخزنة سحابياً مع شرط الرمز 1234566
    if(loginBtn) {
        loginBtn.onclick = async function() {
            const enteredEmailOrPhone = phone.value.trim();
            const enteredPassword = password.value.trim();
            const loginInviteCode = inviteCode ? inviteCode.value.trim() : "";

            // التحقق من ملء جميع الحقول أولاً
            if (enteredEmailOrPhone === "" || enteredPassword === "" || loginInviteCode === "") {
                alert("يرجى إكمال جميع الحقول أولاً");
                return;
            }

            // 🚀 الشرط الصارم والمطلوب لزر تسجيل الدخول
            if (loginInviteCode !== "1234566") {
                alert("تنبيه: رمز الدعوة الخاص بتسجيل الدخول غير صحيح!");
                return;
            }

            try {
                // الاستعلام من قاعدة البيانات للتحقق من الحساب
                const q = query(collection(db, "users"), 
                    where("emailOrPhone", "==", enteredEmailOrPhone),
                    where("password", "==", enteredPassword)
                );
                
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    window.location.href = "home.html";
                } else {
                    alert("عذراً، كلمة المرور أو اسم المستخدم غير صحيح.");
                }
            } catch (error) {
                console.error("خطأ أثناء تسجيل الدخول: ", error);
                alert("حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً");
            }
        };
    }

    // 🔑 زر إنشاء الحساب وإرسال البيانات لقاعدة بيانات Firebase Firestore مع شرط الرمز 43688
    if(createBtn) {
        createBtn.onclick = async function() {
            const emailOrPhoneValue = phone.value.trim();
            const passwordValue = password.value.trim();
            const inviteCodeValue = inviteCode ? inviteCode.value.trim() : "";

            // التحقق من ملء جميع الحقول أولاً
            if (emailOrPhoneValue === "" || passwordValue === "" || inviteCodeValue === "") {
                alert("يرجى إكمال جميع الحقول أولاً");
                return;
            }

            // 🚀 الشرط الصارم والمطلوب لزر إنشاء الحساب
            if (inviteCodeValue !== "43688") {
                alert("تنبيه: رمز الدعوة غير صحيح!");
                return;
            }

            try {
                // حفظ البيانات بشكل نظامي داخل مجموعة "users" في Firestore
                await addDoc(collection(db, "users"), {
                    emailOrPhone: emailOrPhoneValue,
                    password: passwordValue,
                    inviteCode: inviteCodeValue,
                    createdAt: new Date()
                });

                // تشغيل واجهة اللودينج وأنيميشن الشعار الخاص بك
                if(loading) {
                    loading.style.display = "flex";
                    loading.innerHTML = `
                      <div style="text-align: center; animation: logoEntrance 0.8s ease-out forwards;">
                        <img src="lokgo.png" alt="Logo" style="width: 140px; height: auto; mix-blend-mode: screen; animation: logoPulse 2s infinite ease-in-out; filter: drop-shadow(0 0 15px rgba(255,255,255,0.4));">
                        <h2 style="color: #ffffff; margin-top: 25px; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">Account Created Successfully!</h2>
                      </div>
                      <style>
                        @keyframes logoEntrance {
                          0% { transform: scale(0.3); opacity: 0; }
                          70% { transform: scale(1.1); opacity: 0.9; }
                          100% { transform: scale(1); opacity: 1; }
                        }
                        @keyframes logoPulse {
                          0% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,255,255,0.4)); }
                          50% { transform: scale(1.04); filter: drop-shadow(0 0 25px rgba(255,255,255,0.7)); }
                          100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,255,255,0.4)); }
                        }
                      </style>
                    `;
                }

                setTimeout(function() {
                    window.location.href = "home.html";
                }, 3000);

            } catch (error) {
                console.error("خطأ في حفظ البيانات: ", error);
                alert("حدث خطأ أثناء الاتصال بالسيرفر، يرجى المحاولة لاحقاً");
            }
        };
    }
</script>
</body>
</html>
            
