export type CommentType = {
    id: string
    username: string
    profile: string | undefined

    postContent: string
    postTime: string
    postIp: string
    uploadImage?: string[]
    tags?: string[]

    like: number
    comment: number
    share: number

    commentComment: CommentType[]
}