import apiClient from "@/src/utils/apiClient"
import { CommentType } from "../../types/commentType"

export const getAllComments = async () => {
    try {
        const response: CommentType[] = await apiClient.get('/post')
        return {
            success: true,
            data: response // 直接返回评论数据
        }
    } catch (error) {
        console.log('获取评论失败', error);
        return {
            success: false,
            message: '获取评论失败',
            data: []
        }
    }
}

export const getCommentById = async (id: string) => {
    try {
        const response: CommentType = await apiClient.get(`/post${id}`)
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.log('查找问答失败惹', error)
        return {
            success: false,
            message: '获取评论失败',
            data: []
        }
    }
}