import { CommentType } from "@/src/types/commentType"
import apiClient from "@/src/utils/apiClient"

interface postCommentType {
    id: string
    data:CommentType
}
export const postComment = async ({ id, data }: postCommentType) => {
    function generate7DigitString(): string {
        let result = ''
        for (let i = 0; i < 7; i++) {
            result += Math.floor(Math.random() * 10)
        }
        return result
    }  
    try {
    // 发起POST请求
    const response = await apiClient.post(`/post/${id}`, {
      postId: `${data.id}${generate7DigitString()}`, 
      userId: data.id,
      username: data.username,
      avatarUrl: data.profile || '',
      title: data.postTitle,
      content: data.postContent || '',
      createTime: data.postTime,
      updateTime: "",
      likeCount: data.like,
      commentCount: data.comment,
      liked: data.liked,
    });

    // 返回成功的响应
    return {
      success: true,
      data: response, // 返回后端返回的数据
      status: 200
    };
  } catch (error) {
    // 捕获错误并返回统一格式
    console.log('发布问题失败' ,error)
    return {
      success: false,
      message: (error instanceof Error ? error.message : '发布评论失败'),
      status: (typeof error === 'object' && error !== null && 'status' in error ? (error as any).status : -1)
    };
  }
};
