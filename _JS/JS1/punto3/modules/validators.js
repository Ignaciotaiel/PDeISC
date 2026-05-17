// aca tenemos cosas utiles para validar textos y numeros

export const validators = {
    text: (value) => {
        return value.trim().length >= 2;
    },
    
    dni: (value) => {
        const regex = /^\d{7,}$/;
        return regex.test(value.trim());
    },
    
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value.trim());
    },

    number: (value) => {
        return !isNaN(value) && value.trim() !== '';
    }
};
