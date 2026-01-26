// --- Writings Page Filter Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.writing-card');
    const noResults = document.getElementById('noResults');
    const grid = document.getElementById('writingsGrid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // 2. Add active class to clicked button
            btn.classList.add('active');

            // 3. Get filter value
            const filterValue = btn.getAttribute('data-filter');

            // 4. Show/Hide cards with animation
            let visibleCount = 0;
            
            cards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || cardCategory === filterValue;
                
                if (shouldShow) {
                    card.classList.remove('fade-out');
                    card.style.display = 'flex';
                    card.style.animationDelay = `${visibleCount * 0.05}s`;
                    visibleCount++;
                } else {
                    card.classList.add('fade-out');
                    // Hide after animation
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) {
                            card.style.display = 'none';
                        }
                    }, 200);
                }
            });

            // 5. Show/hide no results message
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                grid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                grid.style.display = 'grid';
            }
        });
    });
});
