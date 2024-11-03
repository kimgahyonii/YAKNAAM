
window.onload = function () {
    const imageContainer = document.getElementById('imageContainer');
    const mainContent = document.getElementById('mainContent');

    // 5초 후에 imageContainer를 숨기고 mainContent를 표시
    setTimeout(() => {
        imageContainer.style.display = 'none';
        mainContent.style.display = 'block';
    }, 5000);
};
