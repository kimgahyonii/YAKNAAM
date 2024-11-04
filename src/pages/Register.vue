<template>
    <div>
        <h1>회원가입</h1>
        <input v-model="userId" type="text" placeholder="아이디를 입력하세요" />
        <input v-model="email" type="email" placeholder="이메일을 입력하세요" />
        <input v-model="password" type="password" placeholder="비밀번호를 입력하세요" />
        <button @click="onRegister">회원가입</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { auth, db, USER_COLLECTION } from '../firebase/index.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default {
    setup() {
        const userId = ref('');
        const email = ref('');
        const password = ref('');

        const onRegister = async () => {
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 비밀번호 복잡성 검사
            if (!passwordPattern.test(password.value)) {
                alert('비밀번호는 최소 8자 이상이어야 하며, 영어, 숫자 및 특수문자를 포함해야 합니다.');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;

                // 회원 가입 관련 코드
                // user collection에 user.uid라는 ID를 가진 문서를 하나 만들기
                const userDoc = doc(USER_COLLECTION, user.uid);
                // 정보 저장
                await setDoc(userDoc, {
                    uid: user.uid,
                    email: email.value,
                    userId: userId.value,
                    profile_image_url: '/profile.jpeg',
                    background_image_url: '/profile.jpeg',
                    created_at: Date.now(),
                });
                // 저장 성공
                alert('회원가입을 성공하였습니다. 로그인 해주세요.');
            } catch (err) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert('이메일을 바르게 입력해주세요.');
                        break;
                    case 'auth/weak-password':
                        alert('너무 쉬운 비밀번호입니다.');
                        break;
                    case 'auth/email-already-in-use':
                        alert('등록된 이메일입니다.');
                        break;
                    default:
                        alert('회원가입 실패');
                        break;
                }
            }
        };

        return {
            userId,
            email,
            password,
            onRegister,
        };
    },
};
</script>

<style scoped>
/* 여기에 CSS 스타일 추가 가능 */
</style>
