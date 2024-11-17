document.addEventListener('DOMContentLoaded', () => {
    const calendarTitle = document.getElementById('calendar-title');
    const calendar = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const weeklyRecord = document.getElementById('weekly-record');

    let currentDate = new Date();

    // 주간 기록 데이터 초기화
    let weeklyData = Array(7).fill({ date: null, status: '💊' }); // 날짜와 상태를 함께 저장

    // 특정 날짜에 이모티콘 추가 데이터
    const emojiDates = {
        '2024-11-02': '😑', // 11월 2일: 😑만 표시
        '2024-11-03': '😊'  // 11월 3일: 🌟 표시
    };

    // 달력 렌더링 함수
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth(); // 0: January, 1: February ...

        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // 제목 설정
        calendarTitle.textContent = `${year}년 ${month + 1}월`;

        // 기존 달력 내용 초기화
        calendar.innerHTML = '';

        // 요일 헤더 생성
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('span');
            dayElement.className = 'header';
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        // 빈 칸 생성
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyElement = document.createElement('span');
            emptyElement.textContent = '';
            calendar.appendChild(emptyElement);
        }

        // 날짜 생성
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const dayElement = document.createElement('span');

            // 특정 날짜에 이모티콘 표시
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (emojiDates[dateKey]) {
                dayElement.innerHTML = emojiDates[dateKey]; // 이모티콘만 표시
            } else {
                dayElement.textContent = day; // 기본 날짜 표시
            }

            dayElement.addEventListener('click', () => updateWeeklyRecord(day)); // 클릭 이벤트
            calendar.appendChild(dayElement);
        }
    }

    // 주간 기록 렌더링 함수
    function renderWeeklyRecord() {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        weeklyRecord.innerHTML = ''; // 기존 내용 초기화

        // 요일 헤더 생성
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('span');
            dayElement.className = 'header';
            dayElement.textContent = day;
            weeklyRecord.appendChild(dayElement);
        });

        // 주간 데이터 생성
        weeklyData.forEach(({ date, status }, index) => {
            const recordElement = document.createElement('span');
            recordElement.innerHTML = date ? `${date}<br>${status}` : status; // 날짜와 상태 표시
            weeklyRecord.appendChild(recordElement);
        });
    }

    // 주간 기록 업데이트 함수
    function updateWeeklyRecord(day) {
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = today.getDay(); // 요일 가져오기
        weeklyData[dayOfWeek] = { date: `${currentDate.getMonth() + 1}/${day}`, status: '✅' }; // 날짜와 상태 저장
        renderWeeklyRecord(); // 주간 기록 다시 렌더링
    }

    // 이전 달로 이동
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // 다음 달로 이동
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 초기 렌더링
    renderCalendar(currentDate);
    renderWeeklyRecord();
});
