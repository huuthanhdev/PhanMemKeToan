const cta = document.getElementById('doughnut');

new Chart(cta, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10, 20, 30]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    },
    options: {
        responsive:true
    }
});