import { defineStore } from 'pinia'

export interface UserData {
    id: number
    firstname: string
    lastname: string
    email: string
    role: string
    company: number
    mentoria: string
    ebook: string
    revisao: string
    combo: string
    enabled?: boolean
}

interface SiteState extends Omit<UserData, 'id' | 'enabled'> {
    isAuthenticated: boolean
    userId: number
}

const getInitialData = (): UserData | null => {
    const data = localStorage.getItem('userData')

    try {
        return data ? JSON.parse(data) : null
    } catch (e) {
        console.error('Erro ao parsear userData do localStorage: ', e)
        return null
    }
}

const sessionData = getInitialData()

export const useSiteStore = defineStore('siteStore', {
    state: (): SiteState => ({
        isAuthenticated: sessionData?.enabled ?? false,
        firstname: sessionData?.firstname ?? '',
        lastname: sessionData?.lastname ?? '',
        email: sessionData?.email ?? '',
        userId: sessionData?.id ?? 0,
        role: sessionData?.role ?? '',
        company: sessionData?.company ?? 0,
        mentoria: 'c45f854c11e9f4273dd6f76008bd4837',
        ebook: '5814e5f1c398ae286b5a9aa3679202d5',
        revisao: '375c72b2ae93ea626d7f46683949f46a',
        combo: 'c5381ebfd29b5e556d1d986ba369a336',
    }),
    actions: {
        login(userData: UserData) {
            this.$patch({
                isAuthenticated: true,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                userId: userData.id,
                role: userData.role,
                company: userData.company,
            })

            localStorage.setItem('userData', JSON.stringify(userData))
        },
        logout() {
            this.$reset()
            localStorage.removeItem('userData')
        }
    }
})

