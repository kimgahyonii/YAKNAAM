// alarm plus.js



document.addEventListener('DOMContentLoaded', () => {
    loadAlarmData();
    loadUsername();
    loadMedicationTips();
});
function loadAlarmData() {
    // 로컬 스토리지에서 데이터 가져오기
    const alarmDataArray = JSON.parse(localStorage.getItem("alarmDataArray")) || [];

    const alarmListContainer = document.getElementById("alarm-list");
    alarmListContainer.innerHTML = ""; // 기존 내용 초기화

    alarmDataArray.forEach((alarmData, index) => {
        const alarmItem = document.createElement("div");
        alarmItem.className = "alarm-info";

        // 아이콘 이미지
        const iconImg = document.createElement("img");
        iconImg.src = alarmData.icon || "img/default.png";
        iconImg.alt = "아이콘";
        iconImg.width = 40;

        // 약 이름
        const medicineP = document.createElement("p");
        medicineP.textContent = alarmData.medicine || "약 정보 없음";

        // 시간
        const timeP = document.createElement("p");
        timeP.textContent = alarmData.time || "시간 정보 없음";

        // 삭제 버튼
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.addEventListener("click", () => {
            deleteAlarm(index);
        });

        // 알람 아이템에 요소들 추가
        alarmItem.appendChild(iconImg);
        alarmItem.appendChild(medicineP);
        alarmItem.appendChild(timeP);
        alarmItem.appendChild(deleteButton);

        // 알람 리스트 컨테이너에 알람 아이템 추가
        alarmListContainer.appendChild(alarmItem);
    });
}

// 알람 삭제 함수
function deleteAlarm(index) {
    let alarmDataArray = JSON.parse(localStorage.getItem("alarmDataArray")) || [];
    alarmDataArray.splice(index, 1); // 해당 인덱스의 아이템 삭제
    localStorage.setItem("alarmDataArray", JSON.stringify(alarmDataArray));
    loadAlarmData(); // 업데이트된 리스트를 다시 로드
}


function loadUsername() {
    const username = "김가현"; // 실제 데이터로 교체
    document.getElementById('username').innerText = username;
}
// function loadMedicationTips() {
//     const serviceKey = 'THWVXn3IWHS4EVY69HVFOiKi5%2FlK%2BHMYHPJF%2B%2B%2BBH1e6bc%2Bgr%2F%2BXeXTcgSVETvEXAZonuQCmy61Zl8JqbnVTww%3D%3D';
//     const apiUrl = `http://apis.data.go.kr/1471000/DrugSafeLetterService02?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&returnType=json`;
//     const url = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             // 실제 데이터는 data.contents에 문자열로 포함되어 있습니다.
//             const parsedData = JSON.parse(data.contents);
//             console.log('API 응답 데이터:', parsedData);

//             const cautionList = document.getElementById('caution-list');

//             if (parsedData && parsedData.body && parsedData.body.items) {
//                 parsedData.body.items.forEach(item => {
//                     const li = document.createElement('li');
//                     li.textContent = item.TITLE || '제목 없음';
//                     cautionList.appendChild(li);
//                 });
//             } else {
//                 console.error('데이터 구조를 확인해주세요:', parsedData);
//             }
//         })
//         .catch(error => {
//             console.error('API 요청 중 오류 발생:', error);
//         });
// }
