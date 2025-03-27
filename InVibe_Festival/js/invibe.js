//--------------------------- the_festival/countdown ---------------------------

function updateCountdown() {
    // 在這裡設定目標日期
    const targetDate = new Date("2025-07-31T23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // 計算天、小時、分鐘、秒數
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // 更新 HTML 元素
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// 每秒更新倒數計時器
document.addEventListener("DOMContentLoaded", function () {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

//--------------------------- FAQ/accordion ---------------------------

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            // 關閉其他已開啟的手風琴
            document.querySelectorAll('.accordion-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('active');
                    otherContent.previousElementSibling.querySelector('.accordion-icon').classList.remove('active');
                }
            });

            // 切換當前手風琴的狀態
            content.classList.toggle('active');
            icon.classList.toggle('active');
        });
    });
});

//--------------------------- artist_main/artist-cards ---------------------------

// cannot function
// document.querySelector('.card-container').addEventListener('click', function () {
//     this.querySelector('.card').classList.toggle('flip');
// });

// only the first one
// document.addEventListener("DOMContentLoaded", function () {
//     const cardContainer = document.querySelector('.card-container');
//     if (cardContainer) {
//         cardContainer.addEventListener('click', function () {
//             this.querySelector('.card').classList.toggle('flip');
//         });
//     } else {
//         console.error("找不到 .card-container");
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.artists').forEach(container => {
        container.addEventListener('click', function () {
            this.querySelector('.artist-cards').classList.toggle('flip');
        });
    });
});