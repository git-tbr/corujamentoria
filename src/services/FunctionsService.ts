import { useSiteStore } from '@/stores/website'
const siteStore = useSiteStore()

/**
 * @param product
 * @description o parâmetro deve ser a chave de identificação do curso
 */
export const defineProduct = (product: string): string | number => {
  sessionStorage.setItem('payment', 'true')
  sessionStorage.setItem('course', product)
  return 'pagamento'
}
