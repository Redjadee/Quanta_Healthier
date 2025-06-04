export type commentCommentType ={
    id: string
    username: string
    profile: string | undefined

    postContent: string
    postTime: string
    postIp: string
    uploadImage?: string[]

    like: number
    commentCommentComment: commentCommentType[]
}

export type CommentType = {
    id: string
    username: string
    profile: string | undefined | ImageSourcePropType

    postTitle: string
    postContent?: string
    postTime: string
    postIp?: string
    uploadImage?: string[]
    tags?: string[]

    like?: number = 0
    comment?: number = 0
    share?: number = 0

    liked?: boolean = false

    commentComment?: commentCommentType[]
}