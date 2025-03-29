function generatePassword(length, useUppercase, useLowercase, useDigits, useSpecial) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characterPool = '';
    
    if (useUppercase) characterPool += uppercaseChars;
    if (useLowercase) characterPool += lowercaseChars;
    if (useDigits) characterPool += digitChars;
    if (useSpecial) characterPool += specialChars;

    if (characterPool.length === 0) {
        throw new Error("At least one character type must be selected.");
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }
    
    return password;
}

document.getElementById('generate').addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useDigits = document.getElementById('digits').checked;
    const useSpecial = document.getElementById('special').checked;

    try {
        const password = generatePassword(length, useUppercase, useLowercase, useDigits, useSpecial);
        document.getElementById('result').textContent = password;
    } catch (error) {
        alert(error.message);
    }
});

// Copy to Clipboard functionality
document.getElementById('copy').addEventListener('click', () => {
    const password = document.getElementById('result').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        alert('No password to copy. Please generate a password first.');
    }
});