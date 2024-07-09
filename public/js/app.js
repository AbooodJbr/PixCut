document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullUrl = document.getElementById('fullUrl').value;
    if(!fullUrl){
        document.querySelector('.after-cut').style.display = 'none';
        document.querySelector('.qr-code').style.display = 'none';
        document.querySelector('.validation').style.display = 'block';
        return;
    }
    try {
        const response = await fetch('/shortUrls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullUrl })
        });

        if (response.ok) {
            //remove validation
            document.querySelector('.validation').style.display = 'none';

            //url-shortner
            const data = await response.json();
            const shortUrlElement = document.getElementById('short-url');
            shortUrlElement.textContent = `${window.location.href}${data.short}`;
            shortUrlElement.href = `${window.location.href}${data.short}`;
            document.querySelector('.after-cut').style.display = 'block';

            //qr-generator
            document.querySelector('.qr-code').style.display = 'block';
            document.getElementById("qr-img").src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}${data.short}`
        } else {
            console.error('error:', response.statusText);
        }
    } catch (error) {
        console.error('error:', error);
    }
});

document.getElementById('copy-btn').addEventListener('click', async () => {
    const copyText = document.getElementById('short-url').href;
    try {
        await navigator.clipboard.writeText(copyText);
        alert("copied the URL :" + copyText);
    } catch (error) {
        console.error('failed to copy the URL', error);
        alert("failed to copy the URL");
    }
});
