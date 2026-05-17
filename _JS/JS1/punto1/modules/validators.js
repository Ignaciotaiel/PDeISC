// FIXES: Exported correctly, added ciudad validator, removed unnecessary validators.

export const validators = {
    nombre: (value) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return regex.test(value.trim());
    },
    
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value.trim());
    },
    
    telefono: (value) => {
        const regex = /^\+?\d{8,15}$/;
        return regex.test(value.trim());
    },
    
    ciudad: (value) => {
        return value.trim().length >= 3;
    }
};
