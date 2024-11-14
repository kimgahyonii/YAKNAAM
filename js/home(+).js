// '매일' 버튼을 클릭했을 때 모든 요일을 선택
document.getElementById('daily-button').addEventListener('click', function() {
    document.querySelectorAll('.day').forEach(day => {
        day.classList.add('selected'); // 모든 요일 버튼에 'selected' 클래스 추가
    });
});

// '주말만' 버튼을 클릭했을 때 토요일과 일요일만 선택
document.getElementById('weekend-button').addEventListener('click', function() {
    document.querySelectorAll('.day').forEach(day => {
        const dayText = day.getAttribute('data-day');
        if (dayText === '토' || dayText === '일') {
            day.classList.add('selected'); // 토요일과 일요일만 'selected' 클래스 추가
        } else {
            day.classList.remove('selected'); // 나머지 요일은 선택 해제
        }
    });
});
