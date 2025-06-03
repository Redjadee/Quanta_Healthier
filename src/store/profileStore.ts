import { ImageSourcePropType } from "react-native";
import { create } from "zustand"

// 定义store类型（TypeScript用户专属福利✨）
interface ProfileStoreType {
    id: string
    username: string;
    updateName: (newName: string) => void;
    ip: string
    updateIp: (newip: string) => void
    profile: string | ImageSourcePropType
    updateProfile: (newProfile: string) => void
    bgImg: string | ImageSourcePropType
    updateBgImg: (newBgImg: string) => void
}

// 创建store
export const useProfileStore = create<ProfileStoreType>((set) => ({
    id: '010123',
    username: "今晚一定不熬夜",
    updateName: (newName) => set({ username: newName }),
    ip: '未知',
    updateIp: (newip) => set({ ip: newip }),
    profile: require('@/assets/images/comment/defaultImg.png'),
    updateProfile: (newProfile) => set({ profile: newProfile }),
    bgImg: require('@/assets/images/userProfile/defaultBg.png'),
    updateBgImg: (newBgImg) => set({ bgImg: newBgImg })
}));
