const ctx = document.getElementById('lineChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 17, 10, 15, 12, 15],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });