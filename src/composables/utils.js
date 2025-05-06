import { ElNotification } from 'element-plus'

//成功提示
export const toast = (message, type = 'success', dangerouslyUseHTMLString = false) => {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 2000
    })
}


