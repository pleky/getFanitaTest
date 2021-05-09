import create from 'zustand';
import { persist } from "zustand/middleware"

export const useStore = create((set, get) => ({
    question: null,
    lastOption: null,
    setQuestion: (data) => {
        set({
            question: data
        })
    },
    select: (questionIdx, dataIndex, option) => {
        let q = get().question;
        q[questionIdx].data.map((data, index) => {
            if (index == dataIndex) {
                return data['selected'] = true
            }
            return data['selected'] = false
        })
        set({ question: q })
        set({ lastOption: option })
    },

    setQuestionAnswer: (value, questionIdx) => {
        let q = get().question;
        q[questionIdx].answer = value
        set({ question: q })
    },
    resetQuestion: () => set({ question: null }),
    setLastOption: (option) => set({ lastOption: option })
}));

export const useStoreData = create(persist((set) => ({
    data: {},
    setData: (dt) => {
        return set((state) => ({data: {...state.data, ...dt}}))
    },
    resetData: () => set({data : {}})
}), {
    name: 'data-to-post',
    getStorage: () => localStorage
}))