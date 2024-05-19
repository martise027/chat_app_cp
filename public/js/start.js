function generateSecureUniqueIdentifier() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomValues = new Uint32Array(10);
    const randomIdentifier = [];
    crypto.getRandomValues(randomValues);
    randomValues.forEach(value => {
        const index = value % alphabet.length;
        randomIdentifier.push(alphabet[index]);
    });

    return randomIdentifier.join('');
}
document.addEventListener("DOMContentLoaded", () => {
    const usernameField = document.getElementById("username");
    usernameField.value = generateSecureUniqueIdentifier();
});

