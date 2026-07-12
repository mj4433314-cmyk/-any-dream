// 1. استيراد حزم Firebase الأساسية المتوافقة مع المتصفح بالروابط الصحيحة والكاملة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. إعدادات مشروعك الكاملة والمصححة بنسبة 100%
const firebaseConfig = {
    apiKey: "AIzaSyAs7tvPA4OUA_D7_3DEyBL_SEbwTZ8KJaI",
    authDomain: "mywebproject-2c548.firebaseapp.com", // تم تصحيح الرابط هنا لربطه بمشروعك
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

// جلب العناصر الأساسية من الصفحة
const phone = document.getElementById("phone");
const code = document.getElementById("countryCode");
const loginBtn = document.getElementById("loginBtn");
const createBtn = document.getElementById("createBtn");
const loading = document.getElementById("loading");

// دالة التحقق من مقدمة الهاتف وعلم العراق
if(phone) {
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
        const inputs = document.querySelectorAll("input");

        // التحقق من ملء جميع الحقول أولاً
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                alert("يرجى إكمال جميع الحقول أولاً");
                return;
            }
        }

        const enteredEmailOrPhone = inputs[0].value.trim();
        const enteredPassword = inputs[1].value.trim();
        const loginInviteCode = inputs[2] ? inputs[2].value.trim() : "";

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
        const inputs = document.querySelectorAll("input");

        // التحقق من ملء جميع الحقول أولاً
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                alert("يرجى إكمال جميع الحقول أولاً");
                return;
            }
        }

        const emailOrPhoneValue = inputs[0].value.trim();
        const passwordValue = inputs[1].value.trim();
        const inviteCodeValue = inputs[2] ? inputs[2].value.trim() : "";

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
