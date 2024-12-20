let currentSection = 0;
const sections = document.querySelectorAll('.page');
const totalSections = sections.length;
let isScrolling = false; // 스크롤 제어 플래그

document.addEventListener('wheel', (event) => {
    if (isScrolling) return; // 스크롤 중복 방지

    if (event.deltaY > 0) {
        // 스크롤 다운
        moveToSection(currentSection + 1);
    } else {
        // 스크롤 업
        moveToSection(currentSection - 1);
    }
});

function moveToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= totalSections) return;

    isScrolling = true; // 스크롤 중복 방지 활성화
    currentSection = sectionIndex;
    const offset = currentSection * window.innerHeight;

    sections.forEach((page) => {
        page.style.transform = `translateY(-${offset}px)`;
    });

    // 스크롤 완료 후 1초 후에 다시 스크롤 가능하게 설정
    setTimeout(() => {
        isScrolling = false;
    }, 700); // 700ms 동안 스크롤 차단
}

window.addEventListener('resize', () => {
    const offset = currentSection * window.innerHeight;
    sections.forEach((page) => {
        page.style.transform = `translateY(-${offset}px)`;
    });
});