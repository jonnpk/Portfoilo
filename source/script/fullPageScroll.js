const sections = document.querySelectorAll('.page');
let currentSection = 0;
let isScrolling = false;
let isFullPageScrollActive = true; // 풀페이지 스크롤 활성화 여부

// 특정 섹션으로 이동
function moveToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling || !isFullPageScrollActive) return;

    isScrolling = true;
    currentSection = index;

    sections.forEach((page, i) => {
        page.style.transform = `translateY(${(i - currentSection) * 100}vh)`;
    });

    setTimeout(() => {
        isScrolling = false;
    }, 1000); // 애니메이션 시간과 동일
}

// 풀페이지 스크롤 활성화
function enableFullPageScroll() {
    isFullPageScrollActive = true;
    document.body.style.overflow = "hidden"; // 일반 스크롤 비활성화

    sections.forEach((page, i) => {
        page.style.position = "absolute"; // 풀페이지 스크롤 레이아웃
        page.style.transition = "none"; // 초기화 시 애니메이션 비활성화
        page.style.transform = `translateY(${(i - currentSection) * 100}vh)`;
    });

    // 초기화 이후 애니메이션 다시 활성화
    setTimeout(() => {
        sections.forEach((page) => {
            page.style.transition = "transform 1s";
        });
    }, 0);

    window.addEventListener("wheel", handleWheelEvent);
}

// 일반 스크롤 활성화
function disableFullPageScroll() {
    isFullPageScrollActive = false;
    document.body.style.overflow = "auto"; // 일반 스크롤 활성화

    sections.forEach((page) => {
        page.style.position = "relative"; // 일반 스크롤 레이아웃
        page.style.transition = "none"; // 애니메이션 제거
        page.style.transform = "none"; // transform 초기화
    });

    window.removeEventListener("wheel", handleWheelEvent);
}

// 뷰포트 크기 확인 및 모드 전환
function checkViewportWidth() {
    if (window.innerWidth <= 1024) {
        disableFullPageScroll(); // 1024px 이하에서는 일반 스크롤
    } else {
        enableFullPageScroll(); // 1024px 초과에서는 풀페이지 스크롤
    }
}

// 마우스 휠 이벤트 핸들러
function handleWheelEvent(e) {
    if (!isFullPageScrollActive || isScrolling) return;

    if (e.deltaY > 0) {
        // 아래로 스크롤
        if (currentSection < sections.length - 1) {
            moveToSection(currentSection + 1);
        }
    } else {
        // 위로 스크롤
        if (currentSection > 0) {
            moveToSection(currentSection - 1);
        }
    }
}

// 초기화 시 스크롤 위치 강제 설정
function resetScrollPosition() {
    window.scrollTo(0, 0);
}

// 페이지 로드 시 초기화
window.addEventListener("load", () => {
    resetScrollPosition();
    checkViewportWidth();
    if (isFullPageScrollActive) moveToSection(0); // 풀페이지 스크롤 시 첫 번째 섹션으로 이동
});

// 뷰포트 크기 변경 시 모드 전환
window.addEventListener("resize", checkViewportWidth);