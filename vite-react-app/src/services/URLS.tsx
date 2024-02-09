export const URLS = {
    
    fetchProducts: `${import.meta.env.VITE_STRIPE_BASE_URL}products`,
    fetchProductById: `${import.meta.env.VITE_STRIPE_BASE_URL}products`,
    fetchProductPricing: `${import.meta.env.VITE_STRIPE_BASE_URL}prices?product=`,
    subscriptions: `${import.meta.env.VITE_STRIPE_BASE_URL}subscriptions`,
    customers: `${import.meta.env.VITE_STRIPE_BASE_URL}customers`,
    login : `${import.meta.env.VITE_JWT_BASE_URL}login`,
    signUp : `${import.meta.env.VITE_JWT_BASE_URL}register`, 
    
}