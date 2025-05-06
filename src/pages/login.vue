<template>
    <el-row class="min-h-screen bg-indigo-500">
        <el-col :lg="16" :md="12" class="flex items-center justify-center">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
                <div class="text-gray-200 text-sm">此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="bg-light-50 flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form ref="Formref" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" show-password v-model="form.password" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { login } from '~/api/manager'
import { useRouter } from 'vue-router'
import { getToken, setToken } from '~/composables/auth'
import { toast } from '~/composables/utils'
import { useStore } from 'vuex'
import { getInfo } from '~/api/manager'

const router = useRouter()
const loading = ref(false)
const store = useStore()

// do not use same name with ref
const form = reactive({
    username: "",
    password: ""
})
const Formref = ref(null)

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
}


const onSubmit = () => {
    Formref.value.validate((v) => {
        if (!v) {
            return false
        } else {
            console.log("ok")
        }
        loading.value = true
        // promise对象 通过.then获取响应数据，通过.catch获取错误信息
        login(form.username, form.password)
            .then(res => {
                console.log(res)
                toast("登录成功")
                // 设置Token
                setToken(res.data.token)
                getInfo().then(res => {
                    store.commit('setUserInfo', res.data)
                    router.push('/')
                })
            })
            .finally(() => {
                loading.value = false
            })
    })
    console.log('submit!')
}
</script>