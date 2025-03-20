const API_KEY = "39d174f0-1b70-4661-af8d-b96976715129";
const CLIENT_ID = "39d174f0-1b70-4661-af8d-b96976715129";
const URL = "https://api.vietqr.io/v2/generate";

async function generateQR() {
    const qrCodeMountInput = document.getElementById('inputMount');
    const amount = qrCodeMountInput.value.trim();

    const payload = {
        accountName: "QUY VAC XIN PHONG CHONG COVID",
        acqId: "970422",
        amount: amount,
        template: "compact",
        accountNo: "202388886868",

    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client_id': CLIENT_ID,
                'api_key': API_KEY
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('STATUS', response.status);

        if (response.ok && data?.data?.qrDataURL) {
            const qrCodeImage = document.getElementById('qrCode');
            qrCodeImage.src = data.data.qrDataURL;
            qrCodeImage.style.display = 'block';
            qrCodeImage.alt = 'QR Code';
        } else {
            console.error('API Error:', data);
            alert("Error generating QR code. Please check the account number or try again later.");
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert("Network error. Please try again.");
    }
}
