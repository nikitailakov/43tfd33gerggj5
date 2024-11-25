window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('blurred');
    } else {
        header.classList.remove('blurred');
    }
});

// Скрываем контейнер с тестом при загрузке страницы
document.getElementById('wTest').style.display = 'none';

// Обработчик для кнопки "Начать"
document.getElementById('startTest').addEventListener('click', function() {
    // Скрываем инструкцию
    document.getElementById('info').style.display = 'none';

    // Показываем прелоадер
    document.getElementById('preloader').style.visibility = 'visible';

    // Через 1 секунду показываем первый тест
    setTimeout(function() {
        document.getElementById('preloader').style.visibility = 'hidden';
        document.getElementById('wTest').style.display = 'block';
        startTimer(); // Запускаем таймер после показа теста
    }, 1000);
});

// Массив с изображениями и вариантами ответа для каждого вопроса
const testData = [
    { image: "/img/test1/w1.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w2.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w3.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w4.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w5.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w6.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w7.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w8.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w9.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w10.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w11.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w12.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w13.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w14.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w15.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w16.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w17.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w18.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w19.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w20.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w21.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w22.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w23.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w24.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w25.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w26.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w27.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w28.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w29.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w30.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w31.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w32.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w33.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w34.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w35.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w36.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w37.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w38.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w39.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w41.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w42.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w43.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w44.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w45.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w46.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w47.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w48.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w49.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w50.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w51.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w52.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w53.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w54.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w55.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w56.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w57.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w58.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w59.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w60.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w71.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w72.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w73.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w74.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w75.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w76.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w77.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w78.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w79.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w80.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w81.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w82.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w83.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w84.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w85.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w86.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w87.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w88.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w89.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w90.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w91.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w92.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w93.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w94.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w95.jpg", options: ["Худи", "Свитшот", "Другое"] },
    { image: "/img/test1/w96.jpg", options: ["Ботинки", "Кроссовки", "Другое"] },
    { image: "/img/test1/w97.jpg", options: ["Куртка", "Пальто", "Другое"] },
    { image: "/img/test1/w98.jpg", options: ["Шапка", "Кепка", "Другое"] },
    { image: "/img/test1/w99.jpg", options: ["Сумка", "Рюкзак", "Другое"] },
    { image: "/img/test1/w100.jpg", options: ["Худи", "Свитшот", "Другое"] },
];

let currentQuestion = 0;

// Обновляем содержимое теста
function updateTestContent() {
    const questionData = testData[currentQuestion];
    document.getElementById('testImage').src = questionData.image;
    document.querySelector('label[for="option1"]').textContent = questionData.options[0];
    document.querySelector('label[for="option2"]').textContent = questionData.options[1];
    document.querySelector('label[for="option3"]').textContent = questionData.options[2];
    document.querySelectorAll('input[name="category"]').forEach(radio => radio.checked = false);
    document.getElementById('nextW').disabled = true;
}

// Обработчик клика по кнопке "Далее"
document.getElementById('nextW').addEventListener('click', function() {
    document.getElementById('wTest').style.display = 'none';
    document.getElementById('preloader').style.visibility = 'visible';

    setTimeout(function() {
        document.getElementById('preloader').style.visibility = 'hidden';
        currentQuestion++;

        if (currentQuestion < testData.length) {
            updateTestContent();
            document.getElementById('wTest').style.display = 'block';
        } else {
            document.getElementById('winTest1').style.display = 'block';
        }
    }, 1000);
});

document.querySelectorAll('input[name="category"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        document.getElementById('nextW').disabled = false;
    });
});

// Инициализация первого вопроса
updateTestContent();

// Логика для таймера на 10 минут
let timeLeft = 1800;

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    const timerInterval = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            showTimeUpModal(); // Время истекло, показываем модальное окно
        }
    }, 1000);
}

function showTimeUpModal() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('timeUpModal').style.display = 'block';
}

// Флаг для отслеживания необходимости предупреждения
let shouldWarnOnLeave = true;

// Отслеживаем уход со страницы или её обновление
window.addEventListener('beforeunload', function (event) {
    if (shouldWarnOnLeave) {
        event.preventDefault(); // Стандартный метод для старых браузеров
        event.returnValue = ''; // Сообщение для современных браузеров
    }
});

// Обработчик для кнопки "Ок" в блоке winTest1 (убираем предупреждение при клике)
document.getElementById('winTestOk').addEventListener('click', function() {
    shouldWarnOnLeave = false; // Отключаем предупреждение
    localStorage.setItem('test1Completed', 'true'); // Сохраняем результат в localStorage
    window.location.href = 'next.html'; // Переход на главную страницу
});

// Обработчик для кнопки "Перезапустить тест"
document.getElementById('restartTest').addEventListener('click', function() {
    shouldWarnOnLeave = false; // Отключаем предупреждение
    location.reload(); // Перезагружаем страницу
});
