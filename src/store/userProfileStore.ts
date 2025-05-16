import { create } from "zustand"
import type { userProfileType } from "../types/userProfile"

interface ProfileState {
    currentProfile: userProfileType | null
    cache: Record<string, userProfileType>
    setCurrentUser: (Profile: userProfileType) => void
    clearCache: () => void
}

export const userProfileStore = create<ProfileState>((set) => ({
    currentProfile: null,
    cache: {},

    setCurrentUser: profile => set( (state) => ({
        currentProfile: profile,
        cache: {
            ...state.cache,
            [profile.id]: profile
        }
    }) ),

    clearCache: () => set({ cache: {} })
}))