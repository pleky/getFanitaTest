import api from './api'

const questionnairyAPI = {
    getQuestionnaires: async () => {
        const result = await api.get('/questionnaires')
        return result.data;
    },
    createQuestionnaires: async (data) => {
        const result = await api({
            url: '/questionnaires',
            method: 'POST',
            data: data
        })
        return result.data;
    }
}

export { questionnairyAPI }