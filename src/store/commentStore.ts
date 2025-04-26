import { create } from 'zustand'
import type { CommentType } from '../types/commentType'

interface CommentState {
    currentComment: CommentType | null
    cache: Record<string, CommentType>
    setCurrentComment: (comment: CommentType) => void
    clearCache: () => void
}

export const useCommentStore = create<CommentState>((set) => ({
    currentComment: null,
    cache: {},

    setCurrentComment: comment => set( (state) => ({
        currentComment: comment,
        cache: {
            ...state.cache,
            [comment.id]: comment
        }
    }) ),

    clearCache: () => set({ cache: {} })
}))