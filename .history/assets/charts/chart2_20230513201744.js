const ctx = document.getElementById('doughnut-chart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
        responsive: true
    //   scales: {
    //     y: {
    //       beginAtZero: true
    //     }
    //   }
    }
  });