document.addEventListener('DOMContentLoaded', () => {
    const archiveList = document.getElementById('archive-list');
    let allPosts = [];

    // Helper to format date
    const formatDateObj = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            month: months[date.getMonth()],
            day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
            year: date.getFullYear()
        };
    };

    // Fetch data from posts.json
    // Using a cache-busting query parameter in development helps if you test locally
    fetch('data/posts.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;

            // Sort by date descending (newest first)
            // Assuming date format is YYYY-MM-DD
            allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            renderPosts(allPosts);
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
            archiveList.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-warning-circle" style="font-size: 32px; margin-bottom: 12px; color: var(--accent-secondary);"></i>
                    <p>데이터를 불러오는 데 실패했습니다.</p>
                    <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">posts.json 파일이 올바른 경로에 있는지 확인해주세요.</p>
                </div>
            `;
        });

    function renderPosts(posts) {
        archiveList.innerHTML = ''; // Clear loading skeletons

        if (posts.length === 0) {
            archiveList.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-folder-open" style="font-size: 32px; margin-bottom: 12px;"></i>
                    <p>등록된 교재가 없습니다.</p>
                </div>
            `;
            return;
        }

        posts.forEach((post, index) => {
            const dateObj = formatDateObj(post.date);
            const monthStr = dateObj ? dateObj.month : 'M';
            const dayStr = dateObj ? dateObj.day : 'D';

            // For older posts format support or missing description
            const description = post.description || post.chapter || '포스 모임 소그룹 교재입니다.';

            const cardHTML = `
                <a href="${post.path}" class="post-card" style="animation: slideIn 0.5s ease forwards; animation-delay: ${index * 0.1}s; opacity: 0; transform: translateY(20px);">
                    <div class="post-date-badge">
                        <span class="date-month">${monthStr}</span>
                        <span class="date-day">${dayStr}</span>
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-desc">${description}</p>
                    </div>
                    <i class="ph-bold ph-arrow-right post-arrow"></i>
                </a>
            `;

            archiveList.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
});

// Add keyframes for the staggered animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
