<template>
    <div>
        <h1>로그인</h1>
        <input v-model="email" type="email" placeholder="gahyun1234@gmail.com"/>
        <input v-model="password" type="password" placeholder="비밀번호를 입력하세요"/>
        <button @click="onLogin">로그인</button>
    </div>
</template>

<script>
import {ref} from "vue";
import {auth} from "../firebase/index.js";
import {signInWithEmailAndPassword } from "firebase/auth";
import {useRouter}from "vue-router";

export default {
    setup(){
        const email = ref('');
        const password = ref('');
        const router = useRouter();

        const onLogin = async () => {
            try{
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;

                // 로그인 성공 시 마이페이지로 이동
                router.push('/home')
            }catch(err){
                alert('아이디 또는 비밀번호가 잘못되었습니다. : ' + err.message);
            }
        };
        return {email, password, onLogin};
    }
}
</script>