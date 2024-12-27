const content = document.getElementsByClassName("fade-interactive");

// Intersection Observer 생성
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 요소가 화면에 나타난 경우
                entry.target.classList.add("in");
            }
        }
        );
    },
    {
        threshold: 0.1, // 요소의 10%가 화면에 보이면 감지
    }
);

// 모든 content 요소를 관찰
Array.from(content).forEach((element) => {
    observer.observe(element);
});