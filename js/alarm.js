// alarm.js

document.addEventListener('DOMContentLoaded', () => {
    // 알람 데이터를 로드하고 리스트를 생성
    let alarmDataArray = JSON.parse(localStorage.getItem('alarmDataArray')) || [];
    const alarmList = document.getElementById('alarm-list');

    alarmList.innerHTML = ''; // 기존 내용 초기화

    if (alarmDataArray.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = '등록된 알람이 없습니다.';
        alarmList.appendChild(noDataMessage);
        return;
    }

    // 시간별로 알람 데이터를 그룹화
    const groupedAlarms = groupAlarmsByTime(alarmDataArray);

    // 그룹화된 알람 시간을 오름차순으로 정렬
    const sortedTimes = Object.keys(groupedAlarms).sort((a, b) => {
        const timeA = parseTime(a);
        const timeB = parseTime(b);
        return timeA - timeB;
    });

    // 그룹별로 알람을 표시
    sortedTimes.forEach(time => {
        const alarmsAtTime = groupedAlarms[time];

        // 시간 헤더 생성
        const timeHeader = document.createElement('h3');
        timeHeader.textContent = time;
        timeHeader.className = 'time-header';
        alarmList.appendChild(timeHeader);

        // 알람 리스트 생성
        const timeAlarmList = document.createElement('ul');
        timeAlarmList.className = 'time-alarm-list';

        alarmsAtTime.forEach((alarmData) => {
            const listItem = document.createElement('li');

            // 아이콘 이미지
            const iconImg = document.createElement('img');
            iconImg.src = alarmData.icon || 'img/default.png';
            iconImg.alt = '아이콘';
            iconImg.width = 40;
            iconImg.className = 'alarm-icon';

            // 약 이름
            const medicineP = document.createElement('p');
            medicineP.textContent = alarmData.medicine || '정보 없음';
            medicineP.className = 'medicine-name';

            // 상태 아이콘
            const statusImg = document.createElement('img');
            statusImg.src = 'img/false-icon.png'; // 초기 상태를 false로 설정
            statusImg.alt = 'Status';
            statusImg.className = 'status-icon';

            let isTrue = false; // 초기 상태

            // 상태 아이콘 클릭 이벤트
            statusImg.addEventListener('click', () => {
                isTrue = !isTrue; // 상태 토글
                if (isTrue) {
                    statusImg.src = 'img/true-icon.png';
                } else {
                    statusImg.src = 'img/false-icon.png';
                }
            });

            // 수정 버튼
            const editButton = document.createElement('button');
            editButton.className = 'save-button';
            const editIcon = document.createElement('img');
            editIcon.src = 'img/arrow.png';
            editIcon.alt = '수정';
            editButton.appendChild(editIcon);

            // 수정 버튼 클릭 이벤트
            editButton.addEventListener('click', () => {
                // 수정 모드 설정 및 페이지 이동
                const alarmIndex = alarmDataArray.findIndex(
                    (alarm) => alarm === alarmData
                );
                localStorage.setItem('editMode', JSON.stringify(true));
                localStorage.setItem('editIndex', JSON.stringify(alarmIndex));
                window.location.href = 'home(+).html';
            });

            // 리스트 아이템에 요소 추가
            listItem.appendChild(iconImg);          // 아이콘 이미지를 가장 앞에 추가
            listItem.appendChild(medicineP);        // 약 이름 추가
            listItem.appendChild(statusImg);
            listItem.appendChild(editButton);

            timeAlarmList.appendChild(listItem);
        });

        alarmList.appendChild(timeAlarmList);
    });
});

// 시간별로 알람 데이터를 그룹화하는 함수
function groupAlarmsByTime(alarmDataArray) {
    const grouped = {};
    alarmDataArray.forEach(alarm => {
        const time = alarm.time;
        if (!grouped[time]) {
            grouped[time] = [];
        }
        grouped[time].push(alarm);
    });
    return grouped;
}

// 시간 문자열을 Date 객체로 변환하는 함수
function parseTime(timeStr) {
    // 시간 문자열 형식: "HH:MM AM/PM"
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    // 오늘 날짜의 Date 객체로 반환
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

//상단 달력
document.addEventListener('DOMContentLoaded', () => {
    // 요일과 날짜 span을 선택합니다.
    const daySpans = document.querySelectorAll('.calendar-days span');
    const dateSpans = document.querySelectorAll('.calendar-dates span');

    // 클래스 토글 함수
    function syncSelection(index, isDayClicked) {
        // 모든 기존 선택된 클래스를 제거
        daySpans.forEach(day => day.classList.remove('selected-day'));
        dateSpans.forEach(date => date.classList.remove('selected-date'));

        // 클릭된 요소와 연동된 요소에 클래스 추가
        if (isDayClicked) {
            daySpans[index].classList.add('selected-day');
            dateSpans[index].classList.add('selected-date');
        } else {
            dateSpans[index].classList.add('selected-date');
            daySpans[index].classList.add('selected-day');
        }
    }

    // 요일 span 클릭 이벤트
    daySpans.forEach((day, index) => {
        day.addEventListener('click', () => {
            syncSelection(index, true); // 요일 클릭 시 연동
        });
    });

    // 날짜 span 클릭 이벤트
    dateSpans.forEach((date, index) => {
        date.addEventListener('click', () => {
            syncSelection(index, false); // 날짜 클릭 시 연동
        });
    });
});
