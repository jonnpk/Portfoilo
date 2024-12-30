const content = document.getElementsByClassName("fade-interactive");

// Intersection Observer 생성
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                // 요소가 화면에 나타난 경우
                entry.target.classList.add("in");
            } else {
                if (window.innerWidth > 1024)
                entry.target.classList.remove("in");
            }
        }
        );
    },
    {
        threshold: 0, // 요소의 화면에 1px이라도 보이면 감지
    }
);

document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementsByClassName("fade-interactive");
    Array.from(content).forEach((element) => {
        observer.observe(element);
    });
});

// 모든 content 요소를 관찰
Array.from(content).forEach((element) => {
    observer.observe(element);
});