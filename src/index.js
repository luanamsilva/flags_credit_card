function getCardBrand(cardNumber) {
    // Remove all non-digit characters
    cardNumber = cardNumber.replace(/\D/g, '');

    // Define card type patterns
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };

    // Check card type
    let cardType = null;
    for (let type in cardPatterns) {
        if (cardPatterns[type].test(cardNumber)) {
            cardType = type;
            break;
        }
    }

    if (!cardType) {
        return ("Cartão inválido"); // Invalid card type
    }

    // Luhn Algorithm to validate the card number
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    if ((sum % 10) === 0) {
        return cardType; // Valid card number
    } else {
        return null; // Invalid card number
    }
}

const cardNumber = '4024007160105119';
const result = getCardBrand(cardNumber);
console.log(result);