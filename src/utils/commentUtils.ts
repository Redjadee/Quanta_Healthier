
export function likeU(iLike: boolean) {
    return iLike? require('@/assets/images/comment/liked.png') : require('@/assets/images/comment/like.png')
}

export function profileU(profile: string | undefined) {
   return profile? { uri: profile } : require('@/assets/images/comment/defaultImg.png')
}