// home+.js

document.addEventListener('DOMContentLoaded', () => {
    // '매일' 버튼을 클릭했을 때 모든 요일을 선택
    document.getElementById('daily-button').addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(day => {
            day.classList.add('selected'); // 모든 요일 버튼에 'selected' 클래스 추가
        });
    });

    // '주말만' 버튼을 클릭했을 때 토요일과 일요일만 선택
    document.getElementById('weekend-button').addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(day => {
            const dayText = day.getAttribute('data-day');
            if (dayText === '토' || dayText === '일') {
                day.classList.add('selected'); // 토요일과 일요일만 'selected' 클래스 추가
            } else {
                day.classList.remove('selected'); // 나머지 요일은 선택 해제
            }
        });
    });

    // 요일 버튼 클릭 시 선택/해제 처리
    const dayButtons = document.querySelectorAll('.day');
    dayButtons.forEach(dayButton => {
        dayButton.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // 모든 클릭 가능한 아이콘 선택
    const icons = document.querySelectorAll('.clickable-icon');

    // 선택된 아이콘의 원래 src를 저장할 변수
    let selectedIconSrc = '';

    // 각 아이콘에 대해 원본 이미지 경로를 저장
    icons.forEach(icon => {
        icon.setAttribute('data-original-src', icon.getAttribute('src'));
    });

    // 아이콘 클릭 이벤트 추가
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 모든 아이콘을 원래 이미지로 되돌리고 선택 클래스 제거
            icons.forEach(i => {
                i.classList.remove('selected');
                i.setAttribute('src', i.getAttribute('data-original-src'));
            });

            // 클릭한 아이콘의 이미지를 보라색 이미지로 변경
            this.setAttribute('src', this.getAttribute('data-alt-src'));
            // 클릭한 아이콘에 선택 클래스 추가
            this.classList.add('selected');

            // 선택된 아이콘의 원래 src 저장
            selectedIconSrc = this.getAttribute('data-original-src');
        });
    });

    // 수정 모드 확인
    const editMode = JSON.parse(localStorage.getItem('editMode')) || false;
    const editIndex = JSON.parse(localStorage.getItem('editIndex'));

    if (editMode && editIndex !== null) {
        // 로컬 스토리지에서 기존 알람 데이터 가져오기
        const alarmDataArray = JSON.parse(localStorage.getItem('alarmDataArray')) || [];
        const alarmData = alarmDataArray[editIndex];

        if (alarmData) {
            // 기존 데이터 폼에 채워넣기
            document.getElementById('medicine').value = alarmData.medicine;
            const [time, ampm] = alarmData.time.split(' ');
            const [hour, minute] = time.split(':');
            document.getElementById('hour').value = hour;
            document.getElementById('minute').value = minute;
            document.getElementById('ampm').value = ampm;

            // 아이콘 선택
            const selectedIcon = document.querySelector(`.clickable-icon[data-original-src="${alarmData.icon}"]`);
            if (selectedIcon) {
                // 아이콘을 보라색으로 변경
                icons.forEach(icon => {
                    icon.classList.remove('selected');
                    icon.setAttribute('src', icon.getAttribute('data-original-src'));
                });
                selectedIcon.classList.add('selected');
                selectedIcon.setAttribute('src', selectedIcon.getAttribute('data-alt-src'));
                // 선택된 아이콘의 원래 src 저장
                selectedIconSrc = selectedIcon.getAttribute('data-original-src');
            }

            // 요일 선택
            document.querySelectorAll('.day').forEach(dayElement => {
                const dayValue = dayElement.getAttribute('data-day');
                if (alarmData.days.includes(dayValue)) {
                    dayElement.classList.add('selected');
                } else {
                    dayElement.classList.remove('selected');
                }
            });

            // 추가하기 버튼의 텍스트를 '수정하기'로 변경
            const addButton = document.querySelector('.add-button');
            addButton.textContent = '수정하기';
        }
    }

    // 추가하기 버튼 클릭 이벤트 처리
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', () => {
        const medicineInput = document.getElementById('medicine');
        const hourInput = document.getElementById('hour');
        const minuteInput = document.getElementById('minute');
        const ampmInput = document.getElementById('ampm');
        const selectedDays = Array.from(document.querySelectorAll('.day.selected')).map(day =>
            day.getAttribute('data-day')
        );

        const medicine = medicineInput.value.trim();
        const hour = hourInput.value.trim();
        const minute = minuteInput.value.trim();
        const ampm = ampmInput.value.trim();
        const time = `${hour}:${minute} ${ampm}`;
        const icon = selectedIconSrc || 'img/default.png';

        // 데이터 유효성 검사
        if (!medicine || !hour || !minute || !ampm || selectedDays.length === 0 || !selectedIconSrc) {
            alert('모든 값을 올바르게 입력하고 아이콘을 선택해주세요!');
            return;
        }

        // 로컬 스토리지에서 기존의 약 정보 배열 가져오기
        let alarmDataArray = JSON.parse(localStorage.getItem('alarmDataArray')) || [];

        if (editMode && editIndex !== null) {
            // 기존 알람 데이터 업데이트
            alarmDataArray[editIndex] = {
                medicine,
                icon,
                time,
                days: selectedDays
            };
        } else {
            // 새로운 알람 데이터 추가
            alarmDataArray.push({
                medicine,
                icon,
                time,
                days: selectedDays
            });
        }

        // 배열을 로컬 스토리지에 저장
        localStorage.setItem('alarmDataArray', JSON.stringify(alarmDataArray));

        // 수정 모드 해제
        localStorage.removeItem('editMode');
        localStorage.removeItem('editIndex');

        // 입력 필드 및 선택 초기화 (선택 사항)
        medicineInput.value = '';
        hourInput.value = '';
        minuteInput.value = '';
        ampmInput.value = 'AM';
        document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
        icons.forEach(icon => {
            icon.setAttribute('src', icon.getAttribute('data-original-src'));
            icon.classList.remove('selected');
        });

        // 알람 목록 페이지로 이동
        window.location.href = 'alarm.html';
    });
});
