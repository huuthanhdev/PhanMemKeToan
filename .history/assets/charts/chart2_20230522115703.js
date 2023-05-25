const cta = document.getElementById('doughnut');

new Chart(cta, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [60, 20, 20]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Quảng cáo',
            'Sự kiện',
            'Website'
        ]
    },
    options: {
        responsive:true
    }
});