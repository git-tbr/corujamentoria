import { useRouter } from "vue-router";

const router = useRouter()

/**
 * @param product 
 * @description o parâmetro deve ser a chave de identificação do curso
 */
export const defineProduct = (product: string) => {
    localStorage.setItem('selectedProduct', product);
    router.push('/checkout');
}